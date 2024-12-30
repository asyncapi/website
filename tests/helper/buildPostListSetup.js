const { TEST_CONTENT } = require("../fixtures/buildPostListData");
const fs = require('fs-extra');
const { join, resolve } = require("path")

async function setupTestDirectories(tempDir) {
    const dirs = ['blog', 'docs', 'about'];
    for (const dir of dirs) {
        await fs.ensureDir(join(tempDir, TEST_CONTENT[dir].dir));
        await fs.writeFile(
            join(tempDir, TEST_CONTENT[dir].dir, TEST_CONTENT[dir].file),
            TEST_CONTENT[dir].content
        );
    }
    await fs.ensureDir(join(tempDir, TEST_CONTENT.docs.dir, TEST_CONTENT.docs.subDir));
}

function generateTempDirPath(baseDir) {
    return resolve(
        baseDir,
        `test-config-${Date.now()}-${Math.random().toString(36).slice(2)}`
    );
}

module.exports = { setupTestDirectories, generateTempDirPath };