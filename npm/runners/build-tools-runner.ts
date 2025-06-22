import { buildTools } from "@/scripts/build-tools";

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const repoRootPath = resolve(currentDirPath, '../../');

export async function runBuildTools() {
    try {
        const automatedToolsPath = resolve(repoRootPath, 'config', 'tools-automated.json');
        const manualToolsPath = resolve(repoRootPath, 'config', 'tools-manual.json');
        const toolsPath = resolve(repoRootPath, 'config', 'tools.json');
        const tagsPath = resolve(repoRootPath, 'config', 'all-tags.json');

        await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
    } catch (error) {
        throw error;
    }
}


