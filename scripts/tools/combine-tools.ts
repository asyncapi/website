import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import Fuse from 'fuse.js';

import type {
  AsyncAPITool,
  FinalAsyncAPITool,
  FinalToolsListObject,
  LanguageColorItem,
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
 * Combine the automated tools and manual tools list into a single JSON object file, and
 * lists down all the language and technology tags in one JSON file.
 *
 * @param {ToolsListObject} automatedTools - The list of automated tools.
 * @param {ToolsListObject} manualTools - The list of manual tools.
 * @param {string} toolsPath - The path to save the combined tools JSON file.
 * @param {string} tagsPath - The path to save the tags JSON file.
 */
const combineTools = async (
  automatedTools: ToolsListObject,
  manualTools: ToolsListObject,
  toolsPath: string,
  tagsPath: string
): Promise<void> => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in automatedTools) {
      if (Object.prototype.hasOwnProperty.call(automatedTools, key)) {
        // eslint-disable-next-line no-await-in-loop
        const automatedResults = await Promise.all(automatedTools[key].toolsList.map(getFinalTool));
        const manualResults = manualTools[key]?.toolsList?.length
          ? // eslint-disable-next-line no-await-in-loop
            (await Promise.all(manualTools[key].toolsList.map(processManualTool))).filter(Boolean)
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
  } catch (err) {
    throw new Error(`Error combining tools: ${err}`);
  }
};

export { combineTools };
