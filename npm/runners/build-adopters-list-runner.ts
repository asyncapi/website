import { buildAdoptersList } from '@/scripts/adopters';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

/**
 * Runs the build adopters list process.
 *
 * This function invokes the buildAdoptersList script and handles errors,
 * logging them with context and letting the top-level .catch handle process exit.
 * @throws {CustomError} When the build process fails
 */
async function runBuildAdoptersList(): Promise<void> {
  try {
    await buildAdoptersList();
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runBuildAdoptersList',
      detail: 'Build adopters list runner failed'
    });

    logger.error('Build adopters list runner failed', customError);

    throw customError;
  }
}

// Self-executing async function to handle top-level await
(async () => {
  try {
    await runBuildAdoptersList();
  } catch {
    process.exit(1);
  }
})();
