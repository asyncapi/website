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
    console.error(`Error reading file: ${filePath}`, err);
    return {};
  }
};

const checkLocale = (primaryFolder, folder) => {
  const primaryFolderPath = path.join(LOCALES_DIR, primaryFolder);
  const folderPath = path.join(LOCALES_DIR, folder);

  if (!fs.existsSync(primaryFolderPath)) {
    console.error(`Primary locale folder missing: ${primaryFolderPath}`);
    return false;
  }

  if (!fs.existsSync(folderPath)) {
    console.error(`Folder missing: ${folderPath}`);
    return false;
  }

  const primaryFiles = fs.readdirSync(primaryFolderPath).filter(file => file.endsWith('.json'));
  const localeFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.json'));

  let hasErrors = false;
  primaryFiles.forEach(file => {
    if (!localeFiles.includes(file)) {
        console.error(`Missing file in ${folder}: ${file}`);
        hasErrors = true;
        return;
    }

    const primaryFilePath = path.join(primaryFolderPath, file);
    const localeFilePath = path.join(folderPath, file);

    const primaryData = readJson(primaryFilePath);
    const localeData = readJson(localeFilePath);

    const missingKeys = Object.keys(primaryData).filter(key => !(key in localeData));

    if (missingKeys.length > 0) {
        console.error(`Missing keys in ${folder}/${file}: ${JSON.stringify(missingKeys, null, 2)}`);
        hasErrors = true;
    } else {
        console.log(`${folder}/${file} is consistent.`);
    }
  });
  return !hasErrors;
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

