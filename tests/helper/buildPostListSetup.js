const { TEST_CONTENT } = require("../fixtures/buildPostListData");
const fs = require('fs-extra');
const { join } = require("path")

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

module.exports = { setupTestDirectories };