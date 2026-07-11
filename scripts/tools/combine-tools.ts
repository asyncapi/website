import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import Fuse from 'fuse.js';

import type {
  AsyncAPITool,
  FinalAsyncAPITool,
  FinalToolsListObject,
  IgnoredToolRecord,
  LanguageColorItem,
  ToolIgnoreEntry,
  ToolsIgnoreFile,
  ToolsListObject,
} from '@/types/scripts/tools';

import { logger } from '../helpers/logger';
import { categoryList } from './categorylist';
import { compareToolsDeterministic } from './compare-tools';
import { languagesColor, technologiesColor } from './tags-color';
import { createToolObject } from './tools-object';
import schema from './tools-schema.json';

const ajv = new Ajv();

addFormats(ajv, ['uri']);
const validate = ajv.compile(schema);

const finalTools: FinalToolsListObject = {};

for (const category of categoryList) {
  finalTools[category.name] = {
    description: category.description,
    toolsList: [],
  };
}

// Config options set for the Fuse object
const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.39,
  keys: ['name', 'color', 'borderColor'],
};

// Two seperate lists and Fuse objects initialised to search languages and technologies tags
// from specified list of same.
const languageList = [...languagesColor];
const technologyList = [...technologiesColor];
const initialLanguageCount = languageList.length;
const initialTechnologyCount = technologyList.length;
let languageFuse = new Fuse(languageList, options);
let technologyFuse = new Fuse(technologyList, options);

function sortColorItems(
  list: LanguageColorItem[],
  initialCount: number,
): LanguageColorItem[] {
  const initial = list.slice(0, initialCount);
  const discovered = list.slice(initialCount);

  const seenNames = new Set<string>(initial.map((item) => item.name));
  const uniqueDiscovered: LanguageColorItem[] = [];

  for (const item of discovered) {
    if (!seenNames.has(item.name)) {
      seenNames.add(item.name);
      uniqueDiscovered.push(item);
    }
  }

  uniqueDiscovered.sort((a, b) => a.name.localeCompare(b.name, 'en'));

  return [...initial, ...uniqueDiscovered];
}

function resolveTag(
  name: string,
  list: LanguageColorItem[],
  fuse: Fuse<LanguageColorItem>,
  defaultColor: string,
  defaultBorder: string,
): { item: LanguageColorItem; fuse: Fuse<LanguageColorItem> } {
  const results = fuse.search(name);

  if (results.length > 0) {
    return { item: results[0].item, fuse };
  }

  const newItem: LanguageColorItem = {
    name,
    color: defaultColor,
    borderColor: defaultBorder,
  };

  list.push(newItem);

  return { item: newItem, fuse: new Fuse(list, options) };
}

async function resolveLanguageTags(
  language: string | string[],
): Promise<{
  tags: LanguageColorItem[];
  updatedFuse: Fuse<LanguageColorItem>;
}> {
  const tags: LanguageColorItem[] = [];
  let currentFuse = languageFuse;
  const langs = typeof language === 'string' ? [language] : language;

  for (const lang of langs) {
    // eslint-disable-next-line no-await-in-loop
    const { item, fuse } = resolveTag(
      lang,
      languageList,
      currentFuse,
      'bg-[#57f281]',
      'border-[#37f069]',
    );

    tags.push(item);
    currentFuse = fuse;
  }

  return { tags, updatedFuse: currentFuse };
}

async function resolveTechnologyTags(
  technology: string[],
): Promise<{
  tags: LanguageColorItem[];
  updatedFuse: Fuse<LanguageColorItem>;
}> {
  const tags: LanguageColorItem[] = [];
  let currentFuse = technologyFuse;

  for (const tech of technology) {
    // eslint-disable-next-line no-await-in-loop
    const { item, fuse } = resolveTag(
      tech,
      technologyList,
      currentFuse,
      'bg-[#61d0f2]',
      'border-[#40ccf7]',
    );

    tags.push(item);
    currentFuse = fuse;
  }

  return { tags, updatedFuse: currentFuse };
}

