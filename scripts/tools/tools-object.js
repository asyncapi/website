const schema = require("./tools-schema.json");
const axios = require('axios')
const Ajv = require("ajv")
const Fuse = require("fuse.js")
const ajv = new Ajv()
const validate = ajv.compile(schema)

const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.2,
}

let categoryList = ["generator", "code-first", "converters", "validators", "directories", "documentation generators", "dls", "frameworks", "ui components", "mocking and testing", "diff", "ci&cd", "editors"]

const fuse = new Fuse(categoryList, options)

let appendData = {
  "generator": [],
  "code-first": [],
  "converters": [],
  "validators": [],
  "directories": [],
  "documentation generators": [],
  "dls": [],
  "frameworks": [],
  "ui components": [],
  "mocking and testing": [],
  "diff": [],
  "ci&cd": [],
  "editors": [],
  "others": []
};

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
  const dataArray = data.items;
  let len = dataArray.length;
  for (let i = 0; i < len; i++) {
    if (dataArray[i].name === '.asyncapi-tool') {
      let result_object = dataArray[i];
      let reference_id = result_object.url.split("=")[1];
      let download_url = `https://raw.githubusercontent.com/${result_object.repository.full_name}/${reference_id}/${result_object.path}`;
      const { data: toolFileContent } = await axios.get(download_url);
      const valid = validate(toolFileContent)
      if (valid) {
        let repositoryUrl = result_object.repository.html_url;
        let isAsyncAPIrepo = result_object.repository.owner.login === "asyncapi";
        let toolObject = createToolObject(toolFileContent, repositoryUrl, isAsyncAPIrepo);
        toolFileContent.filters.categories.forEach((category) => {
          const categorySearch = fuse.search(category);
          if (categorySearch.length) {
            console.log(categorySearch[0].item)
            if (!appendData[categorySearch[0].item].find((element => element === toolObject)))
              appendData[categorySearch[0].item].push(toolObject);
          } else {
            if (!appendData['others'].find((element => element === toolObject)))
              appendData['others'].push(toolObject);
          }
        });
      } else {
        console.log("Repository: " + result_object.repository.html_url)
        console.log("Error: " + validate.errors)
      }
    }
  }
  return appendData;
}

module.exports = { convertTools }
