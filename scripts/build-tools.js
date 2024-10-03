const { getData } = require('./tools/extract-tools-github');
const { convertTools } = require('./tools/tools-object');
const { combineTools } = require('./tools/combine-tools');
const fs = require('fs');
const { resolve } = require('path');

const buildTools = async (automatedToolsPath, manualToolsPath, toolsPath, tagsPath) => {
  try {
    let githubExtractData = await getData();
    let automatedTools = await convertTools(githubExtractData);

    fs.writeFileSync(
      automatedToolsPath,
      JSON.stringify(automatedTools, null, '  ')
    );

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

module.exports = { buildTools };
