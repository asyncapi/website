import { readFile, writeFile } from 'fs/promises';

import { convertToJson } from '../../utils/utils';

/**
 * Reads a file, converts its content to JSON, and writes the JSON content to another file.
 *
 * @param {string} readPath - The path of the file to read.
 * @param {string} writePath - The path of the file to write the JSON content to.
 * @throws Will throw an error if reading, converting, or writing the file fails.
 */
export async function writeJSON(readPath: string, writePath: string) {
  let readContent;
  let jsonContent;

  // Attempt to read the file
  try {
    readContent = await readFile(readPath, 'utf-8');
  } catch (err) {
    throw new Error(`Error while reading file\nError: ${err}`);
  }

  // Attempt to convert content to JSON
  try {
    jsonContent = convertToJson(readContent);
  } catch (err) {
    throw new Error(`Error while conversion\nError: ${err}`);
  }

  // Attempt to write the JSON content to file
  try {
    await writeFile(writePath, JSON.stringify(jsonContent));
  } catch (err) {
    throw new Error(`Error while writing file\nError: ${err}`);
  }
}
