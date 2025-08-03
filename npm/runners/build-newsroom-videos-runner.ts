import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildNewsroomVideos } from '@/scripts/build-newsroom-videos';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

interface BuildNewsroomVideosOptions {
  outputPath?: string;
}

/**
 * Runs the build newsroom videos process with configurable options.
 *
 * This function resolves the path to the newsroom_videos.json configuration file,
 * then invokes the buildNewsroomVideos script. It handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for output path
 * @throws {CustomError} If the build process fails or an error occurs in the runner
 */
async function runBuildNewsroomVideos(options: BuildNewsroomVideosOptions = {}): Promise<void> {
  try {
    const outputPath = options.outputPath || resolve(currentDirPath, '../../config', 'newsroom_videos.json');

    await buildNewsroomVideos(outputPath);
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runBuildNewsroomVideos',
      detail: `Build newsroom videos failed with output path: ${options.outputPath}`
    });

    logger.error('Build newsroom videos runner failed', customError);

    throw customError;
  }
}

// Run only in non-test environments
if (process.env.NODE_ENV === 'test') {
  logger.info('Skipping newsroom videos build in test environment');
} else {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      await runBuildNewsroomVideos();
    } catch (error) {
      // Ensure we exit with error code
      process.exit(1);
    }
  })();
}

// Export for testing purposes
export { runBuildNewsroomVideos };
