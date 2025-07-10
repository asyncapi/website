import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildPostList } from '@/scripts/build-post-list';
import { logger } from '@/scripts/helpers/logger';

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
 * This function determines the directories to scan for posts, the base path, and the output path for the generated post list.
 * It invokes the buildPostList script and handles errors, logging them with context and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for post directories, base path, and output path.
 * @throws {Error} If the build process fails or an error occurs in the runner.
 */
async function runBuildPostList(options: BuildPostListOptions = {}) {
  // Use provided options or fall back to default production paths
  const postDirectories = options.postDirectories || [
    [resolve(currentDirPath, '../../pages/blog'), '/blog'],
    [resolve(currentDirPath, '../../pages/docs'), '/docs'],
    [resolve(currentDirPath, '../../pages/about'), '/about'],
  ];
  const basePath = options.basePath || resolve(currentDirPath, '../../pages');
  const outputPath = options.outputPath || resolve(currentDirPath, '../../config', 'posts.json');

  try {
    await buildPostList(postDirectories, basePath, outputPath);
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error',
      };
    } else {
      (error as any).context = {
        operation: 'runBuildPostList',
        runner: 'build-post-list-runner',
        outputPath,
        timestamp: new Date().toISOString(),
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script',
      };
    }
    logger.error('Build post list runner failed', {
      error,
      script: 'build-post-list-runner.ts',
      task: 'posts',
      timestamp: new Date().toISOString(),
    });
  }
}

runBuildPostList().catch(() => {
  process.exit(1);
});
