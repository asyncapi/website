import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildMeetings } from '../scripts/build-meetings';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

export async function runBuildMeetings(){
    try{
        buildMeetings(resolve(currentDirPath, '../config', 'meetings.json'));
    }catch(error){
        throw new Error('Error building meetings: ', error as Error);
    }
}