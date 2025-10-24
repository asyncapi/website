import fs from 'fs';
import lodash from 'lodash';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { logger } from './logger';

const { flatten, fromPairs, uniq } = lodash;

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

const localesDir = path.resolve(currentDirPath, '..', '..', 'public', 'locales');

/**
 * Extracts all keys from a JSON object, including nested keys using lodash
 *
 * @param {Record<string, any>} obj - The JSON object to extract keys from
 * @returns {string[]} Array of keys with their full paths (using dot notation for nested keys)
 */
function extractKeys(obj: Record<string, any>): string[] {
  const extractNestedKeys = (nestedObj: Record<string, any>, prefix = '', result: string[] = []): string[] => {
    for (const [key, value] of Object.entries(nestedObj)) {
      const currentKey = prefix ? `${prefix}.${key}` : key;

      if (value !== null && typeof value === 'object') {
        extractNestedKeys(value, currentKey, result);
      } else {
        result.push(currentKey);
      }
    }

    return result;
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
            logger.error('Failed to parse JSON locale file', {
              error: error instanceof Error ? error : new Error(String(error)),
              operation: 'parseJSON',
              filePath,
              fileName: file,
              directory: dir,
              fileExtension: path.extname(file),
              errorType: error instanceof SyntaxError ? 'JSON_SYNTAX_ERROR' : 'FILE_READ_ERROR'
            });

            return [file, {}];
          }
        })
    );
  } catch (error) {
    logger.error('Failed to read locale directory', {
      error: error instanceof Error ? error : new Error(String(error)),
      operation: 'readDirectory',
      directory: dir,
      absolutePath: path.resolve(dir),
      errorType: 'DIRECTORY_ACCESS_ERROR',
      nodeError: error instanceof Error && 'code' in error ? (error as any).code : undefined
    });

    return {};
  }
}

/**
 * Validates that all locale files have the same keys across different languages
 *
 * @returns {void}
 * @throws {Error} If validation fails or encounters an error
 */
function validateLocales(): void {
  try {
    const languages = fs
      .readdirSync(localesDir)
      .filter((file) => fs.statSync(path.join(localesDir, file)).isDirectory());

    if (languages.length === 0) {
      const error = new Error(`No language directories found in ${localesDir}`);

      logger.error('Locale validation failed: No language directories', {
        error,
        operation: 'validateLocales',
        localesDir,
        absoluteLocalesDir: path.resolve(localesDir),
        errorType: 'NO_LANGUAGE_DIRECTORIES',
        expectedStructure: 'Expected subdirectories like en/, es/, fr/ containing JSON files'
      });
      throw error;
    }

    logger.info(`Found ${languages.length} languages: ${languages.join(', ')}`);

    const languageFiles: Record<string, Record<string, any>> = {};
    const fileKeys: Record<string, Record<string, string[]>> = {};

    for (const lang of languages) {
      const langDir = path.join(localesDir, lang);

      languageFiles[lang] = readJSONFilesInDir(langDir);
      fileKeys[lang] = fromPairs(
        Object.entries(languageFiles[lang]).map(([file, content]) => [file, extractKeys(content)])
      );
    }

    const allFiles = uniq(flatten(Object.values(languageFiles).map((files) => Object.keys(files))));

    let hasErrors = false;

    for (const file of allFiles) {
      const langsWithFile = languages.filter((lang) => languageFiles[lang][file]);

      if (langsWithFile.length <= 1) {
        logger.info(`Skipping '${file}' (only found in ${langsWithFile.length} language)`);
        // eslint-disable-next-line no-continue
        continue;
      }

      const allKeysAcrossLanguages = uniq(flatten(langsWithFile.map((lang) => fileKeys[lang][file])));

      const missingKeysByLang = fromPairs(
        langsWithFile.map((lang) => {
          const langKeysSet = new Set(fileKeys[lang][file]);
          const missingKeys = allKeysAcrossLanguages.filter((key) => !langKeysSet.has(key));

          return [lang, missingKeys];
        })
      );

      const langsWithMissingKeys = Object.entries(missingKeysByLang).filter(([, missing]) => missing.length > 0);

      if (langsWithMissingKeys.length > 0) {
        logger.info(`\nMissing keys in '${file}':`);
        langsWithMissingKeys.forEach(([lang, missing]) => {
          logger.error(`Translation keys missing in language '${lang}'`, {
            operation: 'validateTranslationKeys',
            fileName: file,
            language: lang,
            missingKeys: missing,
            missingKeyCount: missing.length,
            totalKeysInFile: allKeysAcrossLanguages.length,
            errorType: 'MISSING_TRANSLATION_KEYS',
            affectedLanguages: langsWithMissingKeys.map(([l]) => l),
            languagesWithFile: langsWithFile
          });
        });

        hasErrors = true;
      }
    }

    if (hasErrors) {
      const error = new Error('\n❌ Some translation keys are missing. Please fix the issues above.');

      const validationSummary = {
        totalFiles: allFiles.length,
        totalLanguages: languages.length,
        filesWithIssues: allFiles.filter((file) => {
          const langsWithFile = languages.filter((lang) => languageFiles[lang][file]);

          if (langsWithFile.length <= 1) return false;
          const allKeysAcrossLanguages = uniq(flatten(langsWithFile.map((lang) => fileKeys[lang][file])));
          const missingKeysByLang = fromPairs(
            langsWithFile.map((lang) => {
              const langKeysSet = new Set(fileKeys[lang][file]);
              const missingKeys = allKeysAcrossLanguages.filter((key) => !langKeysSet.has(key));

              return [lang, missingKeys];
            })
          );

          return Object.entries(missingKeysByLang).some(([, missing]) => missing.length > 0);
        }).length
      };

      logger.error('Locale validation failed: Missing translation keys', {
        error,
        operation: 'validateLocales',
        errorType: 'TRANSLATION_VALIDATION_FAILED',
        validationSummary,
        languages,
        localesDir,
        hasErrors
      });
      throw error;
    }

    logger.info('✅ All locale files have the same keys across all languages!');
  } catch (error) {
    logger.error('Locale validation process failed', {
      error: error instanceof Error ? error : new Error(String(error)),
      operation: 'validateLocales',
      localesDir,
      absoluteLocalesDir: path.resolve(localesDir),
      errorType: 'VALIDATION_PROCESS_ERROR',
      stage: 'main_validation_loop',
      nodeError: error instanceof Error && 'code' in error ? (error as any).code : undefined
    });
    throw error;
  }
}

export { extractKeys, readJSONFilesInDir, validateLocales };

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateLocales();
}
