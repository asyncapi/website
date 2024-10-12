const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

// Helper function to check if a string is a valid URL
function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (err) {
        return false;
    }
}

// Function to validate frontmatter
function validateFrontmatter(frontmatter, filePath) {
    const requiredAttributes = ['title', 'date', 'type', 'tags', 'cover', 'authors'];
    const errors = [];

    // Check for required attributes
    requiredAttributes.forEach(attr => {
        if (!frontmatter.hasOwnProperty(attr)) {
            errors.push(`${attr} is missing`);
        }
    });

    // Validate date format
    if (frontmatter.date && isNaN(Date.parse(frontmatter.date))) {
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
            });
        }
    }

    return errors.length ? errors : null;
}

// Main function to check markdown files
function checkMarkdownFiles(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            if (path.extname(file) === '.md') {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data: frontmatter } = matter(fileContent);

                const errors = validateFrontmatter(frontmatter, filePath);
                if (errors) {
                    console.error(`Errors in file ${file}:`);
                    errors.forEach(error => console.error(`  - ${error}`));
                } else {
                    console.log(`File ${file} is valid`);
                }
            }
        });
    });
}

// Replace with the path to your folder containing markdown files
const folderPath = './../../markdown/blog';
checkMarkdownFiles(folderPath);