/**
 * Enriches a tool object by processing its language and technology filters for display on the website.
 *
 * This function uses fuzzy matching to search for existing language and technology tags. If a tag is not found,
 * it creates a new tag object with preset background and border colors, appends it to the global tag list, and updates
 * the Fuse index accordingly. The updated tool object includes enriched filters along with its original category and
 * commercial properties.
 *
 * @param toolObject - The original tool object containing filter tags.
 * @returns A promise that resolves to the updated tool object with enriched language and technology filters.
 */
export async function getFinalTool(
  toolObject: AsyncAPITool,
): Promise<FinalAsyncAPITool> {
  const finalObject: FinalAsyncAPITool = {
    ...toolObject,
    filters: {
      language: [],
      technology: [],
      categories: toolObject.filters.categories,
      hasCommercial: toolObject.filters.hasCommercial,
    },
  } as FinalAsyncAPITool;

  if (toolObject.filters.language) {
    const { tags, updatedFuse } = await resolveLanguageTags(
      toolObject.filters.language,
    );

    finalObject.filters.language = tags;
    languageFuse = updatedFuse;
  }

  if (toolObject.filters.technology) {
    const { tags, updatedFuse } = await resolveTechnologyTags(
      toolObject.filters.technology,
    );

    finalObject.filters.technology = tags;
    technologyFuse = updatedFuse;
  }

  return finalObject;
}

const processManualTool = async (tool: AsyncAPITool) => {
  const isValid = await validate(tool);

  if (!isValid) {
    logger.error(
      JSON.stringify({
        message: 'Tool validation failed',
        tool: tool.title,
        source: 'manual-tools.json',
        errors: validate.errors,
        note: 'Script continues execution, error logged for investigation',
      }),
      null,
      2,
    );

    return null;
  }
  const isAsyncAPIrepo = tool?.links?.repoUrl
    ? new URL(tool.links.repoUrl).href.startsWith(
        'https://github.com/asyncapi/',
      )
    : false;
  const toolObject = await createToolObject(tool, '', '', isAsyncAPIrepo);

  return getFinalTool(toolObject);
};

/**
 * Checks whether a single ignore entry matches the given tool in the given category.
 */
function doesEntryMatchTool(
  entry: ToolIgnoreEntry,
  tool: AsyncAPITool,
  category: string,
): boolean {
  if (!entry.title && !entry.repoUrl) return false;
  if (entry.categories?.length && !entry.categories.includes(category))
    return false;

  const titleMatches = entry.title ? tool.title === entry.title : true;
  const repoMatches = entry.repoUrl
    ? tool.links?.repoUrl === entry.repoUrl
    : true;

  return titleMatches && repoMatches;
}

/**
 * Checks whether a tool matches any entry in the ignore list for the given category.
 *
 * Each ignore entry must have at least `title` or `repoUrl` (or both).
 * Entries missing both are skipped.
 *
 * Matching rules:
 * - Both `title` and `repoUrl` provided: tool must match both (most precise).
 * - Only `title` provided: any tool with that exact title matches.
 * - Only `repoUrl` provided: any tool with that exact repoUrl matches.
 * - If `categories` is provided, the match only applies within those categories.
 */
function shouldIgnoreTool(
  tool: AsyncAPITool,
  category: string,
  ignoreList: ToolIgnoreEntry[],
): ToolIgnoreEntry | null {
  return (
    ignoreList.find((entry) => doesEntryMatchTool(entry, tool, category)) ??
    null
  );
}

/**
 * Combine the automated tools and manual tools list into a single JSON object file, and
 * lists down all the language and technology tags in one JSON file.
 *
 * @param {ToolsListObject} automatedTools - The list of automated tools.
 * @param {ToolsListObject} manualTools - The list of manual tools.
 * @param {string} toolsPath - The path to save the combined tools JSON file.
 * @param {string} tagsPath - The path to save the tags JSON file.
 * @param {string} [ignorePath] - Path to the tools-ignore.json file.
 * @param {string} [ignoredOutputPath] - Path to write the audit log of ignored tools.
 */
