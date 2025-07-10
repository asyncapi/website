import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

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
    const error = new Error(`Failed to build adopters list: ${(err as Error).message}`);

    (error as any).context = {
      operation: 'buildAdoptersList',
      stage: 'main_execution',
      inputFile: 'config/adopters.yml',
      outputFile: resolve(currentDirPath, '../../config', 'adopters.json'),
      errorMessage: (err as Error).message,
      errorStack: ((err as Error).stack || '').split('\n').slice(0, 3).join('\n'),
      nestedContext: (err as any)?.context || null,
      errorType: 'script_level_error',
    };
    throw error;
  }
}
