const fs = require('fs').promises;
const matter = require('gray-matter');
const path = require('path');

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
 * Recursively checks markdown files in a folder and validates their frontmatter.
 * @param {string} folderPath - The path to the folder to check.
 * @param {Function} validateFunction - The function used to validate the frontmatter.
 * @param {string} [relativePath=''] - The relative path of the folder for logging purposes.
 */
async function checkMarkdownFiles(folderPath, validateFunction, relativePath = '') {
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

                    const errors = validateFunction(frontmatter);
                    if (errors) {
                        console.log(`Errors in file ${relativeFilePath}:`);
                        errors.forEach(error => console.log(` - ${error}`));
                        process.exitCode = 1;
                    }
                }
        });

        await Promise.all(filePromises);
    } catch (err) {
        console.error(`Error in directory ${folderPath}:`, err);
        throw err;
    }
}

const docsFolderPath = path.resolve(__dirname, '../../markdown/docs');
const blogsFolderPath = path.resolve(__dirname, '../../markdown/blog');

async function main() {
    try {
        await Promise.all([
            checkMarkdownFiles(docsFolderPath, validateDocs),
            checkMarkdownFiles(blogsFolderPath, validateBlogs)
        ]);
    } catch (error) {
        console.error('Failed to validate markdown files:', error);
        process.exit(1);
    }
}

/* istanbul ignore next */
if (require.main === module) {
    main();
}

module.exports = { validateBlogs, validateDocs, checkMarkdownFiles, main, isValidURL };
