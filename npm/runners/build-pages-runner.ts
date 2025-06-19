import { ensureDirectoryExists, copyAndRenameFiles } from "../scripts/build-pages";

const SRC_DIR = 'markdown';
const TARGET_DIR = 'pages';


export async function runBuildPages() {
  try {
    ensureDirectoryExists(TARGET_DIR);
    copyAndRenameFiles(SRC_DIR, TARGET_DIR);
  } catch (err) {
    throw err;
  }
}
