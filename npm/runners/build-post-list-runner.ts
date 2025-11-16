import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildPostList } from '@/scripts/build-post-list';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export interface BuildPostListOptions {
  postDirectories?: string[][];
  basePath?: string;
  outputPath?: string;
}

/**
 * Runs the build post list process with configurable options.
 *
 * This function determines the directories to scan for posts, the base path,
 * and the output path for the generated post list.
 * It invokes the buildPostList script and handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for post directories, base path, and output path.
 * @throws {CustomError} If the build process fails or an error occurs in the runner.
 */
export async function runBuildPostList(options: BuildPostListOptions = {}): Promise<void> {
  try {
    // Use provided options or fall back to default production paths
    const postDirectories = options.postDirectories || [
      [resolve(currentDirPath, '../../pages/blog'), '/blog'],
      [resolve(currentDirPath, '../../pages/docs'), '/docs'],
      [resolve(currentDirPath, '../../pages/about'), '/about']
    ];
    const basePath = options.basePath || resolve(currentDirPath, '../../pages');
    const outputPath = options.outputPath || resolve(currentDirPath, '../../config', 'posts.json');

    await buildPostList(postDirectories, basePath, outputPath);
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runBuildPostList',
      detail: `Build post list failed with output path: ${options.outputPath}`
    });

    logger.error('Build post list runner failed', customError);

    throw customError;
  }
}

// Only run CLI if this file is executed directly, not when imported
// Strict check: only run if NOT in test environment
if (process.env.NODE_ENV !== 'test' && process.env.VITEST_WORKER_ID === undefined && import.meta.url === `file://${process.argv[1]}`) {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      // Extract the file name and basePath from the CLI command
      const outputFileArgIndex = process.argv.indexOf('--outputFile');
      const outputFileName = outputFileArgIndex === -1 ? 'posts.json' : process.argv[outputFileArgIndex + 1];

      const basePathArgIndex = process.argv.indexOf('--basePath');
      const basePath = basePathArgIndex === -1 ? undefined : process.argv[basePathArgIndex + 1];

      // Build outputPath using resolve(basePath, outputFileName)
      let outputPath;

      if (basePath) {
        outputPath = resolve(basePath, outputFileName);
      } else {
        outputPath = resolve(currentDirPath, '../../config', outputFileName);
      }

      await runBuildPostList({ basePath, outputPath });
    } catch (error) {
      // Ensure we exit with error code
      process.exit(1);
    }
  })();
}
