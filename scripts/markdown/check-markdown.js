const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');
const pLimit = require('p-limit');  // Import the p-limit package

/**
 * Checks if a given string is a valid URL.
 * @param {string} str - The string to validate as a URL.
 * @returns {boolean} True if the string is a valid URL, false otherwise.
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
 * Validates the frontmatter of a blog post.
 * @param {object} frontmatter - The frontmatter object to validate.
 * @param {string} filePath - The path to the file being validated.
 * @returns {string[]|null} An array of validation error messages, or null if no errors.
 */
function validateBlogs(frontmatter) {
    const requiredAttributes = ['title', 'date', 'type', 'tags', 'cover', 'authors'];
    const errors = [];

    // Check for required attributes
    requiredAttributes.forEach(attr => {
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
        errors.push(`Tags should be an array`);
    }

    // Validate cover is a string
    if (frontmatter.cover && typeof frontmatter.cover !== 'string') {
        errors.push(`Cover must be a string`);
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
                    errors.push(`Invalid URL for author at index ${index}: ${author.link}`);
                }
                if (!author.photo) {
                    errors.push(`Author at index ${index} is missing a photo`);
                }
            });
        }
    }

    return errors.length ? errors : null;
}

/**
 * Validates the frontmatter of a documentation file.
 * @param {object} frontmatter - The frontmatter object to validate.
 * @param {string} filePath - The path to the file being validated.
 * @returns {string[]|null} An array of validation error messages, or null if no errors.
 */
function validateDocs(frontmatter) {
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
 * Recursively checks markdown files in a folder and validates their frontmatter with concurrency control.
 * @param {string} folderPath - The path to the folder to check.
 * @param {Function} validateFunction - The function used to validate the frontmatter.
 * @param {string} [relativePath=''] - The relative path of the folder for logging purposes.
 * @param {number} concurrencyLimit - The maximum number of files to process concurrently.
 */
function checkMarkdownFiles(folderPath, validateFunction, relativePath = '', concurrencyLimit = 5) {
    const limit = pLimit(concurrencyLimit);  // Limit the concurrency
    const tasks = [];

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            const relativeFilePath = path.join(relativePath, file);

            // Skip the folder 'docs/reference/specification'
            if (relativeFilePath.includes('reference/specification')) {
                return;
            }

            const task = new Promise((resolve, reject) => {
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        reject('Error reading file stats:', err);
                    } else {
                        // Recurse if directory, otherwise validate markdown file
                        if (stats.isDirectory()) {
                            checkMarkdownFiles(filePath, validateFunction, relativeFilePath, concurrencyLimit);
                        } else if (path.extname(file) === '.md') {
                            const fileContent = fs.readFileSync(filePath, 'utf-8');
                            const { data: frontmatter } = matter(fileContent);

                            const errors = validateFunction(frontmatter);
                            if (errors) {
                                console.log(`Errors in file ${relativeFilePath}:`);
                                errors.forEach(error => console.log(` - ${error}`));
                                process.exitCode = 1;
                            }
                        }
                        resolve();
                    }
                });
            });

            // Add task with concurrency limit
            tasks.push(limit(() => task));
        });

        // Wait for all tasks to complete
        Promise.all(tasks).then(() => console.log('All files processed.'));
    });
}

const docsFolderPath = path.resolve(__dirname, '../../markdown/docs');
const blogsFolderPath = path.resolve(__dirname, '../../markdown/blog');

// Call the function with concurrency control
checkMarkdownFiles(docsFolderPath, validateDocs, '', 5);  // Limit concurrency to 5
checkMarkdownFiles(blogsFolderPath, validateBlogs, '', 5);  // Limit concurrency to 5
