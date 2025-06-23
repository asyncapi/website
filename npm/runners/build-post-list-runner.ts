import { buildPostList } from '@/scripts/build-post-list';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildPostList() {
    try {
        const postDirectories = [
            [resolve(currentDirPath, '../../pages/blog'), '/blog'],
            [resolve(currentDirPath, '../../pages/docs'), '/docs'],
            [resolve(currentDirPath, '../../pages/about'), '/about']
        ];
        const basePath = resolve(currentDirPath, '../../pages');
        const writeFilePath = resolve(currentDirPath, '../../config', 'posts.json');
        await buildPostList(postDirectories, basePath, writeFilePath);
    } catch (err) {
        throw err;
    }
}
