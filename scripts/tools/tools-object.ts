import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import axios from 'axios';
import Fuse from 'fuse.js';

import type { AsyncAPITool, ToolsData, ToolsListObject } from '@/types/scripts/tools';

import { convertToJson } from '../utils';
import { logger } from '../utils/logger';
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
 * Creates a tool object for the frontend ToolCard.
 * Using the contents of each toolFile (extracted from Github), along with Github URL
 * (repositoryUrl) of the tool, it's repository description (repoDescription) and
 * isAsyncAPIrepo boolean variable to define whether the tool repository is under
 * AsyncAPI organization or not, to create a JSON tool object as required in the frontend
 * side to show ToolCard.
 *
 * @param {AsyncAPITool} toolFile - The tool file content.
 * @param {string} [repositoryUrl=''] - The URL of the tool's repository.
 * @param {string} [repoDescription=''] - The description of the repository.
 * @param {boolean | string} [isAsyncAPIrepo=''] - Whether the tool repository is under the AsyncAPI organization.
 * @returns {Promise<object>} The tool object.
 */
async function createToolObject(
  toolFile: AsyncAPITool,
  repositoryUrl = '',
  repoDescription = '',
  isAsyncAPIrepo: boolean | string = ''
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
 * Converts tools data into a categorized tools list object.
 *
 * @param {ToolsData} data - The tools data from the GitHub API.
 * @returns {Promise<ToolsListObject>} The categorized tools list object.
 * @throws {Error} If there is an error processing the tools.
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
