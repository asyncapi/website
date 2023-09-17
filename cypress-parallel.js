const fs = require('fs');
const path = require('path');

const NODE_INDEX = Number(process.argv[2] || 1);
const NODE_TOTAL = Number(process.argv[3] || 1);

const TEST_FOLDER = './cypress/e2e';

console.log(getSpecFiles().join(','))

function getSpecFiles() {
  const allSpecFiles = traverse(TEST_FOLDER);
  const node_index= NODE_INDEX +1;
  return allSpecFiles.sort()
    .filter((_, index) => (index % NODE_TOTAL) === (node_index - 1));

}

function traverse(dir) {
  let files = fs.readdirSync(dir);
  files = files.map(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) return traverse(filePath);
    else if (stats.isFile())return filePath;
  });

  return files
    .reduce((all, folderContents) => all.concat(folderContents), []);

}
