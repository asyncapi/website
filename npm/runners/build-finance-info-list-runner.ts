import fs from 'fs';
import { resolve } from 'path';

import { buildFinanceInfoList } from '@/scripts/finance/index';
import { logger } from '@/scripts/helpers/logger';

/**
 * Runs the build finance info list process.
 *
 * This function locates the latest year in the finance directory,
 * then invokes the buildFinanceInfoList script for that year.
 * It handles errors, logging them with context and letting the top-level .catch handle process exit.
 */
async function runBuildFinanceInfoList() {
  const financeDir = resolve('.', 'config', 'finance');

  // loop through all the files finance in directory and find the latest year to build the finance info list
  const yearsList = fs
    .readdirSync(financeDir)
    // filter out any files that are not numbers
    .filter((file) => {
      return !Number.isNaN(parseFloat(file));
    })
    // sort the years in descending order
    .sort((a, b) => {
      return parseFloat(b) - parseFloat(a);
    });

  if (yearsList.length === 0) {
    logger.error('No finance data found in the finance directory.', {
      script: 'build-finance-info-list-runner.ts',
      task: 'finance',
      timestamp: new Date().toISOString(),
    });
    process.exit(1);
  }
  const latestYear = yearsList[0];

  try {
    await buildFinanceInfoList({
      currentDir: '.',
      configDir: 'config',
      financeDir: 'finance',
      year: latestYear,
      jsonDataDir: 'json-data',
    });
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error',
      };
    } else {
      (error as any).context = {
        operation: 'runBuildFinanceInfoList',
        runner: 'build-finance-info-list-runner',
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script',
      };
    }
    logger.error('Build finance info list runner failed', {
      error,
      script: 'build-finance-info-list-runner.ts',
      task: 'finance',
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

runBuildFinanceInfoList().catch(() => {
  process.exit(1);
});
