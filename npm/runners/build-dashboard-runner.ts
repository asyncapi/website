import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { start as buildDashboard } from '@/scripts/dashboard/build-dashboard';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export interface BuildDashboardOptions {
  outputPath?: string;
}

/**
 * Runs the dashboard generation process with configurable options.
 *
 * This function resolves the path to the dashboard.json output file,
 * then invokes the buildDashboard script. It handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for output path
 * @throws {CustomError} If the build process fails or an error occurs in the runner
 */
export async function runBuildDashboard(options: BuildDashboardOptions = {}): Promise<void> {
  try {
    const outputPath = options.outputPath || resolve(currentDirPath, '../../dashboard.json');

    await buildDashboard(outputPath);
  } catch (error) {
    // Create or enhance the error with full context
    const customError =
      error instanceof CustomError
        ? error.updateContext({
            operation: 'runBuildDashboard',
            detail: `Runner failed with output path: ${options.outputPath}`
          })
        : CustomError.fromError(error, {
            category: 'script',
            operation: 'runBuildDashboard',
            detail: `Build dashboard runner failed with output path: ${options.outputPath}`
          });

    // Log error with full context
    logger.error('Build dashboard runner failed', customError);

    throw customError;
  }
}

// Only run CLI if NOT in test environment (when imported by tests, don't auto-run)
if (process.env.NODE_ENV !== 'test' && process.env.VITEST_WORKER_ID === undefined) {
  (async () => {
    try {
      // Extract output file path from CLI args
      const outputFileArgIndex = process.argv.indexOf('--outputFile');
      const outputPath =
        outputFileArgIndex === -1
          ? resolve(currentDirPath, '../../dashboard.json')
          : process.argv[outputFileArgIndex + 1];

      await runBuildDashboard({ outputPath });
    } catch (error) {
      process.exit(1);
    }
  })();
}
