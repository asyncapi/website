import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { logger } from '@/scripts/helpers/logger';
import { combineTools } from '@/scripts/tools/combine-tools';
import { RunnerError } from '@/types/errors/RunnerError';
import type { ToolsListObject } from '@/types/scripts/tools';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

interface BuildToolsOptions {
  automatedToolsPath?: string;
  manualToolsPath?: string;
  toolsPath?: string;
  tagsPath?: string;
}

/**
 * Runs the build tools process with configurable options.
 *
 * This function resolves the paths for tools data and output,
 * then invokes the combineTools script. It handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for tools data and output paths
 * @throws {RunnerError} If the build process fails or an error occurs in the runner
 */
async function runBuildTools(options: BuildToolsOptions = {}): Promise<void> {
  try {
    const automatedToolsPath =
      options.automatedToolsPath || resolve(currentDirPath, '../../config', 'tools-automated.json');
    const manualToolsPath = options.manualToolsPath || resolve(currentDirPath, '../../config', 'tools-manual.json');
    const toolsPath = options.toolsPath || resolve(currentDirPath, '../../config', 'tools.json');
    const tagsPath = options.tagsPath || resolve(currentDirPath, '../../config', 'all-tags.json');

    // Read the tools files
    const automatedTools: ToolsListObject = JSON.parse(fs.readFileSync(automatedToolsPath, 'utf8'));
    const manualTools: ToolsListObject = JSON.parse(fs.readFileSync(manualToolsPath, 'utf8'));

    await combineTools(automatedTools, manualTools, toolsPath, tagsPath);
  } catch (error) {
    // Create or enhance the error with full context
    const customError =
      error instanceof RunnerError
        ? error.updateContext({
            operation: 'runBuildTools',
            runner: 'build-tools-runner',
            script: 'build-tools-runner.ts',
            task: 'tools',
            context: {
              automatedToolsPath: options.automatedToolsPath,
              manualToolsPath: options.manualToolsPath,
              toolsPath: options.toolsPath,
              tagsPath: options.tagsPath
            }
          })
        : RunnerError.fromError(error, {
            errorType: 'runner_level_error',
            operation: 'runBuildTools',
            runner: 'build-tools-runner',
            script: 'build-tools-runner.ts',
            task: 'tools',
            note: 'Error occurred at runner level',
            context: {
              automatedToolsPath: options.automatedToolsPath,
              manualToolsPath: options.manualToolsPath,
              toolsPath: options.toolsPath,
              tagsPath: options.tagsPath
            }
          });

    // Log error with full stack trace and context
    logger.error('Build tools runner failed', {
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
  logger.info('Skipping tools build in test environment');
} else {
  // Self-executing async function to handle top-level await
  (async () => {
    try {
      await runBuildTools();
    } catch (error) {
      // Ensure we exit with error code
      process.exit(1);
    }
  })();
}

// Export for testing purposes
export { runBuildTools };
