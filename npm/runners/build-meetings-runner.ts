import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildMeetings } from '@/scripts/build-meetings';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Runs the build meetings process.
 *
 * This function resolves the path to the meetings.json configuration file,
 * then invokes the buildMeetings script. It handles errors, wrapping them
 * with additional runner-level context if necessary.
 *
 * @throws {Error} If the build process fails or an error occurs in the runner.
 */
async function runBuildMeetings() {
  try {
    await buildMeetings(resolve(currentDirPath, '../../config', 'meetings.json'));
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error'
      };
      throw error;
    }
    const wrappedError = new Error(`Build meetings runner failed: ${(error as Error).message}`);

    (wrappedError as any).context = {
      operation: 'runBuildMeetings',
      runner: 'build-meetings-runner',
      originalError: error,
      errorType: 'runner_level_error',
      note: 'This error occurred at the runner level, not in the low-level script'
    };
    throw wrappedError;
  }
}

runBuildMeetings();