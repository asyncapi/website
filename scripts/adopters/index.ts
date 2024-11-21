import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { writeJSON } from '../utils/readAndWriteJson';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function buildAdoptersList() {
  writeJSON('config/adopters.yml', resolve(__dirname, '../../config', 'adopters.json'));
}
