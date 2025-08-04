import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildMeetings } from '@/scripts/build-meetings';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

interface BuildMeetingsOptions {
  outputPath?: string;
}

/**
 * Runs the build meetings process with configurable options.
 *
 * This function resolves the path to the meetings.json configuration file,
 * then invokes the buildMeetings script. It handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for output path
 * @throws {CustomError} If the build process fails or an error occurs in the runner
 */
async function runBuildMeetings(options: BuildMeetingsOptions = {}): Promise<void> {
  try {
    const outputPath = options.outputPath || resolve(currentDirPath, '../../config', 'meetings.json');

    await buildMeetings(outputPath);
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runBuildMeetings',
      detail: `Build meetings failed with output path: ${options.outputPath}`
    });

    logger.error('Build meetings runner failed', customError);

    throw customError;
  }
}

// Run only in non-test environments
if (process.env.NODE_ENV === 'test') {
  logger.info('Skipping meetings build in test environment');
} else {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      await runBuildMeetings();
    } catch (error) {
      // Ensure we exit with error code
      process.exit(1);
    }
  })();
}

// Export for testing purposes
export { runBuildMeetings };
