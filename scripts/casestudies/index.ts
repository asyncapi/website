import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { convertToJson } from '../utils/functions';

/**
 * Builds a list of case studies from files in a directory and writes it to a specified file.
 * @param {string} dirWithCaseStudy - The directory containing case study files.
 * @param {string} writeFilePath - The path to write the case studies list to.
 * @returns {Promise<object[]>} - The list of case studies.
 */
export async function buildCaseStudiesList(dirWithCaseStudy: string, writeFilePath: string): Promise<object[]> {
  try {
    const files = await readdir(dirWithCaseStudy);

    // Process all files in parallel using Promise.all
    const caseStudiesList = await Promise.all(
      files.map(async (file) => {
        const caseStudyFileName = join(dirWithCaseStudy, file);
        const caseStudyContent = await readFile(caseStudyFileName, 'utf-8');

        return convertToJson(caseStudyContent);
      })
    );

    // Write the complete list once after all files are processed
    await writeFile(writeFilePath, JSON.stringify(caseStudiesList));

    return caseStudiesList;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}
