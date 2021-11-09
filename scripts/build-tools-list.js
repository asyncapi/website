/* eslint-disable */
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const { walkDirectories, checkAndGroupDocumentsByCategory } = require('./utils');

const directories = [[argv.directory]];
const tool = argv.tool;

const main = () => {
  const result = []
  const pathToFile = resolve(__dirname, '..', 'config', 'tools.json');
  let exisitingFile = {};
  
  try {
    // load the file if we have it
    exisitingFile = JSON.parse(readFileSync(pathToFile, 'utf-8'));
  } catch (error) {
    // file not there, that's ok
  }

  walkDirectories(directories, result)

  const groupedResults = checkAndGroupDocumentsByCategory(result);

  writeFileSync(resolve(__dirname, '..', 'config', 'tools.json'), JSON.stringify({
    ...exisitingFile,
    [tool]: groupedResults
  }, null, '  '))
};

main();