const combineTools = async (
  automatedTools: ToolsListObject,
  manualTools: ToolsListObject,
  toolsPath: string,
  tagsPath: string,
  ignorePath?: string,
  ignoredOutputPath?: string,
): Promise<void> => {
  try {
    let ignoreList: ToolIgnoreEntry[] = [];
    const ignoredTools: IgnoredToolRecord[] = [];

    if (ignorePath && fs.existsSync(ignorePath)) {
      const ignoreFile: ToolsIgnoreFile = JSON.parse(
        fs.readFileSync(ignorePath, 'utf-8'),
      );

      ignoreList = ignoreFile.tools || [];
    }

    for (const key of Object.keys(automatedTools)) {
      const filteredAutomated = automatedTools[key].toolsList.filter((tool) => {
        const matchedEntry = shouldIgnoreTool(tool, key, ignoreList);

        if (matchedEntry) {
          ignoredTools.push({
            title: tool.title,
            repoUrl: tool.links?.repoUrl,
            reason: matchedEntry.reason,
            category: key,
            source: 'automated',
            ignoredAt: new Date().toISOString(),
          });

          return false;
        }

        return true;
      });

      // eslint-disable-next-line no-await-in-loop
      const automatedResults = await Promise.all(
        filteredAutomated.map(getFinalTool),
      );

      const filteredManual = (manualTools[key]?.toolsList || []).filter(
        (tool) => {
          const matchedEntry = shouldIgnoreTool(tool, key, ignoreList);

          if (matchedEntry) {
            ignoredTools.push({
              title: tool.title,
              repoUrl: tool.links?.repoUrl,
              reason: matchedEntry.reason,
              category: key,
              source: 'manual',
              ignoredAt: new Date().toISOString(),
            });

            return false;
          }

          return true;
        },
      );

      const manualResults = filteredManual.length
        ? // eslint-disable-next-line no-await-in-loop
          (await Promise.all(filteredManual.map(processManualTool))).filter(
            Boolean,
          )
        : [];

      finalTools[key].toolsList = [...automatedResults, ...manualResults].sort(
        (tool, anotherTool) => {
          if (!tool?.title || !anotherTool?.title) {
            logger.error({
              message: 'Tool title is missing during sort',
              detail: { tool, anotherTool },
              source: 'combine-tools.ts',
            });

            return 0;
          }

          return compareToolsDeterministic(tool, anotherTool);
        },
      ) as FinalAsyncAPITool[];
    }

    fs.writeFileSync(toolsPath, JSON.stringify(finalTools, null, 2));
    fs.writeFileSync(
      tagsPath,
      JSON.stringify(
        {
          languages: sortColorItems(languageList, initialLanguageCount),
          technologies: sortColorItems(technologyList, initialTechnologyCount),
        },
        null,
        2,
      ),
    );

    if (ignoredTools.length > 0) {
      logger.info(
        `Tools ignored: ${ignoredTools.length} tool(s) removed by ${ignoreList.length} ignore rule(s).\n` +
          ignoredTools
            .map(
              (t) =>
                `  - "${t.title}" (${t.repoUrl || 'no repo'}) from [${t.category}]`,
            )
            .join('\n'),
      );
    } else if (ignoreList.length > 0) {
      logger.info(
        `Tools ignored: 0 (none of the ${ignoreList.length} ignore rule(s) matched any tool).`,
      );
    }

    if (ignoredOutputPath && ignoredTools.length > 0) {
      fs.writeFileSync(
        ignoredOutputPath,
        JSON.stringify(
          {
            description:
              'Auto-generated audit log of tools ignored during the last combine run.',
            generatedAt: new Date().toISOString(),
            totalIgnored: ignoredTools.length,
            ignoredTools,
          },
          null,
          2,
        ),
      );
    } else if (ignoredOutputPath && ignoredTools.length === 0) {
      fs.writeFileSync(
        ignoredOutputPath,
        JSON.stringify(
          {
            description:
              'Auto-generated audit log of tools ignored during the last combine run.',
            generatedAt: new Date().toISOString(),
            totalIgnored: 0,
            ignoredTools: [],
          },
          null,
          2,
        ),
      );
    }
  } catch (err) {
    throw new Error(`Error combining tools: ${err}`);
  }
};

export { combineTools, shouldIgnoreTool };
