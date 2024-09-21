const { getData } = require('./tools/extract-tools-github');
const { convertTools } = require('./tools/tools-object');
const { combineTools } = require('./tools/combine-tools');
const manualTools = require('../config/tools-manual.json')

const fs = require('fs');
const { resolve } = require('path');

const toolsPath = resolve(__dirname, '../../config', 'tools.json')
const tagsPath = resolve(__dirname, '../../config', 'all-tags.json')
const automatedToolsPath = resolve(__dirname, '../config', 'tools-automated.json')

const buildTools = async () => {
  try {
    let githubExtractData = await getData();
    let automatedTools = await convertTools(githubExtractData);
    fs.writeFileSync(
      automatedToolsPath,
      JSON.stringify(automatedTools, null, '  ')
    );
    await combineTools(automatedTools, manualTools, toolsPath, tagsPath);
  } catch (err) {
    throw new Error(`An error occurred while building tools: ${err.message}`);
  }
};

if (require.main === module) {
  buildTools();
}

module.exports = {buildTools}