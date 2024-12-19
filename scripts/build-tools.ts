import assert from 'assert';
import fs from 'fs-extra';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { combineTools } from './tools/combine-tools';
import { getData } from './tools/extract-tools-github';
import { convertTools } from './tools/tools-object';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

const buildTools = async (automatedToolsPath: string, manualToolsPath: string, toolsPath: string, tagsPath: string) => {
  try {
    const githubExtractData = await getData();
    const automatedTools = await convertTools(githubExtractData);

    await fs.writeFile(automatedToolsPath, JSON.stringify(automatedTools, null, '  '));

    // eslint-disable-next-line import/no-dynamic-require, global-require
    await combineTools(automatedTools, require(manualToolsPath), toolsPath, tagsPath);
  } catch (err) {
    assert(err instanceof Error);
    throw new Error(`An error occurred while building tools: ${err.message}`);
  }
};

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const automatedToolsPath = resolve(currentDirPath, '../config', 'tools-automated.json');
  const manualToolsPath = resolve(currentDirPath, '../config', 'tools-manual.json');
  const toolsPath = resolve(currentDirPath, '../config', 'tools.json');
  const tagsPath = resolve(currentDirPath, '../config', 'all-tags.json');

  buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
}

export { buildTools };
