import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { CustomError } from '@/types/errors/CustomError';

import { writeJSON } from '../helpers/readAndWriteJson';

/**
 * Converts the YAML adopters configuration to a JSON file.
 *
 * This asynchronous function reads the adopters configuration from
 * "config/adopters.yml" and converts its content to JSON format. It then writes
 * the resulting JSON data to "adopters.json" in the configuration directory determined
 * by resolving the current file's directory with "../../config". The operation is
 * performed using the writeJSON utility.
 */
export async function buildAdoptersList() {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = dirname(currentFilePath);

  try {
    await writeJSON('config/adopters.yml', resolve(currentDirPath, '../../config', 'adopters.json'));
  } catch (err) {
    throw CustomError.fromError(err, {
      category: 'script',
      operation: 'buildAdoptersList',
      detail: `Failed to convert adopters.yml to JSON at ${resolve(currentDirPath, '../../config', 'adopters.json')}`
    });
  }
}
