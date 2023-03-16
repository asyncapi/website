const { getData } = require('./tools/extract-tools-github');
const { convertTools } = require('./tools/tools-object');
const { combineTools } = require('./tools/combine-tools');
const manualTools = require('../config/tools-manual.json')

const fs = require('fs');
const { resolve } = require('path');

const buildTools = async () => {
  try {
    let githubExtractData = await getData();
    let automatedTools = await convertTools(githubExtractData);
    fs.writeFileSync(
      resolve(__dirname, '../config', 'tools-automated.json'),
      JSON.stringify(automatedTools, null, '  ')
    );
    await combineTools(automatedTools, manualTools);
  } catch (err) {
    console.log(err);
    throw err
  }
};

buildTools();