import { buildAdoptersList } from '@/scripts/adopters';
import { logger } from '@/scripts/helpers/logger';
import { RunnerError } from '@/types/errors/RunnerError';

/**
 * Runs the build adopters list process.
 *
 * This function invokes the buildAdoptersList script and handles errors,
 * logging them with context and letting the top-level .catch handle process exit.
 * @throws {RunnerError} When the build process fails
 */
async function runBuildAdoptersList(): Promise<void> {
  try {
    await buildAdoptersList();
  } catch (error) {
    const customError = RunnerError.fromError(error, {
      errorType: 'runner_level_error',
      operation: 'runBuildAdoptersList',
      runner: 'build-adopters-list-runner',
      script: 'build-adopters-list-runner.ts',
      task: 'adopters',
      note: 'This error occurred at the runner level, not in the low-level script'
    });

    logger.error('Build adopters list runner failed', {
      error: customError,
      script: customError.context.script,
      task: customError.context.task,
      timestamp: customError.context.timestamp
    });

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
