const schema = require("./tools-schema.json");
const axios = require('axios')
const Ajv = require("ajv")
const Fuse = require("fuse.js")
const { categoryList } = require("./categorylist")
const ajv = new Ajv()
const validate = ajv.compile(schema)
const { convertToJson } = require('../utils');

const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.2,
  keys: ["tag"]
}

const fuse = new Fuse(categoryList, options)

const createToolObject = (toolFile, repositoryUrl, repoDescription, isAsyncAPIrepo) => {
  let resultantObject = {
    title: toolFile.title,
    description: toolFile.description || repoDescription,
    links: {
      ...toolFile.links,
      repoUrl: repositoryUrl,
    },
    filters: {
      ...toolFile.filters,
      isAsyncAPIOwner: isAsyncAPIrepo,
    },
  };
  return resultantObject;
};

async function convertTools(data) {
  let appendData = {};
  const dataArray = data.items;

  for (var index in categoryList) {
    appendData[categoryList[index].name] = {
      description: categoryList[index].description,
      toolsList: []
    };
  }

  for (let tool of dataArray) {
    try {
      if (tool.name === '.asyncapi-tool') {
        // extracting the reference id of the repository which will be used to extract the path of the .asyncapi-tool file in the Tools repository
        // ex: for a url = "https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=61855e7365a881e98c2fe667a658a0005753d873"
        // the text (id) present after '=' gives us a reference id for the repo
        let reference_id = tool.url.split("=")[1];
        let download_url = `https://raw.githubusercontent.com/${tool.repository.full_name}/${reference_id}/${tool.path}`;

        const { data: toolFileContent } = await axios.get(download_url);

        //some stuff can be YAML
        const jsonToolFileContent = convertToJson(toolFileContent)

        //validating against JSON Schema for tools file
        const isValid = validate(jsonToolFileContent)

        if (isValid) {
          let repositoryUrl = tool.repository.html_url;
          let repoDescription = tool.repository.description;
          let isAsyncAPIrepo = tool.repository.owner.login === "asyncapi";
          let toolObject = createToolObject(jsonToolFileContent, repositoryUrl, repoDescription, isAsyncAPIrepo);

          jsonToolFileContent.filters.categories.forEach((category) => {
            const categorySearch = fuse.search(category);

            if (categorySearch.length) {
              let searchedCategoryName = categorySearch[0].item.name
              if (!appendData[searchedCategoryName].toolsList.find((element => element === toolObject)))
                appendData[searchedCategoryName].toolsList.push(toolObject);
            } else {
              if (!appendData['Others'].toolsList.find((element => element === toolObject)))
                appendData['Others'].toolsList.push(toolObject);
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
  return appendData;
}


