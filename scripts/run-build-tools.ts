import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { logger } from './helpers/logger';
import { buildTools } from './build-tools';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

const automatedToolsPath = resolve(
  currentDirPath,
  '../config',
  'tools-automated.json',
);
const manualToolsPath = resolve(
  currentDirPath,
  '../config',
  'tools-manual.json',
);
const toolsPath = resolve(currentDirPath, '../config', 'tools.json');
const tagsPath = resolve(currentDirPath, '../config', 'all-tags.json');
const ignorePath = resolve(currentDirPath, '../config', 'tools-ignore.json');
const ignoredOutputPath = resolve(
  currentDirPath,
  '../config',
  'tools-ignored.json',
);

try {
  await buildTools(
    automatedToolsPath,
    manualToolsPath,
    toolsPath,
    tagsPath,
    ignorePath,
    ignoredOutputPath,
  );
} catch (err) {
  logger.error('Failed to build tools:', err);
  process.exit(1);
}
