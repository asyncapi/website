import { buildAdoptersList } from '@/scripts/adopters';
import { logger } from '@/scripts/helpers/logger';

/**
 * Runs the build adopters list process.
 *
 * This function invokes the buildAdoptersList script and handles errors,
 * logging them with context and letting the top-level .catch handle process exit.
 */
async function runBuildAdoptersList() {
  try {
    await buildAdoptersList();
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error',
      };
    } else {
      (error as any).context = {
        operation: 'runBuildAdoptersList',
        runner: 'build-adopters-list-runner',
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script',
      };
    }
    logger.error('Build adopters list runner failed', {
      error,
      script: 'build-adopters-list-runner.ts',
      task: 'adopters',
      timestamp: new Date().toISOString(),
    });
  }
}

runBuildAdoptersList().catch(() => {
  process.exit(1);
});
