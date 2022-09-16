const schema = require("./tools-schema.json");
const axios = require('axios')
var validate = require("jsonschema").validate;

let appendData = {
    generator: [],
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
  
  const getContent = async (result_object) => {
    let reference_id = result_object.url.split("=")[1];
    let download_url = `https://raw.githubusercontent.com/${result_object.repository.full_name}/${reference_id}/${result_object.path}`;
    const { data } = await axios.get(download_url);
    if (!validate(data, schema).errors.length) {
      let repositoryUrl = result_object.repository.html_url;
      let isAsyncAPIrepo =
        result_object.repository.owner.login === "asyncapi";
      let toolObject = createToolObject(data, repositoryUrl, isAsyncAPIrepo);
      data.filters.categories.forEach((category) => {
        appendData[category].push(toolObject);
      });
    }
};

async function convertTools(data) {
    const dataArray = data.items;
    let len = dataArray.length;
    for(let i =0;i<len;i++){
      if(dataArray[i].name === '.asyncapi-tool')
        await getContent(dataArray[i]);
    }
    return appendData;
}

module.exports = {convertTools}
