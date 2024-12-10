const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const pLimit = require('p-limit');

// Configuration
const CONCURRENCY_LIMIT = process.env.CONCURRENCY_LIMIT ? parseInt(process.env.CONCURRENCY_LIMIT, 10) : 10;

/**
 * Validates URL string
 * @param {string} str - URL to validate
 * @returns {boolean} Validation result
 */
function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Validate blog post frontmatter
 * @param {object} frontmatter - Frontmatter to validate
 * @returns {string[]} Validation errors
 */
function validateBlogs(frontmatter) {
  const requiredAttributes = [
    'title',
    'date',
    'type',
    'tags',
    'cover',
    'authors',
  ];
  const errors = [];

  // Check for required attributes
  requiredAttributes.forEach((attr) => {
    if (!frontmatter.hasOwnProperty(attr)) {
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
    if (!Array.isArray(frontmatter.authors)) {
      errors.push('Authors should be an array');
    } else {
      frontmatter.authors.forEach((author, index) => {
        if (!author.name) {
          errors.push(`Author at index ${index} is missing a name`);
        }
        if (author.link && !isValidURL(author.link)) {
          errors.push(
            `Invalid URL for author at index ${index}: ${author.link}`,
          );
        }
        if (!author.photo) {
          errors.push(`Author at index ${index} is missing a photo`);
        }
      });
    }
  }

  return errors;
}

/**
 * Validate documentation frontmatter
 * @param {object} frontmatter - Frontmatter to validate
 * @returns {string[]} Validation errors
 */
function validateDocs(frontmatter) {
  const errors = [];

  // Check if title exists and is a string
  if (!frontmatter.title || typeof frontmatter.title !== 'string') {
    errors.push('Title is missing or not a string');
  }

  // Check if weight exists and is a number
  if (
    frontmatter.weight === undefined ||
    typeof frontmatter.weight !== 'number'
  ) {
    errors.push('Weight is missing or not a number');
  }

  return errors;
}

/**
 * Recursively check markdown files in a folder
 * @param {string} folderPath - Path to folder
 * @param {Function} validateFunction - Validation function
 * @param {string} [relativePath=''] - Relative path for logging
 * @returns {Promise<string[]>} Validation errors
 */
async function checkMarkdownFiles(
  folderPath,
  validateFunction,
  relativePath = '',
) {
  const limit = pLimit(CONCURRENCY_LIMIT);
  const allErrors = [];

  try {
    // Read directory contents synchronously for predictability
    const files = fs.readdirSync(folderPath);

    // Process files with concurrency control
    const filePromises = files.map((file) =>
      limit(async () => {
        const filePath = path.join(folderPath, file);
        const relativeFilePath = path.join(relativePath, file);

        // Skip specific folder
        if (relativeFilePath.includes('reference/specification')) {
          return [];
        }

        // Get file stats
        const stats = fs.statSync(filePath);

        // Recurse if directory, otherwise validate markdown file
        if (stats.isDirectory()) {
          const subdirErrors = await checkMarkdownFiles(
            filePath,
            validateFunction,
            relativeFilePath,
          );
          allErrors.push(...subdirErrors);
        } else if (path.extname(file) === '.md') {
          try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data: frontmatter } = matter(fileContent);

            const errors = validateFunction(frontmatter);
            if (errors.length > 0) {
              allErrors.push(`File ${relativeFilePath}: ${errors.join('; ')}`);
            }
          } catch (readError) {
            allErrors.push(
              `Error reading file ${relativeFilePath}: ${readError.message}`,
            );
          }
        }

        return [];
      }),
    );

    // Wait for all file promises to complete
    await Promise.all(filePromises);

    return allErrors;
  } catch (error) {
    console.error('Error processing files:', error);
    return [`Folder processing error: ${error.message}`];
  }
}

/**
 * Main validation function
 * @throws {Error} If validation fails
 */
async function validateMarkdownFiles() {
  const docsFolderPath = path.resolve(__dirname, '../../markdown/docs');
  const blogsFolderPath = path.resolve(__dirname, '../../markdown/blog');

  try {
    // Validate docs
    const docsErrors = await checkMarkdownFiles(docsFolderPath, validateDocs);
    if (docsErrors.length > 0) {
      console.error('Docs Validation Errors:');
      docsErrors.forEach((error) => console.error(error));
      throw new Error('Documentation markdown validation failed');
    }

    // Validate blogs
    const blogErrors = await checkMarkdownFiles(blogsFolderPath, validateBlogs);
    if (blogErrors.length > 0) {
      console.error('Blog Validation Errors:');
      blogErrors.forEach((error) => console.error(error));
      throw new Error('Blog markdown validation failed');
    }

    console.log('All markdown files validated successfully');
  } catch (error) {
    console.error('Validation process failed:', error.message);
    process.exit(1);
  }
}

// Run validation
validateMarkdownFiles();
