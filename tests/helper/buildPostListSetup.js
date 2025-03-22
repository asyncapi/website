import fs from 'fs-extra';
import { join, resolve } from 'path';
import TEST_CONTENT from '../fixtures/buildPostListData';

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

function generateTempDirPath(baseDir) {
  return resolve(baseDir, `test-config-${Date.now()}-${Math.random().toString(36).slice(2)}`);
}

export { setupTestDirectories, generateTempDirPath };
