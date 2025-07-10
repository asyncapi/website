import { buildAdoptersList } from '@/scripts/adopters';

/**
 * Runs the build adopters list process.
 *
 * This function invokes the buildAdoptersList script and handles errors,
 * wrapping them with additional runner-level context if necessary.
 *
 * @throws {Error} If the build process fails or an error occurs in the runner.
 */
async function runBuildAdoptersList() {
  try {
    await buildAdoptersList();
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error'
      };
      throw error;
    }
    const wrappedError = new Error(`Build adopters list runner failed: ${(error as Error).message}`);

    (wrappedError as any).context = {
      operation: 'runBuildAdoptersList',
      runner: 'build-adopters-list-runner',
      originalError: error,
      errorType: 'runner_level_error',
      note: 'This error occurred at the runner level, not in the low-level script'
    };
    throw wrappedError;
  }
}
runBuildAdoptersList();
