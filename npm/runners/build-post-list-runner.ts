import { buildPostList } from '../scripts/build-post-list';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildPostList() {
    try {
        const postDirectories = [
            ['../../pages/blog', '/blog'],
            ['../../pages/docs', '/docs'],
            ['../../pages/about', '/about']
        ];
        const basePath = '../../pages';
        const writeFilePath = resolve(currentDirPath, '../../config', 'posts.json');
        await buildPostList(postDirectories, basePath, writeFilePath);
    } catch (err) {
        throw new Error('Error building post list', { cause: err });
    }
}
