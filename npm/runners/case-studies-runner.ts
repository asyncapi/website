import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildCaseStudiesList } from '@/scripts/casestudies';
import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

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
 * @throws {CustomError} If the build process fails or an error occurs in the runner
 */
async function runCaseStudies(options: CaseStudiesOptions = {}): Promise<void> {
  try {
    const caseStudyDirectory = options.caseStudyDirectory || resolve(projectRoot, 'config', 'casestudies');
    const writeFilePath = options.outputPath || resolve(projectRoot, 'config', 'case-studies.json');

    // Validate directory existence before proceeding
    if (!fs.existsSync(caseStudyDirectory)) {
      throw new CustomError(`Case-study directory missing: ${caseStudyDirectory}`, {
        category: 'script',
        operation: 'validateCaseStudyDirectory',
        detail: `Directory: ${caseStudyDirectory}, Output: ${writeFilePath}`
      });
    }

    await buildCaseStudiesList(caseStudyDirectory, writeFilePath);
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runCaseStudies',
      detail: `Case studies build failed - directory: ${options.caseStudyDirectory}, output: ${options.outputPath}`
    });

    logger.error('Case studies runner failed', customError);

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
