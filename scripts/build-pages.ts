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
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  } catch (error) {
    console.error(`❌ Error creating directory ${directory}:`, error);
    throw error;
  }
}

try {
  ensureDirectoryExists(TARGET_DIR);
} catch (error) {
  console.error(`❌ Failed to initialize target directory: ${TARGET_DIR}`);
  process.exit(1);
}

/**
 * Capitalizes the first letter of JSX tag names in the provided content if they are in a predefined list.
 *
 * This function scans the input string for opening and closing JSX tags using a regular expression.
 * If a tag's lowercase name is found in the configured list of tags to capitalize, its first character is converted to uppercase.
 *
 * @param content - The string containing JSX elements.
 * @param filePath - The file path for error reporting.
 * @returns The updated content with designated JSX tag names capitalized.
 */
export function capitalizeJsxTags(content: string, filePath?: string): string {
  try {
    return content.replace(/<\/?(\w+)/g, function (match: string, letter: string): string {
      if (capitalizeTags.includes(letter.toLowerCase())) {
        return `<${match[1] === '/' ? '/' : ''}${letter[0].toUpperCase()}${letter.slice(1)}`;
      }

      return match;
    });
  } catch (error) {
    const fileInfo = filePath ? ` in file: ${filePath}` : '';
    console.error(`❌ Error capitalizing JSX tags${fileInfo}:`, error);
    throw error;
  }
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
  let entries;

  try {
    // Read all files and directories from source directory
    entries = fs.readdirSync(srcDir, { withFileTypes: true });
  } catch (error) {
    console.error(`❌ Error reading source directory: ${srcDir}`, error);
    throw error;
  }

  let processedFiles = 0;
  let failedFiles: string[] = [];

  entries.forEach((entry) => {
    const srcPath = path.join(srcDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    try {
      if (entry.isDirectory()) {
        // If entry is a directory, create it in target directory and recurse
        try {
          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
          }
          copyAndRenameFiles(srcPath, targetPath);
        } catch (error) {
          console.error(`❌ Error processing directory: ${srcPath}`, error);
          throw error;
        }
      } else if (entry.isFile()) {
        try {
          // Read file content
          let content: string;
          try {
            content = fs.readFileSync(srcPath, 'utf8');
          } catch (error) {
            console.error(`❌ Error reading file: ${srcPath}`, error);
            throw error;
          }

          // Transform content
          try {
            content = content.replace(/{/g, '{');
          } catch (error) {
            console.error(`❌ Error replacing left curly braces in file: ${srcPath}`, error);
            throw error;
          }

          try {
            content = content.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
          } catch (error) {
            console.error(`❌ Error converting HTML comments to JSX in file: ${srcPath}`, error);
            throw error;
          }

          try {
            content = capitalizeJsxTags(content, srcPath);
          } catch (error) {
            console.error(`❌ Error capitalizing JSX tags in file: ${srcPath}`, error);
            throw error;
          }

          // Write content to target directory
          try {
            fs.writeFileSync(targetPath, content, 'utf8');
          } catch (error) {
            console.error(`❌ Error writing file: ${targetPath}`, error);
            throw error;
          }

          // If file has .md extension, rename it to .mdx
          if (path.extname(targetPath) === '.md') {
            try {
              const mdxPath = `${targetPath.slice(0, -3)}.mdx`;
              fs.renameSync(targetPath, mdxPath);
            } catch (error) {
              console.error(`❌ Error renaming file from .md to .mdx: ${targetPath}`, error);
              throw error;
            }
          }

          processedFiles++;
        } catch (error) {
          failedFiles.push(srcPath);
          console.error(`\n⚠️  Failed to process file: ${srcPath}`);
          console.error(`   Error details:`, error instanceof Error ? error.message : error);
          // Continue processing other files instead of crashing
        }
      }
    } catch (error) {
      // Log the error but continue processing other entries
      console.error(`\n⚠️  Error processing entry: ${srcPath}`);
      console.error(`   Error details:`, error instanceof Error ? error.message : error);
    }
  });

  // Summary logging
  if (failedFiles.length > 0) {
    console.error(`\n⚠️  Build completed with errors:`);
    console.error(`   ✅ Successfully processed: ${processedFiles} files`);
    console.error(`   ❌ Failed: ${failedFiles.length} files`);
    console.error(`\n   Failed files:`);
    failedFiles.forEach((file) => console.error(`   - ${file}`));
  }
}

try {
  console.log(`🚀 Starting build process...`);
  console.log(`   Source directory: ${SRC_DIR}`);
  console.log(`   Target directory: ${TARGET_DIR}\n`);
  
  copyAndRenameFiles(SRC_DIR, TARGET_DIR);
  
  console.log(`\n✅ Build completed successfully!`);
} catch (error) {
  console.error(`\n❌ Build process failed:`, error);
  console.error(`\nPlease check the error messages above for details.`);
  process.exit(1);
}
