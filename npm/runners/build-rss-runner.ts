import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildRSS } from '@/scripts/build-rss';
import { logger } from '@/scripts/helpers/logger';
import { RunnerError } from '@/types/errors/RunnerError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

interface BuildRSSOptions {
  postsPath?: string;
  outputPath?: string;
}

/**
 * Runs the build RSS feed process with configurable options.
 *
 * This function resolves the paths for posts data and RSS output,
 * then invokes the buildRSS script. It handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for posts data and output paths
 * @throws {RunnerError} If the build process fails or an error occurs in the runner
 */
async function runBuildRSS(options: BuildRSSOptions = {}): Promise<void> {
  try {
    const postsPath = options.postsPath || resolve(currentDirPath, '../../config', 'posts.json');
    const outputPath = options.outputPath || resolve(currentDirPath, '../../public', 'rss.xml');

    await buildRSS(postsPath, outputPath);
  } catch (error) {
    // Create or enhance the error with full context
    const customError = error instanceof RunnerError
      ? error.updateContext({
          operation: 'runBuildRSS',
          runner: 'build-rss-runner',
          script: 'build-rss-runner.ts',
          task: 'rss',
          context: {
            postsPath: options.postsPath,
            outputPath: options.outputPath
          }
        })
      : RunnerError.fromError(error, {
          errorType: 'runner_level_error',
          operation: 'runBuildRSS',
          runner: 'build-rss-runner',
          script: 'build-rss-runner.ts',
          task: 'rss',
          note: 'Error occurred at runner level',
          context: {
            postsPath: options.postsPath,
            outputPath: options.outputPath
          }
        });

    // Log error with full stack trace and context
    logger.error('Build RSS runner failed', {
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
  logger.info('Skipping RSS build in test environment');
} else {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      await runBuildRSS();
    } catch (error) {
      // Ensure we exit with error code
      process.exit(1);
    }
  })();
}

// Export for testing purposes
export { runBuildRSS };
