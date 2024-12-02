const schema = require("./tools-schema.json");
const axios = require('axios')
const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const Fuse = require("fuse.js")
const { categoryList } = require("./categorylist")
const ajv = new Ajv()
addFormats(ajv, ["uri"])
const validate = ajv.compile(schema)
const { convertToJson } = require('../utils');

// Config options set for the Fuse object
const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.4,
  keys: ["tag"]
}

const fuse = new Fuse(categoryList, options)

// using the contents of each toolFile (extracted from Github), along with Github URL 
// (repositoryUrl) of the tool, it's repository description (repoDescription) and 
// isAsyncAPIrepo boolean variable to define whether the tool repository is under 
// AsyncAPI organization or not, to create a JSON tool object as required in the frontend 
// side to show ToolCard.
const createToolObject = async (toolFile, repositoryUrl = '', repoDescription = '', isAsyncAPIrepo = '') => {
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
};

// Each result obtained from the Github API call will be tested and verified 
// using the defined JSON schema, categorising each tool inside their defined categories
// and creating a JSON tool object in which all the tools are listed in defined 
// categories order, which is then updated in `automated-tools.json` file.
async function convertTools(data) {
  try {
    let finalToolsObject = {};
    const dataArray = data.items;

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

    await Promise.all(dataArray.map(async (tool) => {
      try {
        if (tool.name.startsWith('.asyncapi-tool')) {
          const referenceId = tool.url.split('=')[1];
          const downloadUrl = `https://raw.githubusercontent.com/${tool.repository.full_name}/${referenceId}/${tool.path}`;

          const { data: toolFileContent } = await axios.get(downloadUrl);

          //some stuff can be YAML
          const jsonToolFileContent = await convertToJson(toolFileContent)

          //validating against JSON Schema for tools file
          const isValid = await validate(jsonToolFileContent)

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
            await Promise.all(jsonToolFileContent.filters.categories.map(async (category) => {
              const categorySearch = await fuse.search(category);
              const targetCategory = categorySearch.length ? categorySearch[0].item.name : 'Others';
              const { toolsList } = finalToolsObject[targetCategory];
              if (!toolsList.includes(toolObject)) {
                toolsList.push(toolObject);
              }
            }));
          } else {
            console.error('Script is not failing, it is just dropping errors for further investigation');
            console.error('Invalid .asyncapi-tool file.');
            console.error(`Located in: ${tool.html_url}`);
            console.error('Validation errors:', JSON.stringify(validate.errors, null, 2));
          }
        }
      } catch (err) {
        console.error(err)
        throw err;
      }
    }))
    return finalToolsObject;
  } catch (err) {
    throw new Error(`Error processing tool: ${err.message}`)
  }
}

module.exports = { convertTools, createToolObject }
