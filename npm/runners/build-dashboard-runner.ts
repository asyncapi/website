import { start } from "../scripts/dashboard/build-dashboard";

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';


const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildDashboard() {
    try {
        await start(resolve(currentDirPath, '..', '..', 'dashboard.json'));
    }
    catch (error) {
        throw new Error('Error building dashboard: ', error as Error);
    }
}
