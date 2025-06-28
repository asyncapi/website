import { buildNewsroomVideos } from "@/scripts/build-newsroom-videos";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildNewsroomVideos() {
    const outputPath = resolve(currentDirPath, '../../config', 'newsroom_videos.json');
    
    try {
        await buildNewsroomVideos(outputPath);
    }
    catch (error) {
        // If the context is already set, the error is from low level functions
        if ((error as any).context) {
            (error as any).context = {
                ...(error as any).context,
                errorType: 'script_level_error'
            };
            throw error;
        }
        // Otherwise, this is likely a runner-level issue or unexpected error
        const wrappedError = new Error(`Newsroom videos runner failed: ${(error as Error).message}`);
        (wrappedError as any).context = {
            operation: 'runBuildNewsroomVideos',
            runner: 'build-newsroom-videos-runner',
            originalError: error,
            errorType: 'runner_level_error',
            note: 'This error occurred at the runner level, not in the low-level script'
        };
        throw wrappedError;
    }
}
