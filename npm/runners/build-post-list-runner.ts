import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildPostList } from '@/scripts/build-post-list';

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
 * It invokes the buildPostList script and handles errors, wrapping them with additional runner-level context if necessary.
 *
 * @param options - Optional configuration for post directories, base path, and output path.
 * @throws {Error} If the build process fails or an error occurs in the runner.
 */
async function runBuildPostList(options: BuildPostListOptions = {}) {
  // Use provided options or fall back to default production paths
  const postDirectories = options.postDirectories || [
    [resolve(currentDirPath, '../../pages/blog'), '/blog'],
    [resolve(currentDirPath, '../../pages/docs'), '/docs'],
    [resolve(currentDirPath, '../../pages/about'), '/about']
  ];
  const basePath = options.basePath || resolve(currentDirPath, '../../pages');
  const outputPath = options.outputPath || resolve(currentDirPath, '../../config', 'posts.json');

  try {
    await buildPostList(postDirectories, basePath, outputPath);
  } catch (error) {
    // If it's already our structured error, add runner context and rethrow
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error'
      };
      throw error;
    }
    // Otherwise, this is likely a runner-level issue or unexpected error
    const wrappedError = new Error(`Post list runner failed: ${(error as Error).message}`);

    (wrappedError as any).context = {
      operation: 'runBuildPostList',
      runner: 'build-post-list-runner',
      outputPath,
      timestamp: new Date().toISOString(),
      originalError: error,
      errorType: 'runner_level_error',
      note: 'This error occurred at the runner level, not in the low-level script'
    };
    throw wrappedError;
  }
}

runBuildPostList();