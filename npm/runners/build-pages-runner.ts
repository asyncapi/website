import { copyAndRenameFiles, ensureDirectoryExists } from '@/scripts/build-pages';
import { logger } from '@/scripts/helpers/logger';
import { RunnerError } from '@/types/errors/RunnerError';

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
 * @throws {RunnerError} If directory creation or file copying fails
 */
async function runBuildPages(options: BuildPagesOptions = {}): Promise<void> {
  const config = { ...DEFAULT_OPTIONS, ...options };

  try {
    // First ensure target directory exists
    ensureDirectoryExists(config.targetDir);

    // Then copy and rename files
    await copyAndRenameFiles(config.sourceDir, config.targetDir);
  } catch (error) {
    // Create or enhance the error with full context
    const customError = error instanceof RunnerError
      ? error.updateContext({
          operation: 'runBuildPages',
          runner: 'build-pages-runner',
          script: 'build-pages-runner.ts',
          task: 'pages',
          context: {
            sourceDir: config.sourceDir,
            targetDir: config.targetDir
          }
        })
      : RunnerError.fromError(error, {
          errorType: 'runner_level_error',
          operation: 'runBuildPages',
          runner: 'build-pages-runner',
          script: 'build-pages-runner.ts',
          task: 'pages',
          note: 'Error occurred at runner level',
          context: {
            sourceDir: config.sourceDir,
            targetDir: config.targetDir
          }
        });

    // Log error with full stack trace and context
    logger.error('Build pages runner failed', {
      error: customError,
      script: customError.context.script,
      task: customError.context.task,
      timestamp: customError.context.timestamp,
      configuration: customError.context.context,
      stackTrace: customError.getFullStack()
    });

    throw customError;
  }
}

// Run only in non-test environments
if (process.env.NODE_ENV === 'test') {
  logger.info('Skipping pages build in test environment');
} else {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      await runBuildPages();
    } catch (error) {
      // Ensure we exit with error code
      process.exit(1);
    }
  })();
}

// Export for testing purposes
export { runBuildPages };
