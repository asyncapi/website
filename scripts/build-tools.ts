import fs from 'fs-extra';
import { resolve } from 'path';
import { getData } from './tools/extract-tools-github.js';
import { convertTools } from './tools/tools-object.js';
import { combineTools } from './tools/combine-tools.js';

const buildTools = async (automatedToolsPath, manualToolsPath, toolsPath, tagsPath) => {
  try {
    const githubExtractData = await getData();
    const automatedTools = await convertTools(githubExtractData);

    await fs.writeFile(automatedToolsPath, JSON.stringify(automatedTools, null, '  '));

    await combineTools(automatedTools, require(manualToolsPath), toolsPath, tagsPath);
  } catch (err) {
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
