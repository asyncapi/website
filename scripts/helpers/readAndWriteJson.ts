import { readFile, writeFile } from 'fs/promises';

import { convertToJson } from './utils';

/**
 * Reads the content of a file, converts it to JSON, and writes the JSON output to another file.
 *
 * This asynchronous function processes a file by reading its content, converting the content to JSON using a conversion utility, and writing the resulting JSON to the specified destination path. Each operation is wrapped in error handling, with an error thrown if any step fails.
 *
 * @param readPath - The file path from which to read the content.
 * @param writePath - The file path where the JSON output will be written.
 * @throws {Error} If reading the file, converting its content to JSON, or writing the JSON output fails.
 */
export async function writeJSON(readPath: string, writePath: string) {
  let readContent;
  let jsonContent;

  // Attempt to read the file
  try {
    readContent = await readFile(readPath, 'utf-8');
  } catch (err) {
    return Promise.reject(err);
  }

  // Attempt to convert content to JSON
  try {
    jsonContent = convertToJson(readContent);
  } catch (err) {
    return Promise.reject(err);
  }

  // Attempt to write the JSON content to file
  try {
    await writeFile(writePath, JSON.stringify(jsonContent));
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
}
