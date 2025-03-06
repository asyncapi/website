/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../public/locales'); 
const PRIMARY_LOCALE = 'en';

const readJson = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    process.stdout.write(`Error reading file: ${filePath}`, err);
    return {};
  }
};

const checkLocale = (primaryFolder, folder) => {
  const primaryFolderPath = path.join(LOCALES_DIR, primaryFolder);
  const folderPath = path.join(LOCALES_DIR, folder);

  if (!fs.existsSync(primaryFolderPath)) {
    process.stdout.write(`Primary locale folder missing: ${primaryFolderPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(folderPath)) {
    process.stdout.write(`Folder missing: ${folderPath}`);
    process.exit(1);
  }

  const primaryFiles = fs.readdirSync(primaryFolderPath).filter(file => file.endsWith('.json'));
  const localeFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.json'));

  primaryFiles.forEach(file => {
    if (!localeFiles.includes(file)) {
        process.stdout.write(`Missing file in ${folder}: ${file}`);
        process.exit(1);
    }

    const primaryFilePath = path.join(primaryFolderPath, file);
    const localeFilePath = path.join(folderPath, file);

    const primaryData = readJson(primaryFilePath);
    const localeData = readJson(localeFilePath);

    const missingKeys = Object.keys(primaryData).filter(key => !(key in localeData));

    if (missingKeys.length > 0) {
        process.stdout.write(`Missing keys in ${folder}/${file}: ${JSON.stringify(missingKeys, null, 2)}`);
        process.exit(1);
    } else {
        process.stdout.write(`${folder}/${file} is consistent.`);
    }
  });
};

const localeFolders = fs.readdirSync(LOCALES_DIR).filter(folder => 
    fs.statSync(path.join(LOCALES_DIR, folder)).isDirectory()
);

localeFolders.forEach(folder => {
  if (folder !== PRIMARY_LOCALE) {
    checkLocale(PRIMARY_LOCALE, folder);
  }
}); 

