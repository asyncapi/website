import fs from 'fs-extra';

import { CustomError } from '@/types/errors/CustomError';

import { combineTools } from './tools/combine-tools';
import { getData } from './tools/extract-tools-github';
import { convertTools } from './tools/tools-object';

/**
 * Combines automated and manual tools data and writes the results to the specified file paths.
 *
 * This asynchronous function retrieves data from GitHub, converts it for automated tools,
 * and writes the output in JSON format to the provided automated tools path. It then reads
 * manual tools data from the specified manual tools path and merges both datasets using the
 * combineTools utility, writing the consolidated tools data and tags to their respective paths.
 *
 * @param automatedToolsPath - The file path where the automated tools data will be written.
 * @param manualToolsPath - The file path from which the manual tools data is read.
 * @param toolsPath - The file path where the combined tools data will be written.
 * @param tagsPath - The file path where the tags data will be written.
 * @throws {CustomError} If an error occurs during the build process.
 */
export async function buildTools(
  automatedToolsPath: string,
  manualToolsPath: string,
  toolsPath: string,
  tagsPath: string
) {
  try {
    const githubExtractData = await getData();
    const automatedTools = await convertTools(githubExtractData);

    await fs.writeFile(automatedToolsPath, JSON.stringify(automatedTools, null, '  '));

    const manualTools = JSON.parse(await fs.readFile(manualToolsPath, 'utf-8'));

    await combineTools(automatedTools, manualTools, toolsPath, tagsPath);
  } catch (err) {
    throw CustomError.fromError(err, {
      category: 'script',
      operation: 'buildTools',
      detail: `Failed to build tools - automated: ${automatedToolsPath}, manual: ${manualToolsPath}, output: ${toolsPath}`
    });
  }
}
