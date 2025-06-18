import { buildTools } from "../scripts/build-tools";

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { logger } from "../scripts/utils/logger";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildTools() {
    try {
        const automatedToolsPath = resolve(currentDirPath, '../../config', 'tools-automated.json');
        const manualToolsPath = resolve(currentDirPath, '../../config', 'tools-manual.json');
        const toolsPath = resolve(currentDirPath, '../../config', 'tools.json');
        const tagsPath = resolve(currentDirPath, '../../config', 'all-tags.json');

        await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath).catch((err) => {
            logger.error('Failed to build tools:', err);
            process.exit(1);
        });
    } catch (error) {
        throw new Error('Error building tools: ', error as Error);
    }
}


