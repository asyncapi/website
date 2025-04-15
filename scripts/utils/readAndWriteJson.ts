import { readFile, writeFile } from 'fs/promises';

import { convertToJson } from '../utils';

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
    if (err instanceof Error) {
      return Promise.reject(new Error(`Error while reading file\nError: ${err.message}`));
    }

    return Promise.reject(new Error('Error while reading file\nError: Unknown error'));
  }

  // Attempt to convert content to JSON
  try {
    jsonContent = convertToJson(readContent);
  } catch (err) {
    if (err instanceof Error) {
      return Promise.reject(new Error(`Error while conversion\nError: ${err.message}`));
    }

    return Promise.reject(new Error('Error while conversion\nError: Unknown error'));
  }

  // Attempt to write the JSON content to file
  try {
    await writeFile(writePath, JSON.stringify(jsonContent));
  } catch (err) {
    if (err instanceof Error) {
      return Promise.reject(new Error(`Error while writing file\nError: ${err.message}`));
    }

    return Promise.reject(new Error('Error while writing file\nError: Unknown error'));
  }

  return Promise.resolve();
}
