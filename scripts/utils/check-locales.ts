import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import lodash from 'lodash';
import { logger } from '../utils/logger';
import { dirname } from 'path';

const { flatten, fromPairs, uniq } = lodash;

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

const localesDir = path.resolve(
  currentDirPath,
  '..',
  '..',
  'public',
  'locales',
);

/**
 * Extracts all keys from a JSON object, including nested keys using lodash
 *
 * @param {Record<string, any>} obj - The JSON object to extract keys from
 * @returns {string[]} Array of keys with their full paths (using dot notation for nested keys)
 */
function extractKeys(obj: Record<string, any>): string[] {
  const extractNestedKeys = (
    obj: Record<string, any>,
    prefix: string = '',
  ): string[] => {
    return flatten(
      Object.entries(obj).map(([key, value]) => {
        const currentKey = prefix ? `${prefix}.${key}` : key;
        if (value !== null && typeof value === 'object') {
          return extractNestedKeys(value, currentKey);
        }
        return currentKey;
      }),
    );
  };
  return extractNestedKeys(obj);
}

/**
 * Reads all JSON files in a directory and returns their contents
 *
 * @param {string} dir - Path to the directory containing JSON files
 * @returns {Record<string, any>} Object with filenames as keys and parsed JSON contents as values
 */
function readJSONFilesInDir(dir: string): Record<string, any> {
  try {
    const files = fs.readdirSync(dir);
    return fromPairs(
      files
        .filter((file) => path.extname(file) === '.json')
        .map((file) => {
          const filePath = path.join(dir, file);
          try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return [file, content];
          } catch (error) {
            logger.error(`Error reading ${filePath}`);
            return [file, {}];
          }
        }),
    );
  } catch (error) {
    logger.error(`Error reading directory ${dir}`);
    return {};
  }
}

/**
 * Validates that all locale files have the same keys across different languages
 *
 * @returns {void}
 * @throws Will exit process with code 1 if validation errors are found
 */
function validateLocales(): void {
  try {
    const languages = fs
      .readdirSync(localesDir)
      .filter((file) => fs.statSync(path.join(localesDir, file)).isDirectory());

    if (languages.length === 0) {
      logger.error('No language directories found in', localesDir);
      return;
    }

    logger.info(`Found ${languages.length} languages: ${languages.join(', ')}`);

    const languageFiles: Record<string, Record<string, any>> = {};
    const fileKeys: Record<string, Record<string, string[]>> = {};

    for (const lang of languages) {
      const langDir = path.join(localesDir, lang);
      languageFiles[lang] = readJSONFilesInDir(langDir);
      fileKeys[lang] = fromPairs(
        Object.entries(languageFiles[lang]).map(([file, content]) => [
          file,
          extractKeys(content),
        ]),
      );
    }

    const allFiles = uniq(
      flatten(Object.values(languageFiles).map((files) => Object.keys(files))),
    );

    let hasErrors = false;

    for (const file of allFiles) {
      const langsWithFile = languages.filter(
        (lang) => languageFiles[lang][file],
      );
      if (langsWithFile.length <= 1) continue;

      const allKeysAcrossLanguages = uniq(
        flatten(langsWithFile.map((lang) => fileKeys[lang][file])),
      );

      const missingKeysByLang = fromPairs(
        langsWithFile.map((lang) => {
          const langKeysSet = new Set(fileKeys[lang][file]);
          const missingKeys = allKeysAcrossLanguages.filter(
            (key) => !langKeysSet.has(key),
          );
          return [lang, missingKeys];
        }),
      );

      const langsWithMissingKeys = Object.entries(missingKeysByLang).filter(
        ([_, missing]) => missing.length > 0,
      );

      if (langsWithMissingKeys.length > 0) {
        logger.info(`\nMissing keys in '${file}':`);
        langsWithMissingKeys.forEach(([lang, missing]) => {
          logger.error(
            `❌ Language '${lang}' is missing these keys: ${missing.join(', ')}`,
          );
          hasErrors = true;
        });
      }
    }

    if (!hasErrors) {
      logger.info(
        '✅ All locale files have the same keys across all languages!',
      );
    } else {
      logger.error(
        '\n❌ Some translation keys are missing. Please fix the issues above.',
      );
      process.exit(1);
    }
  } catch (error) {
    logger.error('Error validating locales:');
    process.exit(1);
  }
}

export { validateLocales, extractKeys, readJSONFilesInDir };

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateLocales();
}
