import yaml from 'yaml';

/**
 * Converts a YAML or JSON string to a JSON object.
 * If the input is already a JSON object, it is returned as is.
 *
 * @param {unknown} contentYAMLorJSON - The content to be converted, either as a YAML/JSON string or a JSON object.
 * @returns {any} - The converted JSON object.
 * @throws {Error} - Throws an error if the content is neither valid JSON nor valid YAML.
 */
function convertToJson(data: any) {
  // Type validation check with explicit array rejection
  if (typeof data !== 'string' &&  // Reject non-strings
      (typeof data !== 'object' || // Allow objects but...
       data === null ||            // Exclude null (typeof null === 'object')
       Array.isArray(data))) {     // Explicitly reject arrays (which are objects)
    throw new Error('Invalid content format: Input must be a string or an object');
  }

  // Axios handles conversion to JSON by default, if data returned from the server allows it
  // So if returned content is not a string (not YAML), we just return JSON back
  if (typeof data !== 'string') {
    return data;
  }

  // Fix parsing order: JSON should be tried first
  try {
    return JSON.parse(data); // Try JSON first
  } catch (jsonError) {
    try {
      return yaml.parse(data); // Then try YAML
    } catch (yamlError) {
      // Maintain detailed error message
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
