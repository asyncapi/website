import fs from 'fs';
import { resolve } from 'path';

import { buildFinanceInfoList } from '@/scripts/finance';
import { logger } from '@/scripts/helpers/logger';
import { RunnerError } from '@/types/errors/RunnerError';

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
 * @throws {RunnerError} If the build process fails or an error occurs in the runner
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
        throw new RunnerError('No finance data found in the finance directory', {
          errorType: 'runner_level_error',
          operation: 'findLatestYear',
          runner: 'build-finance-info-list-runner',
          script: 'build-finance-info-list-runner.ts',
          task: 'finance',
          context: {
            financeDir,
            availableYears: yearsList
          }
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
    // Create or enhance the error with full context
    const customError =
      error instanceof RunnerError
        ? error.updateContext({
            operation: 'runBuildFinanceInfoList',
            runner: 'build-finance-info-list-runner',
            script: 'build-finance-info-list-runner.ts',
            task: 'finance',
            context: {
              ...config,
              targetYear: config.year,
              financeDir
            }
          })
        : RunnerError.fromError(error, {
            errorType: 'runner_level_error',
            operation: 'runBuildFinanceInfoList',
            runner: 'build-finance-info-list-runner',
            script: 'build-finance-info-list-runner.ts',
            task: 'finance',
            note: 'Error occurred at runner level',
            context: {
              ...config,
              targetYear: config.year,
              financeDir
            }
          });

    // Log error with full stack trace and context
    logger.error('Build finance info list runner failed', {
      error: customError,
      script: customError.context.script,
      task: customError.context.task,
      timestamp: customError.context.timestamp,
      configuration: customError.context.context,
      stackTrace: customError.getFullStack()
    });

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
