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
  ToolsListObject
} from '@/types/scripts/tools';

import { logger } from '../helpers/logger';
import { categoryList } from './categorylist';
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
    toolsList: []
  };
}

// Config options set for the Fuse object
const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.39,
  keys: ['name', 'color', 'borderColor']
};

// Two seperate lists and Fuse objects initialised to search languages and technologies tags
// from specified list of same.
const languageList = [...languagesColor];
const technologyList = [...technologiesColor];
let languageFuse = new Fuse(languageList, options);
let technologyFuse = new Fuse(technologyList, options);

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
export async function getFinalTool(toolObject: AsyncAPITool): Promise<FinalAsyncAPITool> {
  const finalObject: FinalAsyncAPITool = {
    ...toolObject,
    filters: {
      language: [],
      technology: [],
      categories: toolObject.filters.categories,
      hasCommercial: toolObject.filters.hasCommercial
    }
  } as FinalAsyncAPITool;

  // there might be a tool without language
  if (toolObject.filters.language) {
    const languageArray: LanguageColorItem[] = [];

    if (typeof toolObject.filters.language === 'string') {
      const languageSearch = await languageFuse.search(toolObject.filters.language);

      if (languageSearch.length) {
        languageArray.push(languageSearch[0].item);
      } else {
        // adds a new language object in the Fuse list as well as in tool object
        // so that it isn't missed out in the UI.
        const languageObject = {
          name: toolObject.filters.language,
          color: 'bg-[#57f281]',
          borderColor: 'border-[#37f069]'
        };

        languageList.push(languageObject);
        languageArray.push(languageObject);
        languageFuse = new Fuse(languageList, options);
      }
    } else {
      for (const language of toolObject.filters.language) {
        // eslint-disable-next-line no-await-in-loop
        const languageSearch = await languageFuse.search(language);

        if (languageSearch.length > 0) {
          languageArray.push(languageSearch[0].item);
        } else {
          // adds a new language object in the Fuse list as well as in tool object
          // so that it isn't missed out in the UI.
          const languageObject = {
            name: language,
            color: 'bg-[#57f281]',
            borderColor: 'border-[#37f069]'
          };

          languageList.push(languageObject);
          languageArray.push(languageObject);
          languageFuse = new Fuse(languageList, options);
        }
      }
    }
    finalObject.filters.language = languageArray;
  }
  const technologyArray = [];

  if (toolObject.filters.technology) {
    for (const technology of toolObject.filters.technology) {
      // eslint-disable-next-line no-await-in-loop
      const technologySearch = await technologyFuse.search(technology);

      if (technologySearch.length > 0) {
        technologyArray.push(technologySearch[0].item);
      } else {
        // adds a new technology object in the Fuse list as well as in tool object
        // so that it isn't missed out in the UI.
        const technologyObject = {
          name: technology,
          color: 'bg-[#61d0f2]',
          borderColor: 'border-[#40ccf7]'
        };

        technologyList.push(technologyObject);
        technologyArray.push(technologyObject);
        technologyFuse = new Fuse(technologyList, options);
      }
    }
  }
  finalObject.filters.technology = technologyArray;

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
        note: 'Script continues execution, error logged for investigation'
      }),
      null,
      2
    );

    return null;
  }
  const isAsyncAPIrepo = tool?.links?.repoUrl
    ? new URL(tool.links.repoUrl).href.startsWith('https://github.com/asyncapi/')
    : false;
  const toolObject = await createToolObject(tool, '', '', isAsyncAPIrepo);

  return getFinalTool(toolObject);
};

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
function shouldIgnoreTool(tool: AsyncAPITool, category: string, ignoreList: ToolIgnoreEntry[]): ToolIgnoreEntry | null {
  for (const entry of ignoreList) {
    if (!entry.title && !entry.repoUrl) {
      continue;
    }

    if (entry.categories?.length && !entry.categories.includes(category)) {
      continue;
    }

    const hasTitle = Boolean(entry.title);
    const hasRepoUrl = Boolean(entry.repoUrl);
    const titleMatches = hasTitle && tool.title === entry.title;
    const repoMatches = hasRepoUrl && tool.links?.repoUrl === entry.repoUrl;

    if (hasTitle && hasRepoUrl) {
      if (titleMatches && repoMatches) {
        return entry;
      }
    } else if (hasTitle) {
      if (titleMatches) {
        return entry;
      }
    } else if (hasRepoUrl) {
      if (repoMatches) {
        return entry;
      }
    }
  }

  return null;
}

