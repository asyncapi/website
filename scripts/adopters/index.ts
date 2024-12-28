import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import writeJSON from '../utils/readAndWriteJson';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function buildAdoptersList() {
  writeJSON('config/adopters.yml', resolve(currentDirPath, '../../config', 'adopters.json'));
}
