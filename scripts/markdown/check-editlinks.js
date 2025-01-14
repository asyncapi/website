const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch-2');
const editUrls = require('../../config/edit-page-config.json');

const ignoreFiles = [
  'reference/specification/v2.x.md',
  'reference/specification/v3.0.0-explorer.md',
  'reference/specification/v3.0.0.md'
];

/**
 * Introduces a delay in the execution flow
 * @param {number} ms - The number of milliseconds to pause
 */
async function pause(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

/**
 * Process a batch of URLs to check for 404s
 * @param {object[]} batch - Array of path objects to check
 * @returns {Promise<string[]>} Array of URLs that returned 404
 */
async function processBatch(batch) {
  return Promise.all(
    batch.map(async ({ filePath, urlPath, editLink }) => {
      try {
        if (!editLink || ignoreFiles.some((ignorePath) => filePath.endsWith(ignorePath))) return null;

        const response = await fetch(editLink, { method: 'HEAD' });
        if (response.status === 404) {
          return { filePath, urlPath, editLink };
        }
        return null;
      } catch (error) {
        console.error(`Error checking ${editLink}:`, error.message);
        return editLink;
      }
    })
  );
}

/**
 * Check all URLs in batches
 * @param {object[]} paths - Array of all path objects to check
 * @returns {Promise<string[]>} Array of URLs that returned 404
 */
async function checkUrls(paths) {
  const result = [];
  const batchSize = 5;

  const batches = [];
  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize);
    batches.push(batch);
  }

  console.log(`Processing ${batches.length} batches concurrently...`);
  const batchResultsArray = await Promise.all(
    batches.map(async (batch) => {
      const batchResults = await processBatch(batch);
      await pause(1000);
      return batchResults.filter((url) => url !== null);
    })
  );

  result.push(...batchResultsArray.flat());
  return result;
}

/**
 * Determines the appropriate edit link based on the URL path and file path
 * @param {string} urlPath - The URL path to generate an edit link for
 * @param {string} filePath - The actual file path
 * @param {object[]} editOptions - Array of edit link options
 * @returns {string|null} The generated edit link or null if no match
 */
function determineEditLink(urlPath, filePath, editOptions) {
  // Remove leading 'docs/' if present for matching
  const pathForMatching = urlPath.startsWith('docs/') ? urlPath.slice(5) : urlPath;

  const target =
    editOptions.find((edit) => pathForMatching.includes(edit.value)) || editOptions.find((edit) => edit.value === '');

  if (!target) return null;

  // Handle the empty value case (fallback)
  if (target.value === '') {
    return `${target.href}/docs/${urlPath}.md`;
  }

  // For other cases with specific targets
  return `${target.href}/${path.basename(filePath)}`;
}

/**
 * Recursively processes markdown files in a directory to generate paths and edit links
 * @param {string} folderPath - The path to the folder to process
 * @param {object[]} editOptions - Array of edit link options
 * @param {string} [relativePath=''] - The relative path for URL generation
 * @param {object[]} [result=[]] - Accumulator for results
 * @returns {Promise<object[]>} Array of objects containing file paths and edit links
 */
async function generatePaths(folderPath, editOptions, relativePath = '', result = []) {
  try {
    const files = await fs.readdir(folderPath);

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(folderPath, file);
        const relativeFilePath = path.join(relativePath, file);

        // Skip _section.md files
        if (file === '_section.md') {
          return;
        }

        const stats = await fs.stat(filePath);

        if (stats.isDirectory()) {
          await generatePaths(filePath, editOptions, relativeFilePath, result);
        } else if (stats.isFile() && file.endsWith('.md')) {
          const urlPath = relativeFilePath.split(path.sep).join('/').replace('.md', '');
          result.push({
            filePath,
            urlPath,
            editLink: determineEditLink(urlPath, filePath, editOptions)
          });
        }
      })
    );

    return result;
  } catch (err) {
    console.error(`Error processing directory ${folderPath}:`, err);
    throw err;
  }
}

async function main() {
  const editOptions = editUrls;

  try {
    const docsFolderPath = path.resolve(__dirname, '../../markdown/docs');
    const paths = await generatePaths(docsFolderPath, editOptions);
    console.log('Starting URL checks...');
    const invalidUrls = await checkUrls(paths);

    if (invalidUrls.length > 0) {
      console.log('\nURLs returning 404:\n');
      invalidUrls.forEach((url) => console.log(`- ${url.editLink} generated from ${url.filePath}\n`));
      console.log(`\nTotal invalid URLs found: ${invalidUrls.length}`);
    } else {
      console.log('All URLs are valid.');
    }
  } catch (error) {
    console.error('Failed to check edit links:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generatePaths, determineEditLink, main };
