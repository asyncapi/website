import fs from 'fs';
import path from 'path';

/**
 * Recursively scans a directory for markdown and MDX files
 * @param dir - Directory to scan
 * @param fileList - Accumulated list of files (used for recursion)
 * @returns Array of absolute file paths
 */
export function scanMarkdownFiles(dir: string, fileList: string[] = []): string[] {
    try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);

            try {
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    // Recursively scan subdirectories
                    scanMarkdownFiles(filePath, fileList);
                } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
                    // Add markdown/mdx files to the list
                    fileList.push(filePath);
                }
            } catch (error) {
                // Skip files that can't be accessed
                console.warn(`Warning: Could not access ${filePath}`);
            }
        }
    } catch (error) {
        console.error(`Error scanning directory ${dir}:`, error);
    }

    return fileList;
}
