import fs from 'fs-extra';
import { join, resolve } from 'path';

import TEST_CONTENT from '../fixtures/buildPostListData';

/**
 * Creates test directories and files within a specified temporary directory for testing purposes.
 *
 * For each predefined test directory ('blog', 'docs', 'about'), this function ensures the directory exists and writes a file with specified content. It also creates a subdirectory inside the 'docs' directory.
 *
 * @param tempDir - The path to the temporary directory where test directories and files will be created.
 */
async function setupTestDirectories(tempDir: string): Promise<void> {
  const dirs = ['blog', 'docs', 'about'];

  await Promise.all(
    dirs.map(async (dir) => {
      const dirKey = dir as keyof typeof TEST_CONTENT;

      await fs.ensureDir(join(tempDir, TEST_CONTENT[dirKey].dir));
      await fs.writeFile(
        join(tempDir, TEST_CONTENT[dirKey].dir, TEST_CONTENT[dirKey].file),
        TEST_CONTENT[dirKey].content
      );
    })
  );
  await fs.ensureDir(join(tempDir, TEST_CONTENT.docs.dir, TEST_CONTENT.docs.subDir));
}

/**
 * Generates a unique temporary directory path within the specified base directory.
 *
 * The generated path includes a timestamp and a random alphanumeric suffix to ensure uniqueness.
 *
 * @param baseDir - The base directory in which to create the temporary directory.
 * @returns The unique temporary directory path.
 */
function generateTempDirPath(baseDir: string) {
  return resolve(baseDir, `test-config-${Date.now()}-${Math.random().toString(36).slice(2)}`);
}

export { generateTempDirPath, setupTestDirectories };
