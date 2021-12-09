const fs = require('fs');
const path = require('path');

/**
 * Look ma, it's cp -R.
 * 
 * Pun intended https://stackoverflow.com/a/22185855/6803886
 * 
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
 var copyRecursiveSync = function(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

/**
 * Copy all the internal schema files to expose them as static files.
 */
module.exports = function copySchemaFiles() {
  const sourcePath = path.resolve(__dirname, '../node_modules/@asyncapi/specs/definitions');
  const destinationPath = path.resolve(__dirname, '../public/definitions')

  const destinationExists = fs.existsSync(sourcePath);

  //Ensure we have a clean slate
  if(destinationExists) fs.rmSync(destinationPath, {recursive: true})

  copyRecursiveSync(sourcePath, destinationPath);
};
