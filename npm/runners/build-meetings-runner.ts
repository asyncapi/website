import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildMeetings } from '@/scripts/build-meetings';
import { logger } from '@/scripts/helpers/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Runs the build meetings process.
 *
 * This function resolves the path to the meetings.json configuration file,
 * then invokes the buildMeetings script. It handles errors, logging them with context and letting the top-level .catch handle process exit.
 */
async function runBuildMeetings() {
  try {
    await buildMeetings(resolve(currentDirPath, '../../config', 'meetings.json'));
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error',
      };
    } else {
      (error as any).context = {
        operation: 'runBuildMeetings',
        runner: 'build-meetings-runner',
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script',
      };
    }
    logger.error('Build meetings runner failed', {
      error,
      script: 'build-meetings-runner.ts',
      task: 'meetings',
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

runBuildMeetings().catch(() => {
  process.exit(1);
});
