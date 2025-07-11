import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { start } from '@/scripts/dashboard/build-dashboard';
import { logger } from '@/scripts/helpers/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Initiates the dashboard generation process.
 */
async function runBuildDashboard() {
  try {
    await start(resolve(currentDirPath, '..', '..', 'dashboard.json'));
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error',
      };
    } else {
      (error as any).context = {
        operation: 'runBuildDashboard',
        runner: 'build-dashboard-runner',
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script',
      };
    }
    logger.error('Build dashboard runner failed', {
      error,
      script: 'build-dashboard-runner.ts',
      task: 'dashboard',
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

runBuildDashboard().catch(() => {
  process.exit(1);
});
