const schema = require("./tools-schema.json");
const axios = require('axios')
var validate = require("jsonschema").validate;

let appendData = {
    generator: [],
};

const makeObject = (object, repositoryUrl, isAsyncAPIrepo) => {
    let resultantObject = {
      title: object.title,
      description: object.description,
      links: {
        websiteUrl: object.links.websiteUrl,
        docsUrl: object.links.docsUrl,
        iconUrl: object.links.iconUrl,
        repoUrl: repositoryUrl,
      },
      filters: {
        languages: object.filters.language,
        technology: object.filters.technology,
        categories: object.filters.categories,
        hasCommercial: object.filters.hasCommercial,
        isAsyncAPIOwner: isAsyncAPIrepo,
      },
    };
    return resultantObject;
  };
  
  const getContent = async (result_object) => {
    let reference_id = result_object.url.split("=")[1];
    let download_url = `https://raw.githubusercontent.com/${result_object.repository.full_name}/${reference_id}/${result_object.path}`;
    //   console.log(download_url);
    let toolObject;
    const resp = await axios.get(download_url);
    if (!validate(resp.data, schema).errors.length) {
      let repositoryUrl = result_object.html_url;
      let isAsyncAPIrepo =
        result_object.repository.owner.login === "asyncapi" ? true : false;
      toolObject = makeObject(resp.data, repositoryUrl, isAsyncAPIrepo);
      resp.data.filters.categories.forEach((category) => {
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
