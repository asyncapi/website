import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { writeJSON } from '../utils';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Builds the adopters list by converting a YAML file to JSON and writing it to a specified path.
 */
export async function buildAdoptersList() {
  writeJSON('config/adopters.yml', resolve(currentDirPath, '../../config', 'adopters.json'));
}
