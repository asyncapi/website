import fs from 'fs/promises';
import matter from 'gray-matter';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { logger } from '../helpers/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Validates whether the provided string is a properly formatted URL.
 *
 * @param str - The string to validate as a URL.
 * @returns True if the string is a valid URL, otherwise false.
 */
function isValidURL(str: string) {
  try {
    // eslint-disable-next-line no-new
    new URL(str);

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Interface representing the frontmatter of a markdown file.
 */
export interface FrontMatter {
  title: string;
  date: string;
  type: string;
  tags: string[];
  cover: string;
  weight: number;
  authors: { name: string; link: string; photo: string }[];
}

/**
 * Validates the frontmatter of a blog markdown file.
 *
 * This function ensures that the provided frontmatter object includes the necessary fields—`title`, `date`, `type`, `tags`, `cover`, and `authors`—and that these fields conform to expected formats. Specifically, it checks that:
 * - The `date` field represents a valid date.
 * - The `tags` field is an array.
 * - The `cover` field is a string.
 * - The `authors` field is an array where each author has a `name` and a `photo`, and if a `link` is provided, it is a valid URL.
 *
 * @param frontmatter - The frontmatter object to validate.
 * @returns An array of error messages if any validations fail, or null if the frontmatter is valid.
 */
function validateBlogs(frontmatter: FrontMatter) {
  const requiredAttributes = ['title', 'date', 'type', 'tags', 'cover', 'authors'];
  const errors = [];

  if (!frontmatter) {
    errors.push('Frontmatter is missing');

    return errors;
  }

  // Check for required attributes
  requiredAttributes.forEach((attr) => {
    if (!Object.prototype.hasOwnProperty.call(frontmatter, attr)) {
      errors.push(`${attr} is missing`);
    }
  });

  // Validate date format
  if (frontmatter.date && Number.isNaN(Date.parse(frontmatter.date))) {
    errors.push(`Invalid date format: ${frontmatter.date}`);
  }

  // Validate tags format (must be an array)
  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    errors.push('Tags should be an array');
  }

  // Validate cover is a string
  if (frontmatter.cover && typeof frontmatter.cover !== 'string') {
    errors.push('Cover must be a string');
  }

  // Validate authors (must be an array with valid attributes)

  if (frontmatter.authors) {
    if (Array.isArray(frontmatter.authors)) {
      frontmatter.authors.forEach((author, index) => {
        if (!author.name) {
          errors.push(`Author at index ${index} is missing a name`);
        }
        if (author.link && !isValidURL(author.link)) {
          errors.push(`Invalid URL for author at index ${index}: ${author.link}`);
        }
        if (!author.photo) {
          errors.push(`Author at index ${index} is missing a photo`);
        }
      });
    } else {
      errors.push('Authors should be an array');
    }
  }

  return errors.length ? errors : null;
}

/**
 * Validates the frontmatter of documentation markdown files.
 * @param {FrontMatter} frontmatter - The frontmatter to validate.
 * @returns {string[] | null} - An array of error messages, or null if valid.
 */
function validateDocs(frontmatter: FrontMatter) {
  const errors = [];

  // Check if title exists and is a string
  if (!frontmatter.title || typeof frontmatter.title !== 'string') {
    errors.push('Title is missing or not a string');
  }

  // Check if weight exists and is a number
  if (frontmatter.weight === undefined || typeof frontmatter.weight !== 'number') {
    errors.push('Weight is missing or not a number');
  }

  return errors.length ? errors : null;
}

/**
 * Recursively traverses a directory to validate the frontmatter of markdown files.
 *
 * The function scans the specified folder and its subdirectories for files with a '.md' extension, skipping any paths that include "reference/specification". For each markdown file found, it extracts the frontmatter using gray-matter and applies the provided validation function. If validation errors are returned, they are logged and the process exit code is set to 1. Any errors encountered during directory reading or file processing are logged and re-thrown.
 *
 * @param folderPath - The root folder path to scan for markdown files.
 * @param validateFunction - A function that validates frontmatter and returns an array of error messages if validation fails or null if the frontmatter is valid.
 * @param relativePath - A relative path used for logging file locations; defaults to an empty string.
 *
 * @throws {Error} If an error occurs during directory or file operations.
 */
async function checkMarkdownFiles(
  folderPath: string,
  validateFunction: (frontmatter: FrontMatter) => string[] | null,
  relativePath: string = ''
) {
  try {
    const files = await fs.readdir(folderPath);
    const filePromises = files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      const relativeFilePath = path.join(relativePath, file);

      // Skip the folder 'docs/reference/specification'
      if (path.normalize(relativeFilePath).includes(path.join('reference', 'specification'))) {
        return;
      }

      const stats = await fs.stat(filePath);

      // Recurse if directory, otherwise validate markdown file
      if (stats.isDirectory()) {
        await checkMarkdownFiles(filePath, validateFunction, relativeFilePath);
      } else if (path.extname(file) === '.md') {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data: frontmatter } = matter(fileContent);

        const errors = validateFunction(frontmatter as FrontMatter);

        if (errors) {
          logger.warn(`Errors in file ${relativeFilePath}:`);
          errors.forEach((error) => logger.warn(` - ${error}`));
          process.exitCode = 1;
        }
      }
    });

    await Promise.all(filePromises);
  } catch (err) {
    logger.error(`Error in directory ${folderPath}:`, err);
    throw err;
  }
}

const docsFolderPath = path.resolve(currentDirPath, '../../markdown/docs');
const blogsFolderPath = path.resolve(currentDirPath, '../../markdown/blog');

/**
 * Executes frontmatter validations for markdown files found in the documentation and blog directories.
 *
 * This asynchronous function concurrently processes markdown files by validating their frontmatter using dedicated
 * validation functions. If any validation fails or an error occurs during file operations, it logs the error and terminates
 * the process with an exit code of 1.
 */
async function main() {
  try {
    await Promise.all([
      checkMarkdownFiles(docsFolderPath, validateDocs),
      checkMarkdownFiles(blogsFolderPath, validateBlogs)
    ]);
  } catch (error) {
    logger.error('Failed to validate markdown files:', error);
    process.exit(1);
  }
}

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { checkMarkdownFiles, isValidURL, main, validateBlogs, validateDocs };
