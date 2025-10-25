import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { logger } from '@/scripts/helpers/logger';
import { combineTools } from '@/scripts/tools/combine-tools';
import { CustomError } from '@/types/errors/CustomError';
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
 * @throws {CustomError} If the build process fails or an error occurs in the runner
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
      error instanceof CustomError
        ? error.updateContext({
            operation: 'runBuildTools',
            detail: `Tools build failed with paths: automated=${options.automatedToolsPath}, manual=${options.manualToolsPath}`
          })
        : CustomError.fromError(error, {
            category: 'script',
            operation: 'runBuildTools',
            detail: `Build tools runner failed with paths: automated=${options.automatedToolsPath}, manual=${options.manualToolsPath}`
          });

    // Log error with full context
    logger.error('Build tools runner failed', customError);

    throw customError;
  }
}

// Export the function and interface for testing purposes
export { runBuildTools };
export type { BuildToolsOptions };

// Only run CLI if this file is executed directly, not when imported
if (import.meta.url === `file://${process.argv[1]}`) {
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
