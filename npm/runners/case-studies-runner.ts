import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildCaseStudiesList } from '@/scripts/casestudies';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const projectRoot = resolve(currentDirPath, '../../');

/**
 * Runs the case studies build process.
 *
 * This function resolves the project root, checks for the existence of the case studies directory,
 * and invokes the buildCaseStudiesList function to generate the case studies JSON file.
 * If an error occurs, it wraps the error with additional context and rethrows it.
 *
 * @throws {Error} If the case studies directory is missing or if the build process fails.
 */
async function runCaseStudies() {
  try {
    const caseStudyDirectory = resolve(projectRoot, 'config', 'casestudies');

    if (!fs.existsSync(caseStudyDirectory)) {
      throw new Error(`Case-study directory missing: ${caseStudyDirectory}`);
    }
    const writeFilePath = resolve(projectRoot, 'config', 'case-studies.json');

    await buildCaseStudiesList(caseStudyDirectory, writeFilePath);
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error',
      };
      throw error;
    }
    const wrappedError = new Error(`Case studies runner failed: ${(error as Error).message}`);

    (wrappedError as any).context = {
      operation: 'runCaseStudies',
      runner: 'case-studies-runner',
      originalError: error,
      errorType: 'runner_level_error',
      note: 'This error occurred at the runner level, not in the low-level script',
    };
    throw wrappedError;
  }
}

runCaseStudies();