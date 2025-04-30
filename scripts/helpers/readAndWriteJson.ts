import { readFile, writeFile } from 'fs/promises';

import { convertToJson } from './utils';

/**
 * Reads a file, converts its content to JSON, and writes the result to a destination file.
 *
 * @param readPath - Path to the source file to read.
 * @param writePath - Path to the destination file for the JSON output.
 *
 * @returns A promise that resolves when the operation completes.
 *
 * @remark If reading, conversion, or writing fails, the returned promise is rejected with the corresponding error.
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
