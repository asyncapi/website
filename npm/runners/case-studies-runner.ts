import { buildCaseStudiesList } from '@/scripts/casestudies';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const projectRoot = resolve(currentDirPath, '../../');

export async function runCaseStudies() {
    try {
        const caseStudyDirectory = resolve(projectRoot, 'config', 'casestudies');
        if (!fs.existsSync(caseStudyDirectory)) {
            console.error(`Directory does not exist: ${caseStudyDirectory}`);
            return;
        }
        const writeFilePath = resolve(projectRoot, 'config', 'case-studies.json');
        await buildCaseStudiesList(caseStudyDirectory, writeFilePath);
    } catch (error) {
        throw error;
    }
}
