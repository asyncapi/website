const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const pLimit = require('p-limit');

// Configuration
const parsedLimit = process.env.CONCURRENCY_LIMIT ? parseInt(process.env.CONCURRENCY_LIMIT, 10) : 10;
const CONCURRENCY_LIMIT = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;

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

                // Skip the folder 'docs/reference/specification'
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
                            console.log(`Errors in file ${relativeFilePath}:`);
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
