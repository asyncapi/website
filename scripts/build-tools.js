const { getData } = require('./tools/extract-tools-github');
const { convertTools } = require('./tools/tools-object');
const { combineTools } = require('./tools/combine-tools');
const fs = require('fs');
const { resolve } = require('path');

const buildTools = async () => {
  try {
    let githubExtractData = await getData();
    let toolsData = await convertTools(githubExtractData);
    fs.writeFileSync(
      resolve(__dirname, '../config', 'tools-automated.json'),
      JSON.stringify(toolsData)
    );
    await combineTools(toolsData);
  } catch (err) {
    console.log(err);
    throw err
  }
};

buildTools();