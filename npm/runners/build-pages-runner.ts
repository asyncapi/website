import { copyAndRenameFiles, ensureDirectoryExists } from '@/scripts/build-pages';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

interface BuildPagesOptions {
  sourceDir?: string;
  targetDir?: string;
}

const DEFAULT_OPTIONS = {
  sourceDir: 'markdown',
  targetDir: 'pages'
};

/**
 * Copies and renames files from the source markdown directory to the target pages directory.
 * Ensures the target directory exists before copying.
 *
 * This function is used to build the static pages for the website by transforming markdown files
 * into the appropriate format and location for the Next.js pages directory.
 *
 * @param options - Optional configuration for source and target directories
 * @throws {CustomError} If directory creation or file copying fails
 */
async function runBuildPages(options: BuildPagesOptions = {}): Promise<void> {
  const config = { ...DEFAULT_OPTIONS, ...options };

  try {
    // First ensure target directory exists
    ensureDirectoryExists(config.targetDir);

    // Then copy and rename files
    await copyAndRenameFiles(config.sourceDir, config.targetDir);
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runBuildPages',
      detail: `Build pages failed - sourceDir: ${config.sourceDir}, targetDir: ${config.targetDir}`
    });

    logger.error('Build pages runner failed', customError);

    throw customError;
  }
}

(async () => {
  try {
    await runBuildPages();
  } catch (error) {
    // Ensure we exit with error code
    process.exit(1);
  }
})();
