import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { composeBlog } from '@/scripts/compose-blog';
import { logger } from '@/scripts/helpers/logger';
import { RunnerError } from '@/types/errors/RunnerError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

interface ComposeBlogOptions {
  blogDir?: string;
  outputPath?: string;
}

/**
 * Runs the blog composition process with configurable options.
 *
 * This function resolves the paths for blog content and output,
 * then invokes the composeBlog script. It handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for blog directory and output path
 * @throws {RunnerError} If the build process fails or an error occurs in the runner
 */
async function runComposeBlog(options: ComposeBlogOptions = {}): Promise<void> {
  try {
    const blogDir = options.blogDir || resolve(currentDirPath, '../../markdown/blog');
    const outputPath = options.outputPath || resolve(currentDirPath, '../../config/blog.json');

    await composeBlog(blogDir, outputPath);
  } catch (error) {
    // Create or enhance the error with full context
    const customError = error instanceof RunnerError
      ? error.updateContext({
          operation: 'runComposeBlog',
          runner: 'compose-blog-runner',
          script: 'compose-blog-runner.ts',
          task: 'blog',
          context: {
            blogDir: options.blogDir,
            outputPath: options.outputPath
          }
        })
      : RunnerError.fromError(error, {
          errorType: 'runner_level_error',
          operation: 'runComposeBlog',
          runner: 'compose-blog-runner',
          script: 'compose-blog-runner.ts',
          task: 'blog',
          note: 'Error occurred at runner level',
          context: {
            blogDir: options.blogDir,
            outputPath: options.outputPath
          }
        });

    // Log error with full stack trace and context
    logger.error('Compose blog runner failed', {
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
  logger.info('Skipping blog composition in test environment');
} else {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      await runComposeBlog();
    } catch (error) {
      // Ensure we exit with error code
      process.exit(1);
    }
  })();
}

// Export for testing purposes
export { runComposeBlog };
