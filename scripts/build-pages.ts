import type { PathLike } from 'fs';
import fs from 'fs';
import path from 'path';

const SRC_DIR = 'markdown';
const TARGET_DIR = 'pages';

const capitalizeTags = ['table', 'tr', 'td', 'th', 'thead', 'tbody'];

/**
 * Ensures that the specified directory exists. If it doesn't, creates it.
 *
 * @param {PathLike} directory - The directory path to check or create.
 */
export function ensureDirectoryExists(directory: PathLike) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}
ensureDirectoryExists(TARGET_DIR);

/**
 * Capitalizes JSX tags in the provided content string.
 *
 * @param {string} content - The content string to process.
 * @returns {string} - The content string with capitalized JSX tags.
 */
export function capitalizeJsxTags(content: string) {
  return content.replace(/<\/?(\w+)/g, function (match: string, letter: string): string {
    if (capitalizeTags.includes(letter.toLowerCase())) {
      return `<${match[1] === '/' ? '/' : ''}${letter[0].toUpperCase()}${letter.slice(1)}`;
    }

    return match;
  });
}

/**
 * Copies and renames files from the source directory to the target directory.
 *
 * @param {string} srcDir - The source directory.
 * @param {string} targetDir - The target directory.
 */
export function copyAndRenameFiles(srcDir: string, targetDir: string) {
  // Read all files and directories from source directory
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  entries.forEach((entry) => {
    const srcPath = path.join(srcDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      // If entry is a directory, create it in target directory and recurse
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
      }
      copyAndRenameFiles(srcPath, targetPath);
    } else if (entry.isFile()) {
      // Read file content
      let content = fs.readFileSync(srcPath, 'utf8');

      content = content.replace(/{/g, '{');

      content = content.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

      content = capitalizeJsxTags(content);

      // Write content to target directory
      fs.writeFileSync(targetPath, content, 'utf8');

      // If file has .md extension, rename it to .mdx
      if (path.extname(targetPath) === '.md') {
        fs.renameSync(targetPath, `${targetPath.slice(0, -3)}.mdx`);
      }
    }
  });
}

copyAndRenameFiles(SRC_DIR, TARGET_DIR);
