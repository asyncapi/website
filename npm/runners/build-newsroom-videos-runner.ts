import { buildNewsroomVideos } from "../scripts/build-newsroom-videos";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildNewsroomVideos() {
    try {
        await buildNewsroomVideos(resolve(currentDirPath, '../../config', 'newsroom_videos.json'));
    }
    catch (error) {
        throw error;
    }
}
