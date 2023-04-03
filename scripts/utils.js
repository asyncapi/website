const yaml = require('yaml');

function convertToJson(contentYAMLorJSON) {

    //Axios handles conversion to JSON by default, if data returned for the server allows it
    //So if returned content is not string (not YAML) we just return JSON back
    if (typeof contentYAMLorJSON !== "string") return contentYAMLorJSON;
  
    //in some cases json can be passed here as string as it failed parsing to json because of json related error
    //instead of passint it to yaml parser, return same stuff that came in so it fails on JSON Schema validation later
    if (contentYAMLorJSON.trimLeft().startsWith('{')) return contentYAMLorJSON
  
    return yaml.parse(contentYAMLorJSON);
  }
  
  module.exports = { convertToJson }