/**
 * Combine the automated tools and manual tools list into a single JSON object file, and
 * lists down all the language and technology tags in one JSON file.
 *
 * @param {ToolsListObject} automatedTools - The list of automated tools.
 * @param {ToolsListObject} manualTools - The list of manual tools.
 * @param {string} toolsPath - The path to save the combined tools JSON file.
 * @param {string} tagsPath - The path to save the tags JSON file.
 * @param {string} [ignorePath] - Optional path to the tools-ignore.json file.
 * @param {string} [ignoredOutputPath] - Optional path to write the audit log of ignored tools.
 */
const combineTools = async (
  automatedTools: ToolsListObject,
  manualTools: ToolsListObject,
  toolsPath: string,
  tagsPath: string,
  ignorePath?: string,
  ignoredOutputPath?: string
): Promise<void> => {
  try {
    let ignoreList: ToolIgnoreEntry[] = [];
    const ignoredTools: IgnoredToolRecord[] = [];

    if (ignorePath && fs.existsSync(ignorePath)) {
      const ignoreFile: ToolsIgnoreFile = JSON.parse(fs.readFileSync(ignorePath, 'utf-8'));

      ignoreList = ignoreFile.tools || [];
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key in automatedTools) {
      if (Object.prototype.hasOwnProperty.call(automatedTools, key)) {
        const filteredAutomated = automatedTools[key].toolsList.filter((tool) => {
          const matchedEntry = shouldIgnoreTool(tool, key, ignoreList);

          if (matchedEntry) {
            ignoredTools.push({
              title: tool.title,
              repoUrl: tool.links?.repoUrl,
              reason: matchedEntry.reason,
              category: key,
              source: 'automated',
              ignoredAt: new Date().toISOString()
            });

            return false;
          }

          return true;
        });

        // eslint-disable-next-line no-await-in-loop
        const automatedResults = await Promise.all(filteredAutomated.map(getFinalTool));

        const filteredManual = (manualTools[key]?.toolsList || []).filter((tool) => {
          const matchedEntry = shouldIgnoreTool(tool, key, ignoreList);

          if (matchedEntry) {
            ignoredTools.push({
              title: tool.title,
              repoUrl: tool.links?.repoUrl,
              reason: matchedEntry.reason,
              category: key,
              source: 'manual',
              ignoredAt: new Date().toISOString()
            });

            return false;
          }

          return true;
        });

        const manualResults = filteredManual.length
          ? // eslint-disable-next-line no-await-in-loop
            (await Promise.all(filteredManual.map(processManualTool))).filter(Boolean)
          : [];

        finalTools[key].toolsList = [...automatedResults, ...manualResults].sort((tool, anotherTool) => {
          if (!tool?.title || !anotherTool?.title) {
            logger.error({
              message: 'Tool title is missing during sort',
              detail: { tool, anotherTool },
              source: 'combine-tools.ts'
            });

            return 0;
          }

          return tool.title.localeCompare(anotherTool.title);
        }) as FinalAsyncAPITool[];
      }
    }

    fs.writeFileSync(toolsPath, JSON.stringify(finalTools, null, 2));
    fs.writeFileSync(
      tagsPath,
      JSON.stringify(
        {
          languages: languageList,
          technologies: technologyList
        },
        null,
        2
      )
    );

    if (ignoredTools.length > 0) {
      logger.info(
        `Tools ignored: ${ignoredTools.length} tool(s) removed by ${ignoreList.length} ignore rule(s).\n` +
          ignoredTools
            .map((t) => `  - "${t.title}" (${t.repoUrl || 'no repo'}) from [${t.category}]`)
            .join('\n')
      );
    } else if (ignoreList.length > 0) {
      logger.info(`Tools ignored: 0 (none of the ${ignoreList.length} ignore rule(s) matched any tool).`);
    }

    if (ignoredOutputPath && ignoredTools.length > 0) {
      fs.writeFileSync(
        ignoredOutputPath,
        JSON.stringify(
          {
            description: 'Auto-generated audit log of tools ignored during the last combine run.',
            generatedAt: new Date().toISOString(),
            totalIgnored: ignoredTools.length,
            ignoredTools
          },
          null,
          2
        )
      );
    } else if (ignoredOutputPath && ignoredTools.length === 0) {
      fs.writeFileSync(
        ignoredOutputPath,
        JSON.stringify(
          {
            description: 'Auto-generated audit log of tools ignored during the last combine run.',
            generatedAt: new Date().toISOString(),
            totalIgnored: 0,
            ignoredTools: []
          },
          null,
          2
        )
      );
    }
  } catch (err) {
    throw new Error(`Error combining tools: ${err}`);
  }
};

export { combineTools, shouldIgnoreTool };
