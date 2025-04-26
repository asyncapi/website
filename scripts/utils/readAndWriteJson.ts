import { readFile, writeFile } from 'fs/promises';

import { convertToJson } from './functions';

/**
 * Reads a file, converts its content to JSON, and writes the JSON to another file.
 * @param {string} readPath - The path to the file to read.
 * @param {string} writePath - The path to the file where JSON will be written.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
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
