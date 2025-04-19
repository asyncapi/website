import yaml from 'yaml';

/**
 * Converts a YAML or JSON string to a JSON object.
 * If the input is already a JSON object, it is returned as is.
 *
 * @param {unknown} contentYAMLorJSON - The content to be converted, either as a YAML/JSON string or a JSON object.
 * @returns {any} - The converted JSON object.
 * @throws {Error} - Throws an error if the content is neither valid JSON nor valid YAML.
 */
function convertToJson(contentYAMLorJSON: unknown): any {
  // Axios handles conversion to JSON by default, if data returned from the server allows it
  // So if returned content is not a string (not YAML), we just return JSON back
  if (typeof contentYAMLorJSON !== 'string') {
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
