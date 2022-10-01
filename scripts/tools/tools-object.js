const schema = require("./tools-schema.json");
const axios = require('axios')
const Ajv = require("ajv")
const Fuse = require("fuse.js")
const { categoryList } = require("./categorylist")
const ajv = new Ajv()
const validate = ajv.compile(schema)

const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.2,
  keys: ["tag"]
}

const fuse = new Fuse(categoryList, options)

const createToolObject = (toolFile, repositoryUrl, isAsyncAPIrepo) => {
  let resultantObject = {
    title: toolFile.title,
    description: toolFile.description,
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
  for(var index in categoryList){
    appendData[categoryList[index].name] = {
      description: categoryList[index].description,
      toolsList: []
    };
  }
  const dataArray = data.items;
  for (let tool of dataArray) {
    if (tool.name === '.asyncapi-tool') {
      // extracting the reference id of the repository which will be used to extract the path of the .asyncapi-tool file in the Tools repository
      // ex: for a url = "https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=61855e7365a881e98c2fe667a658a0005753d873"
      // the text (id) present after '=' gives us a reference id for the repo
      let reference_id = tool.url.split("=")[1];
      let download_url = `https://raw.githubusercontent.com/${tool.repository.full_name}/${reference_id}/${tool.path}`;
      const { data: toolFileContent } = await axios.get(download_url);
      const valid = validate(toolFileContent)
      if (valid) {
        let repositoryUrl = tool.repository.html_url;
        let isAsyncAPIrepo = tool.repository.owner.login === "asyncapi";
        let toolObject = createToolObject(toolFileContent, repositoryUrl, isAsyncAPIrepo);
        toolFileContent.filters.categories.forEach((category) => {
          const categorySearch = fuse.search(category);
          if (categorySearch.length) {
            if (!appendData[categorySearch[0].item.name].toolsList.find((element => element === toolObject)))
              appendData[categorySearch[0].item.name].toolsList.push(toolObject);
          } else {
            if (!appendData['Others'].toolsList.find((element => element === toolObject)))
              appendData['Others'].toolsList.push(toolObject);
          }
        });
      } else {
        console.log("Repository: " + tool.repository.html_url)
        console.log("Error: " + validate.errors)
      }
    }
  }
  return appendData;
}

module.exports = { convertTools }
