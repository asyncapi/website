import type { PathLike } from 'fs';
import fs from 'fs';
import path from 'path';

const SRC_DIR = 'markdown';
const TARGET_DIR = 'pages';

const capitalizeTags = ['table', 'tr', 'td', 'th', 'thead', 'tbody'];

/**
 * Ensures that the specified directory exists. If it doesn't, creates it.
 * @param {PathLike} directory - The directory path to check or create.
 */
export function ensureDirectoryExists(directory: PathLike) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}
ensureDirectoryExists(TARGET_DIR);

/**
 * Capitalizes the first letter of JSX tag names in the provided content if they are in a predefined list.
 *
 * This function scans the input string for opening and closing JSX tags using a regular expression.
 * If a tag's lowercase name is found in the configured list of tags to capitalize, its first character is converted to uppercase.
 *
 * @param content - The string containing JSX elements.
 * @returns The updated content with designated JSX tag names capitalized.
 */
export function capitalizeJsxTags(content: string): string {
  return content.replace(/<\/?(\w+)/g, function (match: string, letter: string): string {
    if (capitalizeTags.includes(letter.toLowerCase())) {
      return `<${match[1] === '/' ? '/' : ''}${letter[0].toUpperCase()}${letter.slice(1)}`;
    }

    return match;
  });
}

/**
 * Recursively copies files and directories from the source to the target directory with content transformations.
 *
 * The function processes each entry found in the source directory. For files, it transforms the content by converting HTML comments into JSX comments and capitalizing specific JSX tags. After transformation, the content is written to the target directory. Files with a '.md' extension are renamed to use the '.mdx' extension. For directories, a corresponding directory is created in the target if it doesn't exist, and the function is called recursively.
 *
 * @param srcDir - The path to the source directory containing files and subdirectories.
 * @param targetDir - The path to the target directory where transformed files and directories are written.
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
