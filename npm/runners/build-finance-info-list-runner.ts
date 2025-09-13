import fs from 'fs';
import { resolve } from 'path';

import { buildFinanceInfoList } from '@/scripts/finance';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

interface BuildFinanceInfoOptions {
  currentDir?: string;
  configDir?: string;
  financeDir?: string;
  jsonDataDir?: string;
  year?: string;
}

const DEFAULT_OPTIONS = {
  currentDir: '.',
  configDir: 'config',
  financeDir: 'finance',
  jsonDataDir: 'json-data'
};

/**
 * Runs the build finance info list process with configurable options.
 *
 * This function locates the latest year in the finance directory,
 * then invokes the buildFinanceInfoList script for that year.
 * It handles errors, logging them with context and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for directories and year
 * @throws {CustomError} If the build process fails or an error occurs in the runner
 */
async function runBuildFinanceInfoList(options: BuildFinanceInfoOptions = {}): Promise<void> {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const financeDir = resolve(config.currentDir, config.configDir, config.financeDir);

  try {
    // If year is not provided, find the latest year
    let targetYear = config.year;

    if (!targetYear) {
      const yearsList = fs
        .readdirSync(financeDir)
        // Filter out any files that are not numbers
        .filter((file) => !Number.isNaN(parseFloat(file)))
        // Sort the years in descending order
        .sort((a, b) => parseFloat(b) - parseFloat(a));

      if (yearsList.length === 0) {
        throw new CustomError('No finance data found in the finance directory', {
          category: 'script',
          operation: 'findLatestYear',
          detail: `Finance directory: ${financeDir}, Available years: ${yearsList.join(', ')}`
        });
      }

      const [latestYear] = yearsList;

      targetYear = latestYear;
    }

    await buildFinanceInfoList({
      currentDir: config.currentDir,
      configDir: config.configDir,
      financeDir: config.financeDir,
      year: targetYear,
      jsonDataDir: config.jsonDataDir
    });
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runBuildFinanceInfoList',
      detail: `Build finance info failed for year: ${config.year}, financeDir: ${financeDir}`
    });

    logger.error('Build finance info list runner failed', customError);

    throw customError;
  }
}

// Run only in non-test environments
if (process.env.NODE_ENV === 'test') {
  logger.info('Skipping finance info list build in test environment');
} else {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      await runBuildFinanceInfoList();
    } catch (error) {
      // Ensure we exit with error code
      process.exit(1);
    }
  })();
}

// Export for testing purposes
export { runBuildFinanceInfoList };
