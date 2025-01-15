import fs from 'fs/promises';
import matter from 'gray-matter';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { logger } from '../utils/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Checks if a string is a valid URL.
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a valid URL, false otherwise.
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
interface FrontMatter {
  title: string;
  date: string;
  type: string;
  tags: string[];
  cover: string;
  weight?: number;
  authors: { name: string; link: string; photo: string }[];
}

/**
 * Validates the frontmatter of blog markdown files.
 * @param {FrontMatter} frontmatter - The frontmatter to validate.
 * @returns {string[] | null} - An array of error messages, or null if valid.
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
 * Recursively checks markdown files in a folder and validates their frontmatter.
 * @param {string} folderPath - The path to the folder to check.
 * @param {Function} validateFunction - The function used to validate the frontmatter.
 * @param {string} [relativePath=''] - The relative path of the folder for logging purposes.
 */
async function checkMarkdownFiles(
  folderPath: string,
  validateFunction: (frontmatter: FrontMatter) => string[] | null,
  relativePath = ''
) {
  try {
    const files = await fs.readdir(folderPath);
    const filePromises = files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      const relativeFilePath = path.join(relativePath, file);

      // Skip the folder 'docs/reference/specification'
      if (relativeFilePath.includes('reference/specification')) {
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
 * Main function to validate markdown files in the docs and blog folders.
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
