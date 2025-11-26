import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { writeJSON } from '../helpers/readAndWriteJson';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Converts the YAML usecases configuration to a JSON file.
 *
 * This asynchronous function reads the usecases configuration from
 * "config/usecases.yaml" and converts its content to JSON format. It then writes
 * the resulting JSON data to "usecases.json" in the configuration directory determined
 * by resolving the current file's directory with "../../config". The operation is
 * performed using the writeJSON utility.
 */
export async function buildUsecasesList() {
  await writeJSON('config/usecases.yaml', resolve(currentDirPath, '../../config', 'usecases.json'), true);
}
