const { getData } = require('./tools/extract-tools-github');
const { convertTools } = require('./tools/tools-object');
const fs = require('fs');
const { resolve } = require('path');

const buildTools = async () => {
  try {
    let githubExtractData = await getData();
    let toolsData = await convertTools(githubExtractData);
    fs.writeFileSync(
      resolve(__dirname, '../config', 'tools.json'),
      JSON.stringify(toolsData)
    );
  } catch (err) {
    console.log(err);
  }
};

buildTools();