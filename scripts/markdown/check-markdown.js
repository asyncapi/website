const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');
const pLimit = require('p-limit'); // Import p-limit for concurrency control

const limit = pLimit(5); // Limit the number of concurrent tasks

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
 * @returns {string[]|null} An array of validation error messages, or null if no errors.
 */
function validateBlogs(frontmatter) {
    const requiredAttributes = ['title', 'date', 'type', 'tags', 'cover', 'authors'];
    const errors = [];

    requiredAttributes.forEach(attr => {
        if (!frontmatter.hasOwnProperty(attr)) {
            errors.push(`${attr} is missing`);
        }
    });

    if (frontmatter.date && Number.isNaN(Date.parse(frontmatter.date))) {
        errors.push(`Invalid date format: ${frontmatter.date}`);
    }

    if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
        errors.push(`Tags should be an array`);
    }

    if (frontmatter.cover && typeof frontmatter.cover !== 'string') {
        errors.push(`Cover must be a string`);
    }

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
 * @returns {string[]|null} An array of validation error messages, or null if no errors.
 */
function validateDocs(frontmatter) {
    const errors = [];
    if (!frontmatter.title || typeof frontmatter.title !== 'string') {
        errors.push('Title is missing or not a string');
    }

    if (frontmatter.weight === undefined || typeof frontmatter.weight !== 'number') {
        errors.push('Weight is missing or not a number');
    }

    return errors.length ? errors : null;
}

/**
 * Processes a single Markdown file for validation.
 * @param {string} filePath - The full path to the Markdown file.
 * @param {Function} validateFunction - The function used to validate the frontmatter.
 * @param {string} relativePath - The relative path for logging purposes.
 * @returns {Promise<void>}
 */
function processMarkdownFile(filePath, validateFunction, relativePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) {
                reject(new Error(`Error reading file ${filePath}: ${err.message}`));
                return;
            }

            const { data: frontmatter } = matter(content);
            const errors = validateFunction(frontmatter);

            if (errors) {
                console.log(`Errors in file ${relativePath}:`);
                errors.forEach(error => console.log(` - ${error}`));
                process.exitCode = 1;
            }
            resolve();
        });
    });
}

/**
 * Recursively processes Markdown files in a folder with a concurrency limit.
 * @param {string} folderPath - The path to the folder to process.
 * @param {Function} validateFunction - The function used to validate the frontmatter.
 * @param {string} [relativePath=''] - The relative path for logging purposes.
 * @returns {Promise<void>}
 */
async function processMarkdownFolder(folderPath, validateFunction, relativePath = '') {
    const files = await fs.promises.readdir(folderPath);
    const tasks = files.map(async (file) => {
        const filePath = path.join(folderPath, file);
        const relativeFilePath = path.join(relativePath, file);

        if (relativeFilePath.includes('reference/specification')) {
            return; // Skip the specified folder
        }

        const stats = await fs.promises.stat(filePath);
        if (stats.isDirectory()) {
            await processMarkdownFolder(filePath, validateFunction, relativeFilePath);
        } else if (path.extname(file) === '.md') {
            await limit(() => processMarkdownFile(filePath, validateFunction, relativeFilePath));
        }
    });

    await Promise.all(tasks);
}

// Define folder paths
const docsFolderPath = path.resolve(__dirname, '../../markdown/docs');
const blogsFolderPath = path.resolve(__dirname, '../../markdown/blog');

// Process folders with concurrency
(async () => {
    try {
        await Promise.all([
            processMarkdownFolder(docsFolderPath, validateDocs),
            processMarkdownFolder(blogsFolderPath, validateBlogs),
        ]);
    } catch (err) {
        console.error(err.message);
        process.exitCode = 1;
    }
})();

