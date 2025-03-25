import fs from 'fs-extra';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { combineTools } from './tools/combine-tools';
import { getData } from './tools/extract-tools-github';
import { convertTools } from './tools/tools-object';
import { logger } from './utils/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Builds the tools by combining automated and manual tools data, and writes the result to the specified paths.
 *
 * @param {string} automatedToolsPath - The path to write the automated tools data.
 * @param {string} manualToolsPath - The path to read the manual tools data.
 * @param {string} toolsPath - The path to write the combined tools data.
 * @param {string} tagsPath - The path to write the tags data.
 * @throws {Error} - Throws an error if there is an issue during the build process.
 */
async function buildTools(automatedToolsPath: string, manualToolsPath: string, toolsPath: string, tagsPath: string) {
  try {
    const githubExtractData = await getData();
    const automatedTools = await convertTools(githubExtractData);

    await fs.writeFile(automatedToolsPath, JSON.stringify(automatedTools, null, '  '));

    const manualTools = JSON.parse(await fs.readFile(manualToolsPath, 'utf-8'));

    await combineTools(automatedTools, manualTools, toolsPath, tagsPath);
  } catch (err) {
    throw new Error(`An error occurred while building tools: ${(err as Error).message}`);
  }
}

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const automatedToolsPath = resolve(currentDirPath, '../config', 'tools-automated.json');
  const manualToolsPath = resolve(currentDirPath, '../config', 'tools-manual.json');
  const toolsPath = resolve(currentDirPath, '../config', 'tools.json');
  const tagsPath = resolve(currentDirPath, '../config', 'all-tags.json');

  buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath).catch((err) => {
    logger.error('Failed to build tools:', err);
    process.exit(1);
  });
}

export { buildTools };
