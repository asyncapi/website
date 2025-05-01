import fs from 'fs/promises';
import fetch from 'node-fetch-2';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import editUrls from '../../config/edit-page-config.json';
import { logger } from '../helpers/logger';
import { pause } from '../helpers/utils';

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
 * Checks a batch of markdown edit links for broken URLs.
 *
 * For each provided path object, this function sends an HTTP HEAD request to the associated edit link.
 * If the response returns a 404 status, the original path object is retained; otherwise, null is returned.
 * Files missing an edit link or whose file paths match predefined ignore patterns are skipped.
 * Each request is aborted if it exceeds a configurable timeout (defaulting to 5000ms).
 *
 * @param batch - Array of path objects, each containing a file path, URL path, and edit link.
 * @returns A promise resolving to an array where each element is either the original path object (if its edit link returned 404) or null.
 *
 * @throws {Error} If an error occurs during the HTTP HEAD request for any edit link.
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
        if (timeout) {
            clearTimeout(timeout);
        }
      }
    })
  );
}

/**
 * Processes an array of path objects in batches and returns those with broken links.
 *
 * The function splits the provided array into batches determined by the DOCS_LINK_CHECK_BATCH_SIZE environment variable (defaulting to 5) and processes them concurrently using the processBatch function. After processing each batch and pausing briefly, it filters out valid links, returning only path objects that result in a 404 status.
 *
 * @param paths - Array of path objects representing URLs to check.
 * @returns A promise that resolves to an array of path objects with broken links.
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
 * Generates an edit link for a markdown file based on its URL and file path.
 *
 * The function removes a leading "docs/" segment from the URL if present, then checks the provided
 * edit options for a matching entry. If a matching option is found with an empty value, it applies a fallback
 * pattern to generate the edit link using the URL path; otherwise, it constructs the link using the file's basename.
 * Returns null if no appropriate edit option is found.
 *
 * @param urlPath - The URL path associated with the markdown file.
 * @param filePath - The file system path of the markdown file.
 * @param editOptions - An array of configuration objects each containing a `value` identifier and a `href` base URL.
 * @returns The generated edit link, or null if no matching configuration is found.
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
  return target ? `${target.href}/${path.basename(filePath)}` : null;
}

/**
 * Recursively processes markdown files in a directory to generate path objects with corresponding edit links.
 *
 * This function reads the contents of the specified folder, skipping files named "_section.md", and recursively traverses subdirectories.
 * For each markdown file encountered, it constructs a URL path by replacing system path separators with '/' and removing the file extension,
 * then generates an edit link based on the provided edit options. The results are accumulated in an array and returned.
 *
 * @param folderPath - The folder to process.
 * @param editOptions - An array of edit link option objects with `value` and `href` properties.
 * @param relativePath - Optional relative path for URL generation (default: '').
 * @param result - Optional accumulator for results (default: an empty array).
 * @returns A promise that resolves with an array of objects, each containing a file path, URL path, and edit link.
 * @throws {Error} If an error occurs while reading or processing the directory.
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
 * Executes the main workflow for validating edit links in markdown files.
 *
 * The function loads the edit URL configuration, resolves the documentation folder path relative to the current module,
 * and generates a list of markdown file paths with their associated edit links. It checks the validity of each URL and logs
 * any links that return a 404 status. If an error occurs during processing, an error is thrown summarizing the failure.
 *
 * @throws {Error} If the link checking process encounters an error.
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
