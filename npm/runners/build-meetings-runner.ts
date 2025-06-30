import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildMeetings } from '@/scripts/build-meetings';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildMeetings(){
    try{
        await buildMeetings(resolve(currentDirPath, '../../config', 'meetings.json'));
    }catch (error) {
        if (error instanceof Error) {
            throw new Error(`Build meetings runner failed: ${error.message}`, { cause: error });
        } else {
            throw new Error(`Build meetings runner failed: ${String(error)}`, { cause: error });
        }
    }
}