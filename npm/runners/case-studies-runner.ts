import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildCaseStudiesList } from '@/scripts/casestudies';
import { logger } from '@/scripts/helpers/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const projectRoot = resolve(currentDirPath, '../../');

/**
 * Runs the case studies build process.
 *
 * This function resolves the project root, checks for the existence of the case studies directory,
 * and invokes the buildCaseStudiesList function to generate the case studies JSON file.
 * If an error occurs, it logs the error with context and lets the top-level .catch handle process exit.
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
    } else {
      (error as any).context = {
        operation: 'runCaseStudies',
        runner: 'case-studies-runner',
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script',
      };
    }
    logger.error('Case studies runner failed', {
      error,
      script: 'case-studies-runner.ts',
      task: 'caseStudies',
      timestamp: new Date().toISOString(),
    });
  }
}

runCaseStudies().catch(() => {
  process.exit(1);
});
