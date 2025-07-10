import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildTools } from '@/scripts/build-tools';
import { logger } from '@/scripts/helpers/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const repoRootPath = resolve(currentDirPath, '../../');

/**
 * Runs the build tools process.
 *
 * This function resolves the paths to the automated tools, manual tools, combined tools,
 * and tags configuration files, then invokes the buildTools script. It handles errors,
 * wrapping them with additional runner-level context if necessary.
 *
 * @throws {Error} If the build process fails or an error occurs in the runner.
 */
async function runBuildTools() {
  try {
    const automatedToolsPath = resolve(repoRootPath, 'config', 'tools-automated.json');
    const manualToolsPath = resolve(repoRootPath, 'config', 'tools-manual.json');
    const toolsPath = resolve(repoRootPath, 'config', 'tools.json');
    const tagsPath = resolve(repoRootPath, 'config', 'all-tags.json');

    await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error'
      };
    } else {
      (error as any).context = {
        operation: 'runBuildTools',
        runner: 'build-tools-runner',
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script'
      };
    }

    logger.error('Build tools runner failed', {
      error,
      script: 'build-tools-runner.ts',
      task: 'tools',
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

runBuildTools().catch(() => {
  process.exit(1);
});
