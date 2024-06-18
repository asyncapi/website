const yaml = require('yaml');

function convertToJson(contentYAMLorJSON) {
    // Axios handles conversion to JSON by default, if data returned from the server allows it
    // So if returned content is not a string (not YAML), we just return JSON back
    if (typeof contentYAMLorJSON !== "string") {
        return contentYAMLorJSON;
    }

    // Check if the content is valid JSON before attempting to parse as YAML
    try {
        const jsonContent = JSON.parse(contentYAMLorJSON);
        return jsonContent;
    } catch (jsonError) {
        // If it's not valid JSON, try parsing it as YAML
        try {
            const yamlContent = yaml.parse(contentYAMLorJSON);
            return yamlContent;
        } catch (yamlError) {
            // If parsing as YAML also fails, throw an error
            throw new Error(`Invalid content format:\nJSON Parse Error: ${jsonError}\nYAML Parse Error: ${yamlError}`);
        }
    }
}

module.exports = { convertToJson };
