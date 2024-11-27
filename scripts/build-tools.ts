import assert from 'assert';
import fs from 'fs-extra';
import { resolve } from 'path';

import { combineTools } from './tools/combine-tools';
import { getData } from './tools/extract-tools-github';
import { convertTools } from './tools/tools-object';

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
if (require.main === module) {
  const automatedToolsPath = resolve(__dirname, '../config', 'tools-automated.json');
  const manualToolsPath = resolve(__dirname, '../config', 'tools-manual.json');
  const toolsPath = resolve(__dirname, '../config', 'tools.json');
  const tagsPath = resolve(__dirname, '../config', 'all-tags.json');

  buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
}

export { buildTools };
