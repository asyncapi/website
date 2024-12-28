import { readdir, readFile, writeFile } from 'fs/promises';

import { convertToJson } from '../utils';

export default async function buildCaseStudiesList(dirWithCaseStudy: string, writeFilePath: string) {
  try {
    const files = await readdir(dirWithCaseStudy);

    // Process all files in parallel using Promise.all
    const caseStudiesList = await Promise.all(
      files.map(async (file) => {
        const caseStudyFileName = [dirWithCaseStudy, file].join('/');
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
