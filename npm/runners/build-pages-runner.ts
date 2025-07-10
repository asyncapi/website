import { copyAndRenameFiles, ensureDirectoryExists } from '../../scripts/build-pages';

const SRC_DIR = 'markdown';
const TARGET_DIR = 'pages';

/**
 * Copies and renames files from the source markdown directory to the target pages directory.
 * Ensures the target directory exists before copying.
 *
 * This function is used to build the static pages for the website by transforming markdown files
 * into the appropriate format and location for the Next.js pages directory.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws Will throw an error if directory creation or file copying fails.
 */
export async function runBuildPages() {
  try {
    ensureDirectoryExists(TARGET_DIR);
    copyAndRenameFiles(SRC_DIR, TARGET_DIR);
  } catch (err) {
    if ((err as any).context) {
      (err as any).context = {
        ...(err as any).context,
        errorType: 'script_level_error',
      };
      throw err;
    }
    const wrappedError = new Error(`Build pages runner failed: ${(err as Error).message}`);

    (wrappedError as any).context = {
      operation: 'runBuildPages',
      runner: 'build-pages-runner',
      originalError: err,
      errorType: 'runner_level_error',
      note: 'This error occurred at the runner level, not in the low-level script',
    };
    throw wrappedError;
  }
}

runBuildPages();
