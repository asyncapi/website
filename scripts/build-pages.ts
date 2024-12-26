import fs from 'fs';
import path from 'path';

const SRC_DIR = 'markdown';
const TARGET_DIR = 'pages';

const capitalizeTags = ['table', 'tr', 'td', 'th', 'thead', 'tbody'];

// Check if target directory doesn't exist then create it
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

export function capitalizeJsxTags(content: string) {
  return content.replace(/<\/?(\w+)/g, function (match: string, letter: string): string {
    if (capitalizeTags.includes(letter.toLowerCase())) {
      return `<${match[1] === '/' ? '/' : ''}${letter[0].toUpperCase()}${letter.slice(1)}`;
    }

    return match;
  });
}

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