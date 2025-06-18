import { buildPostList } from '../scripts/build-post-list';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const projectRoot = resolve(currentDirPath, '../../');

export async function runBuildPostList() {
    const postDirectories = [
        [resolve(projectRoot, 'pages', 'blog'), '/blog'],
        [resolve(projectRoot, 'pages', 'docs'), '/docs'],
        [resolve(projectRoot, 'pages', 'about'), '/about']
    ];

    const basePath = resolve(projectRoot, 'pages');
    const writeFilePath = resolve(projectRoot, 'config', 'posts.json');

    try {
        await buildPostList(postDirectories, basePath, writeFilePath);
    } catch (err) {
        throw new Error('Error building post list: ', err as Error);
    }

}
