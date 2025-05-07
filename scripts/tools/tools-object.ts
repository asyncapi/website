import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import axios from 'axios';
import Fuse from 'fuse.js';

import type { AsyncAPITool, ToolsData, ToolsListObject } from '@/types/scripts/tools';

import { logger } from '../helpers/logger';
import { convertToJson } from '../helpers/utils';
import { categoryList } from './categorylist';
import schema from './tools-schema.json';

const ajv = new Ajv();

addFormats(ajv, ['uri']);
const validate = ajv.compile(schema);

// Config options set for the Fuse object
const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.4,
  keys: ['tag']
};

const fuse = new Fuse(categoryList, options);

/**
 * Constructs a tool object for frontend display.
 *
 * This asynchronous function builds a tool object used by the ToolCard component. It uses the provided tool file to extract
 * details such as title, description, links, and filters. If certain fields (like repository URL or description) are missing
 * in the tool file, the corresponding fallback values from the parameters are used. The filter for AsyncAPI ownership is set
 * based on the isAsyncAPIrepo parameter.
 *
 * @param toolFile - The tool file content containing information such as title, description, links, and filters.
 * @param repositoryUrl - The URL of the tool's repository, used as a fallback if not specified in the tool file.
 * @param repoDescription - The repository description, used as a fallback if the tool file does not provide one.
 * @param isAsyncAPIrepo - Indicates whether the repository belongs to the AsyncAPI organization. Can be a boolean or a string.
 * @returns A promise that resolves to the constructed tool object.
 */
async function createToolObject(
  toolFile: AsyncAPITool,
  repositoryUrl = '',
  repoDescription = '',
  isAsyncAPIrepo: boolean = false
) {
  const resultantObject = {
    title: toolFile.title,
    description: toolFile?.description ? toolFile.description : repoDescription,
    links: {
      ...toolFile.links,
      repoUrl: toolFile?.links?.repoUrl ? toolFile.links.repoUrl : repositoryUrl
    },
    filters: {
      ...toolFile.filters,
      hasCommercial: toolFile?.filters?.hasCommercial ? toolFile.filters.hasCommercial : false,
      isAsyncAPIOwner: isAsyncAPIrepo
    }
  };

  return resultantObject;
}

// Each result obtained from the Github API call will be tested and verified
// using the defined JSON schema, categorising each tool inside their defined categories
// and creating a JSON tool object in which all the tools are listed in defined
// categories order, which is then updated in `automated-tools.json` file.

/**
 * Processes raw tools data from the GitHub API and categorizes valid tool entries.
 *
 * This asynchronous function iterates over the provided tools data and, for each tool whose name starts with ".asyncapi-tool",
 * it retrieves the tool file content from GitHub, converts it from YAML to JSON, and validates it against a predefined JSON schema.
 * For valid tool files, it creates a tool object and assigns it to one or more categories using fuzzy search on its filter categories.
 * If no matching category is found, the tool is placed in the "Others" category.
 *
 * @param data - The tools data from the GitHub API.
 * @returns A promise that resolves to an object mapping category names to lists of tool objects.
 * @throws {Error} When an error occurs during tool processing.
 */
async function convertTools(data: ToolsData) {
  try {
    let finalToolsObject: ToolsListObject = {};

    // initialising finalToolsObject with all categories inside it with proper elements in each category
    finalToolsObject = Object.fromEntries(
      categoryList.map((category) => [
        category.name,
        {
          description: category.description,
          toolsList: []
        }
      ])
    );

    await Promise.all(
      data.map(async (tool) => {
        try {
          if (tool.name.startsWith('.asyncapi-tool')) {
            const referenceId = tool.url.split('=')[1];
            const downloadUrl = `https://raw.githubusercontent.com/${tool.repository.full_name}/${referenceId}/${tool.path}`;

            const { data: toolFileContent } = await axios.get(downloadUrl);

            // some stuff can be YAML
            const jsonToolFileContent = await convertToJson(toolFileContent);

            // validating against JSON Schema for tools file
            const isValid = await validate(jsonToolFileContent);

            if (isValid) {
              const repositoryUrl = tool.repository.html_url;
              const repoDescription = tool.repository.description;
              const isAsyncAPIrepo = tool.repository.owner.login === 'asyncapi';
              const toolObject = await createToolObject(
                jsonToolFileContent,
                repositoryUrl,
                repoDescription,
                isAsyncAPIrepo
              );

              // Tool Object is appended to each category array according to Fuse search for categories inside Tool Object
              await Promise.all(
                jsonToolFileContent.filters.categories.map(async (category: string) => {
                  const categorySearch = await fuse.search(category);
                  const targetCategory = categorySearch.length ? categorySearch[0].item.name : 'Others';
                  const { toolsList } = finalToolsObject[targetCategory];

                  if (!toolsList.includes(toolObject)) {
                    toolsList.push(toolObject);
                  }
                })
              );
            } else {
              logger.warn(
                `Script is not failing, it is just dropping errors for further investigation.\nInvalid .asyncapi-tool file. \nLocated in: ${tool.html_url}. \nValidation errors: ${JSON.stringify(validate.errors, null, 2)}`
              );
            }
          }
        } catch (err) {
          logger.error(err);
          throw err;
        }
      })
    );

    return finalToolsObject;
  } catch (err: unknown) {
    logger.error('Error processing tools:', err);
    throw err;
  }
}

export { convertTools, createToolObject };
