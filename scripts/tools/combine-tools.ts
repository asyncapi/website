/* eslint-disable no-await-in-loop */
/* eslint-disable max-depth */
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import Fuse from 'fuse.js';

import type { AsyncAPITool, LanguageColorItem, ToolsListObject } from '@/types/scripts/tools';

import { categoryList } from './categorylist';
import { languagesColor, technologiesColor } from './tags-color';
import { createToolObject } from './tools-object';
import schema from './tools-schema.json';

const ajv = new Ajv();

addFormats(ajv, ['uri']);
const validate = ajv.compile(schema);

const finalTools: ToolsListObject = {};

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

// takes individual tool object and inserts borderColor and backgroundColor of the tags of
// languages and technologies, for Tool Card in website.
async function getFinalTool(toolObject: AsyncAPITool) {
  const finalObject = toolObject;

  // there might be a tool without language
  if (toolObject.filters?.language) {
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
      for (const language of toolObject?.filters?.language ?? []) {
        const languageSearch = await languageFuse.search(language);

        if (languageSearch.length > 0) {
          languageArray.push(languageSearch[0].item);
        } else {
          // adds a new language object in the Fuse list as well as in tool object
          // so that it isn't missed out in the UI.
          const languageObject = {
            name: language as string,
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
    for (const technology of toolObject?.filters?.technology ?? []) {
      const technologySearch = await technologyFuse.search(technology);

      if (technologySearch.length > 0) {
        technologyArray.push(technologySearch[0].item);
      } else {
        // adds a new technology object in the Fuse list as well as in tool object
        // so that it isn't missed out in the UI.
        const technologyObject = {
          name: technology as string,
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

// Combine the automated tools and manual tools list into single JSON object file, and
// lists down all the language and technology tags in one JSON file.
const combineTools = async (automatedTools: any, manualTools: any, toolsPath: string, tagsPath: string) => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in automatedTools) {
      if (Object.prototype.hasOwnProperty.call(automatedTools, key)) {
        const finalToolsList = [];

        if (automatedTools[key].toolsList.length) {
          for (const tool of automatedTools[key].toolsList) {
            finalToolsList.push(await getFinalTool(tool));
          }
        }
        if (manualTools[key]?.toolsList?.length) {
          for (const tool of manualTools[key].toolsList) {
            let isAsyncAPIrepo;
            const isValid = await validate(tool);

            if (isValid) {
              if (tool?.links?.repoUrl) {
                const url = new URL(tool.links.repoUrl);

                isAsyncAPIrepo = url.href.startsWith('https://github.com/asyncapi/');
              } else isAsyncAPIrepo = false;
              const toolObject = await createToolObject(tool, '', '', isAsyncAPIrepo);

              finalToolsList.push(await getFinalTool(toolObject));
            } else {
              console.error({
                message: 'Tool validation failed',
                tool: tool.title,
                source: 'manual-tools.json',
                errors: validate.errors,
                note: 'Script continues execution, error logged for investigation'
              });
            }
          }
        }
        finalToolsList.sort((tool, anotherTool) => tool.title.localeCompare(anotherTool.title));
        finalTools[key].toolsList = finalToolsList;
      }
    }
    fs.writeFileSync(toolsPath, JSON.stringify(finalTools));
    fs.writeFileSync(tagsPath, JSON.stringify({ languages: languageList, technologies: technologyList }));
  } catch (err) {
    throw new Error(`Error combining tools: ${err}`);
  }
};

export { combineTools };
