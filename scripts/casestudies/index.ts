import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { convertToJson } from '../helpers/utils';

/**
 * Compiles a list of case study objects from files in a specified directory and writes the list to a file.
 *
 * This function reads all files in the given directory concurrently, converts each file's content to JSON,
 * writes the aggregated case studies as a JSON array to the specified file, and returns the list.
 *
 * @param dirWithCaseStudy - The directory containing the case study files.
 * @param writeFilePath - The file path where the JSON-formatted list of case studies will be saved.
 * @returns A promise that resolves to an array of case study objects.
 *
 * @throws {Error} If an error occurs during file reading, JSON conversion, or writing operations.
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
