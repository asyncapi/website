import { buildPostList } from '@/scripts/build-post-list';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildPostList() {
    const postDirectories = [
        [resolve(currentDirPath, '../../pages/blog'), '/blog'],
        [resolve(currentDirPath, '../../pages/docs'), '/docs'],
        [resolve(currentDirPath, '../../pages/about'), '/about']
    ];
    const basePath = resolve(currentDirPath, '../../pages');
    const outputPath = resolve(currentDirPath, '../../config', 'posts.json');
    
    try {
        await buildPostList(postDirectories, basePath, outputPath);
    }
    catch (error) {
        // If it's already our structured error, add runner context and rethrow
        if ((error as any).context) {
            (error as any).context = {
                ...(error as any).context,
                errorType: 'script_level_error'
            };
            throw error;
        }
        // Otherwise, this is likely a runner-level issue or unexpected error
        const wrappedError = new Error(`Post list runner failed: ${(error as Error).message}`);
        (wrappedError as any).context = {
            operation: 'runBuildPostList',
            runner: 'build-post-list-runner',
            outputPath,
            timestamp: new Date().toISOString(),
            originalError: error,
            errorType: 'runner_level_error',
            note: 'This error occurred at the runner level, not in the low-level script'
        };
        throw wrappedError;
    }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runBuildPostList().catch((error) => {
        console.error('Error running build post list:', error);
        process.exit(1);
    });
}