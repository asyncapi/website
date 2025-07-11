import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildNewsroomVideos } from '@/scripts/build-newsroom-videos';
import { logger } from '@/scripts/helpers/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Runs the build newsroom videos process.
 *
 * This function resolves the path to the newsroom_videos.json configuration file,
 * then invokes the buildNewsroomVideos script. It handles errors, logging them with context and letting the top-level .catch handle process exit.
 */
async function runBuildNewsroomVideos() {
  const outputPath = resolve(currentDirPath, '../../config', 'newsroom_videos.json');

  try {
    await buildNewsroomVideos(outputPath);
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error',
      };
    } else {
      (error as any).context = {
        operation: 'runBuildNewsroomVideos',
        runner: 'build-newsroom-videos-runner',
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script',
      };
    }
    logger.error('Build newsroom videos runner failed', {
      error,
      script: 'build-newsroom-videos-runner.ts',
      task: 'newsroomVideos',
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

runBuildNewsroomVideos().catch(() => {
  process.exit(1);
});
