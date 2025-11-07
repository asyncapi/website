import { writeJSON } from '../helpers/readAndWriteJson';

/**
 * Converts the YAML adopters configuration to a JSON file.
 *
 * This asynchronous function reads the adopters configuration from the specified
 * source path and converts its content to JSON format. It then writes the resulting
 * JSON data to the specified target path. The operation is performed using the
 * writeJSON utility.
 *
 * @param sourcePath - The file path to the source YAML file (e.g., 'config/adopters.yml').
 * @param targetPath - The file path where the JSON output will be written (e.g., 'config/adopters.json').
 * @throws {Error} When required inputs are missing or an error occurs during file reading, conversion, or writing.
 */
export async function buildAdoptersList(sourcePath: string, targetPath: string): Promise<void> {
  try {
    if (!sourcePath) {
      const error = new Error('sourcePath is required');

      (error as any).context = {
        function: 'buildAdoptersList',
        sourcePath,
        targetPath
      };
      throw error;
    }
    if (!targetPath) {
      const error = new Error('targetPath is required');

      (error as any).context = {
        function: 'buildAdoptersList',
        sourcePath,
        targetPath
      };
      throw error;
    }

    await writeJSON(sourcePath, targetPath);
  } catch (error) {
    const contextError = new Error(`Error while building adopters list: ${(error as Error).message}`);

    (contextError as any).context = {
      operation: (error as any)?.context?.operation || 'buildAdoptersList',
      stage: (error as any)?.context?.stage || 'main_execution',
      sourcePath,
      targetPath,
      errorMessage: (error as Error).message,
      errorStack: (error as Error).stack?.split('\n').slice(0, 3).join('\n')
    };
    throw contextError;
  }
}
