import fs from 'fs/promises';
import fetch from 'node-fetch-2';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import editUrls from '../../config/edit-page-config.json';
import { pause } from '../utils';
import { logger } from '../utils/logger';

const ignoreFiles = [
  'reference/specification/v2.x.md',
  'reference/specification/v3.0.0-explorer.md',
  'reference/specification/v3.0.0.md'
];

interface PathObject {
  filePath: string;
  urlPath: string;
  editLink: string | null;
}

/**
 * Process a batch of URLs to check for 404s
 * @param {PathObject[]} batch - Array of path objects to check
 * @returns {Promise<string[]>} Array of URLs that returned 404
 */
async function processBatch(batch: PathObject[]): Promise<(PathObject | null)[]> {
  const TIMEOUT_MS = Number(process.env.DOCS_LINK_CHECK_TIMEOUT) || 5000;

  return Promise.all(
    batch.map(async ({ filePath, urlPath, editLink }) => {
      let timeout: NodeJS.Timeout | undefined;
      try {
        if (!editLink || ignoreFiles.some((ignorePath) => filePath.endsWith(ignorePath))) return null;

        const controller = new AbortController();
        timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
        const response = await fetch(editLink, {
          method: 'HEAD',
          signal: controller.signal
        });

        if (response.status === 404) {
          return { filePath, urlPath, editLink };
        }

        return null;
      } catch (error) {
        return Promise.reject(new Error(`Error checking ${editLink}: ${error}`));
      } finally {
        if (timeout)
          {
            clearTimeout(timeout);
          }
      }
    })
  );
}

/**
 * Check all URLs in batches
 * @param {PathObject[]} paths - Array of all path objects to check
 * @returns {Promise<string[]>} Array of URLs that returned 404
 */
async function checkUrls(paths: PathObject[]): Promise<PathObject[]> {
  const result: PathObject[] = [];
  const batchSize = Number(process.env.DOCS_LINK_CHECK_BATCH_SIZE) || 5;

  const batches: PathObject[][] = [];

  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize);

    batches.push(batch);
  }

  logger.info(`Processing ${batches.length} batches concurrently...`);
  const batchResultsArray = await Promise.all(
    batches.map(async (batch) => {
      const batchResults = await processBatch(batch);

      await pause(1000);

      return batchResults.filter((url) => url !== null) as PathObject[];
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
function determineEditLink(
  urlPath: string,
  filePath: string,
  editOptions: { value: string; href: string }[]
): string | null {
  // Remove leading 'docs/' if present for matching
  const pathForMatching = urlPath.startsWith('docs/') ? urlPath.slice(5) : urlPath;

  const target = editOptions.find((edit) => pathForMatching.includes(edit.value));

  // Handle the empty value case (fallback)
  if (target?.value === '') {
    return `${target.href}/docs/${urlPath}.md`;
  }

  // For other cases with specific targets
  /* istanbul ignore next */
  return target ? `${target.href}/${path.basename(filePath)}` : null;
}

/**
 * Recursively processes markdown files in a directory to generate paths and edit links
 * @param {string} folderPath - The path to the folder to process
 * @param {object[]} editOptions - Array of edit link options
 * @param {string} [relativePath=''] - The relative path for URL generation
 * @param {PathObject[]} [result=[]] - Accumulator for results
 * @returns {Promise<PathObject[]>} Array of objects containing file paths and edit links
 */
async function generatePaths(
  folderPath: string,
  editOptions: { value: string; href: string }[],
  relativePath = '',
  result: PathObject[] = []
): Promise<PathObject[]> {
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

        /* istanbul ignore else */

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
    throw new Error(`Error processing directory ${folderPath}: ${err}`);
  }
}

/**
 * Main function to check edit links in markdown files.
 * It generates paths for markdown files, checks the URLs, and logs invalid URLs.
 */
async function main() {
  const editOptions = editUrls;

  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentFilePath);
    const docsFolderPath = path.resolve(currentDirPath, '../../markdown/docs');
    const paths = await generatePaths(docsFolderPath, editOptions);

    logger.info('Starting URL checks...');
    const invalidUrls = await checkUrls(paths);

    if (invalidUrls.length > 0) {
      logger.info('\nURLs returning 404:\n');
      invalidUrls.forEach((url) => logger.info(`- ${url.editLink} generated from ${url.filePath}\n`));
      logger.info(`\nTotal invalid URLs found: ${invalidUrls.length}`);
    } else {
      logger.info('All URLs are valid.');
    }
  } catch (error) {
    throw new Error(`Failed to check edit links: ${error}`);
  }
}

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { checkUrls, determineEditLink, generatePaths, main, processBatch };
