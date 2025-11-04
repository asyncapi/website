import fs from 'fs-extra';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { logger } from './helpers/logger';
import { combineTools } from './tools/combine-tools';
import { getData } from './tools/extract-tools-github';
import { convertTools } from './tools/tools-object';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Combines automated and manual tools data.
 * 
 * @param automatedTools - The automated tools data
 * @param manualTools - The manual tools data
 * @param toolsPath - The file path where the combined tools data will be written
 * @param tagsPath - The file path where the tags data will be written
 */
async function combineAutomatedAndManualTools(
  automatedTools: any,
  manualTools: any,
  toolsPath: string,
  tagsPath: string
) {
  try {
    await combineTools(automatedTools, manualTools, toolsPath, tagsPath);
  } catch (err) {
    logger.error('Error while combining tools:', err);
    throw new Error(`An error occurred while combining tools: ${(err as Error).message}`);
  }
}

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
 * @throws {Error} If an error occurs during the build process.
 */
async function buildTools(automatedToolsPath: string, manualToolsPath: string, toolsPath: string, tagsPath: string) {
  try {
    const githubExtractData = await getData();
    const automatedTools = await convertTools(githubExtractData);

    await fs.writeFile(automatedToolsPath, JSON.stringify(automatedTools, null, '  '));

    const manualTools = JSON.parse(await fs.readFile(manualToolsPath, 'utf-8'));
    await combineAutomatedAndManualTools(automatedTools, manualTools, toolsPath, tagsPath);
  } catch (err) {
    throw new Error(`An error occurred while building tools: ${(err as Error).message}`);
  }
}

/**
 * Builds tools manually by combining existing automated tools with manual tools.
 * This function is used to ensure that it reflects changes in tools-manual.json.
 */
async function buildToolsManual(
  automatedToolsPath: string, 
  manualToolsPath: string, 
  toolsPath: string, 
  tagsPath: string
) {
  try {
    if (!await fs.pathExists(automatedToolsPath)) {
      throw new Error(
        `Automated tools file not found at ${automatedToolsPath}.`);
    }
    
    if (!await fs.pathExists(manualToolsPath)) {
      throw new Error(`Manual tools file not found at ${manualToolsPath}.`);
    }
    
    const automatedTools = JSON.parse(await fs.readFile(automatedToolsPath, 'utf-8'));
    const manualTools = JSON.parse(await fs.readFile(manualToolsPath, 'utf-8'));
    await combineAutomatedAndManualTools(automatedTools, manualTools, toolsPath, tagsPath);
  } catch (err) {
    logger.error('Error in buildToolsManual:', err);
    throw new Error(`An error occurred while building tools manually: ${(err as Error).message}`);
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

export { buildTools, buildToolsManual };
