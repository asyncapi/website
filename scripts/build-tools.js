const { getData } = require('./tools/extract-tools-github');
const { convertTools } = require('./tools/tools-object');
const fs = require('fs');
const { resolve } = require('path');

let githubExtractData = {};
let toolsData = {};

const buildTools = async () => {
  try {
    githubExtractData = await getData();
    toolsData = await convertTools(githubExtractData);
    fs.writeFileSync(
      resolve(__dirname, '../config', 'tools.json'),
      JSON.stringify(toolsData)
    );
  } catch (err) {
    console.log(err);
  }
};

buildTools();
