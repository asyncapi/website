import fs from 'fs-extra';
import { join, resolve } from 'path';

import TEST_CONTENT from '../fixtures/buildPostListData';

/**
 * Sets up test directories and files for testing
 * @param {string} tempDir - The temporary directory path where test files will be created
 * @returns {Promise<void>} - A promise that resolves when all directories and files are created
 */
async function setupTestDirectories(tempDir) {
  const dirs = ['blog', 'docs', 'about'];

  await Promise.all(
    dirs.map(async (dir) => {
      await fs.ensureDir(join(tempDir, TEST_CONTENT[dir].dir));
      await fs.writeFile(join(tempDir, TEST_CONTENT[dir].dir, TEST_CONTENT[dir].file), TEST_CONTENT[dir].content);
    })
  );
  await fs.ensureDir(join(tempDir, TEST_CONTENT.docs.dir, TEST_CONTENT.docs.subDir));
}

/**
 * Generates a unique temporary directory path.
 * @param {string} baseDir - The base directory where the temporary directory will be created.
 * @returns {string} - The generated temporary directory path.
 */
function generateTempDirPath(baseDir) {
  return resolve(baseDir, `test-config-${Date.now()}-${Math.random().toString(36).slice(2)}`);
}

export { generateTempDirPath, setupTestDirectories };
