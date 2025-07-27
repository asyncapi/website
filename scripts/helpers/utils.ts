import yaml from 'yaml';

/**
 * Converts YAML or JSON input into a JSON object.
 *
 * If the input is not a string, it is assumed to be a JSON object and returned unchanged.
 * For string inputs, the function first attempts to parse it as JSON; if that fails, it then
 * attempts to parse the string as YAML.
 *
 * @param contentYAMLorJSON - The input content, which can be a YAML/JSON string or a JSON object.
 * @returns The resulting JSON object.
 * @throws {Error} If the input string cannot be parsed as either valid JSON or valid YAML.
 */
function convertToJson(contentYAMLorJSON: unknown): any {
  // Axios handles conversion to JSON by default, if data returned from the server allows it
  // So if returned content is not a string (not YAML), we just return JSON back
  if (typeof contentYAMLorJSON !== 'string') {
    return contentYAMLorJSON;
  }

  // Check if the content is valid JSON before attempting to parse as YAML
  try {
    return JSON.parse(contentYAMLorJSON);
  } catch (jsonError) {
    // If it's not valid JSON, try parsing it as YAML
    try {
      return yaml.parse(contentYAMLorJSON);
    } catch (yamlError) {
      // If parsing as YAML also fails, throw an error
      throw new Error(`Invalid content format:\nJSON Parse Error: ${jsonError}\nYAML Parse Error: ${yamlError}`);
    }
  }
}

/**
 * Pauses execution for a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to pause.
 * @returns {Promise<void>}
 */
async function pause(ms: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export { convertToJson, pause };
