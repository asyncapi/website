import { buildTools } from "../scripts/build-tools";

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildTools() {
    try {
        const automatedToolsPath = resolve(currentDirPath, '../../config', 'tools-automated.json');
        const manualToolsPath = resolve(currentDirPath, '../../config', 'tools-manual.json');
        const toolsPath = resolve(currentDirPath, '../../config', 'tools.json');
        const tagsPath = resolve(currentDirPath, '../../config', 'all-tags.json');

        await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
    } catch (error) {
        throw error;
    }
}


