import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildCaseStudiesList } from '@/scripts/casestudies';
import { logger } from '@/scripts/helpers/logger';
import { RunnerError } from '@/types/errors/RunnerError';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const projectRoot = resolve(currentDirPath, '../../');

interface CaseStudiesOptions {
  caseStudyDirectory?: string;
  outputPath?: string;
}

/**
 * Runs the case studies build process with configurable options.
 *
 * This function resolves the project root, checks for the existence of the case studies directory,
 * and invokes the buildCaseStudiesList function to generate the case studies JSON file.
 * If an error occurs, it logs the error with context and lets the top-level .catch handle process exit.
 *
 * @param options - Optional configuration for case study directory and output path
 * @throws {RunnerError} If the build process fails or an error occurs in the runner
 */
async function runCaseStudies(options: CaseStudiesOptions = {}): Promise<void> {
  try {
    const caseStudyDirectory = options.caseStudyDirectory || resolve(projectRoot, 'config', 'casestudies');
    const writeFilePath = options.outputPath || resolve(projectRoot, 'config', 'case-studies.json');

    // Validate directory existence before proceeding
    if (!fs.existsSync(caseStudyDirectory)) {
      throw new RunnerError(`Case-study directory missing: ${caseStudyDirectory}`, {
        errorType: 'runner_level_error',
        operation: 'validateCaseStudyDirectory',
        runner: 'case-studies-runner',
        script: 'case-studies-runner.ts',
        task: 'case-studies',
        context: {
          caseStudyDirectory,
          writeFilePath
        }
      });
    }

    await buildCaseStudiesList(caseStudyDirectory, writeFilePath);
  } catch (error) {
    // If error is not already a RunnerError, wrap it
    const customError =
      error instanceof RunnerError
        ? error
        : RunnerError.fromError(error, {
            errorType: 'runner_level_error',
            operation: 'runCaseStudies',
            runner: 'case-studies-runner',
            script: 'case-studies-runner.ts',
            task: 'case-studies',
            note:
              error instanceof RunnerError ? 'Error propagated from script level' : 'Error occurred at runner level',
            // Preserve important configuration context
            context: {
              caseStudyDirectory: options.caseStudyDirectory,
              outputPath: options.outputPath
            }
          });

    logger.error('Case studies runner failed', {
      error: customError,
      script: customError.context.script,
      task: customError.context.task,
      timestamp: customError.context.timestamp,
      // Log additional context for debugging
      configuration: customError.context.context
    });

    throw customError;
  }
}

// Self-executing async function to handle top-level await
(async () => {
  try {
    await runCaseStudies();
  } catch (error) {
    // Ensure we exit with error code
    process.exit(1);
  }
})();
