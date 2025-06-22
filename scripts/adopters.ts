import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { writeJSON } from './utils/readAndWriteJson';

/**
 * Converts the YAML adopters configuration to a JSON file.
 *
 * This asynchronous function reads the adopters configuration from
 * "config/adopters.yml" and converts its content to JSON format. It then writes
 * the resulting JSON data to "adopters.json" in the configuration directory determined
 * by resolving the current file's directory with "../../config". The operation is
 * performed using the writeJSON utility.
 *
 * @returns {Promise<void>} Resolves when the adopters list has been built and written to JSON.
 */
export async function buildAdoptersList(): Promise<void> {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentFilePath);
    await writeJSON('config/adopters.yml', resolve(currentDirPath, '../../config', 'adopters.json'));
  } catch (error) {
    throw error;
  }
} 