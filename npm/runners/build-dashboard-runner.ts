import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { start } from '@/scripts/dashboard/build-dashboard';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildDashboard() {
  try {
    await start(resolve(currentDirPath, '..', '..', 'dashboard.json'));
  } catch (error) {
    throw error;
  }
}
