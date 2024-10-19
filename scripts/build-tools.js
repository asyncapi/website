const { getData } = require('./tools/extract-tools-github');
const { convertTools } = require('./tools/tools-object');
const { combineTools } = require('./tools/combine-tools');
const fs = require('fs');
const { resolve, dirname } = require('path');

const buildTools = async (automatedToolsPath, manualToolsPath, toolsPath, tagsPath) => {
  try {
    let githubExtractData = await getData();
    let automatedTools = await convertTools(githubExtractData);
    
    const automatedDir = dirname(automatedToolsPath);

    if (!fs.existsSync(automatedDir)) {
      fs.mkdirSync(automatedDir, { recursive: true });
    }

    await retryWriteFile(automatedToolsPath, JSON.stringify(automatedTools, null, '  '));

    await combineTools(automatedTools, require(manualToolsPath), toolsPath, tagsPath);
  } catch (err) {
    throw new Error(`An error occurred while building tools: ${err.message}`);
  }
};

async function retryWriteFile(filePath, data, retries = 3, delay = 1000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      fs.writeFileSync(filePath, data);
      console.log(`File written successfully to ${filePath}`);
      break;
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`ENOENT error on attempt ${attempt + 1}. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }
}

/* istanbul ignore next */
if (require.main === module) {
  const automatedToolsPath = resolve(__dirname, '../config', 'tools-automated.json');
  const manualToolsPath = resolve(__dirname, '../config', 'tools-manual.json');
  const toolsPath = resolve(__dirname, '../config', 'tools.json');
  const tagsPath = resolve(__dirname, '../config', 'all-tags.json');

  buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
}

module.exports = { buildTools };
