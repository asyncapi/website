import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildAdoptersList } from '@/scripts/adopters';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export interface BuildAdoptersListOptions {
  sourcePath?: string;
  targetPath?: string;
}

/**
 * Runs the build adopters list process with configurable options.
 *
 * This function determines the source YAML file path and the target JSON output path.
 * It invokes the buildAdoptersList script and handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for source and target paths.
 * @throws {CustomError} When the build process fails or an error occurs in the runner.
 */
async function runBuildAdoptersList(options: BuildAdoptersListOptions = {}): Promise<void> {
  try {
    // Use provided options or fall back to default production paths
    const sourcePath = options.sourcePath || resolve(currentDirPath, '../../config', 'adopters.yml');
    const targetPath = options.targetPath || resolve(currentDirPath, '../../config', 'adopters.json');

    await buildAdoptersList(sourcePath, targetPath);
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runBuildAdoptersList',
      detail: `Build adopters list failed - sourcePath: ${options.sourcePath}, targetPath: ${options.targetPath}`
    });

    logger.error('Build adopters list runner failed', customError);

    throw customError;
  }
}

// Only run CLI if NOT in test environment
if (process.env.NODE_ENV !== 'test' && process.env.VITEST_WORKER_ID === undefined) {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      await runBuildAdoptersList();
    } catch (error) {
      const customError = CustomError.fromError(error, {
        category: 'script',
        operation: 'runBuildAdoptersList',
        detail: 'Build adopters list runner CLI failed'
      });

      logger.error('Build adopters list runner CLI failed', customError);

      process.exit(1);
    }
  })();
}

// Export for testing purposes
export { runBuildAdoptersList };
