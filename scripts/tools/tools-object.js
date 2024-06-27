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
  let resultantObject = {
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
  let finalToolsObject = {};
  const dataArray = data.items;

  // initialising finalToolsObject with all categories inside it with proper elements in each category
  for (var index in categoryList) {
    finalToolsObject[categoryList[index].name] = {
      description: categoryList[index].description,
      toolsList: []
    };
  }

  for (let tool of dataArray) {
    try {
      if (tool.name.startsWith('.asyncapi-tool')) {
        // extracting the reference id of the repository which will be used to extract the path of the .asyncapi-tool file in the Tools repository
        // ex: for a url = "https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=61855e7365a881e98c2fe667a658a0005753d873"
        // the text (id) present after '=' gives us a reference id for the repo
        let reference_id = tool.url.split("=")[1];
        let download_url = `https://raw.githubusercontent.com/${tool.repository.full_name}/${reference_id}/${tool.path}`;

        console.log(`Fetching tool file from URL: ${download_url}`);
        const { data: toolFileContent } = await axios.get(download_url);
        console.log(`Data received from URL ${download_url}:`, toolFileContent);

        //some stuff can be YAML
        const jsonToolFileContent = await convertToJson(toolFileContent)
        console.log(`Converted JSON content:`, jsonToolFileContent);

        //validating against JSON Schema for tools file
        const isValid = await validate(jsonToolFileContent)
        console.log(`Validation result: ${isValid}`);
        
        if (isValid) {
          let repositoryUrl = tool.repository.html_url;
          let repoDescription = tool.repository.description;
          let isAsyncAPIrepo = tool.repository.owner.login === "asyncapi";
          let toolObject = await createToolObject(jsonToolFileContent, repositoryUrl, repoDescription, isAsyncAPIrepo);
          console.log(`Created tool object:`, toolObject);

          // Tool Object is appended to each category array according to Fuse search for categories inside Tool Object
          jsonToolFileContent.filters.categories.forEach(async (category) => {
            const categorySearch = await fuse.search(category);

            if (categorySearch.length) {
              let searchedCategoryName = categorySearch[0].item.name
              if (!finalToolsObject[searchedCategoryName].toolsList.find((element => element === toolObject)))
                finalToolsObject[searchedCategoryName].toolsList.push(toolObject);
            } else {
              // if Tool object has a category, not defined in our categorylist, then this provides a `other` category to the tool.
              if (!finalToolsObject['Others'].toolsList.find((element => element === toolObject)))
                finalToolsObject['Others'].toolsList.push(toolObject);
            }
          });
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
  }
  return finalToolsObject;
}

module.exports = { convertTools, createToolObject }
