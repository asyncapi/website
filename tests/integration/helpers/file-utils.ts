import { promises as fs } from 'fs';
import { join } from 'path';

/**
 * Helper function to recursively get all files in a directory
 * @param dir - The directory to scan
 * @param fileList - Accumulator array for file paths (used for recursion)
 * @returns Promise that resolves to an array of file paths
 */
export async function getAllFiles(dir: string, fileList: string[] = []): Promise<string[]> {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    // eslint-disable-next-line no-await-in-loop
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      fileList.push(`${filePath}/`);
      // eslint-disable-next-line no-await-in-loop
      await getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
}
