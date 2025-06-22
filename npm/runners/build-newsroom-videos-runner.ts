import { buildNewsroomVideos } from "@/scripts/build-newsroom-videos";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildNewsroomVideos() {
    try {
        await buildNewsroomVideos(resolve(currentDirPath, '../../config', 'newsroom_videos.json'));
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Newsroom videos runner failed: ${error.message}`, { cause: error });
        } else {
            throw new Error(`Newsroom videos runner failed: ${String(error)}`, { cause: error });
        }
    }
}
