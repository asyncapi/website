import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildPostList } from '@/scripts/build-post-list';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

interface BuildPostListOptions {
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
async function runBuildPostList(options: BuildPostListOptions = {}): Promise<void> {
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

// Self-executing async function to handle top-level await
(async () => {
  try {
    await runBuildPostList();
  } catch (error) {
    // Ensure we exit with error code
    process.exit(1);
  }
})();
