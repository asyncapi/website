import fs from 'fs';
import path from 'path';

export function scanFiles(dir: string, fileList: string[] = []): string[] {
    let files: string[];
    try {
        files = fs.readdirSync(dir);
    } catch (error) {
        console.warn(`⚠ Cannot read directory ${dir}: ${error instanceof Error ? error.message : 'unknown error'}`);
        return fileList;
    }

    files.forEach((file: string) => {
        const filePath = path.join(dir, file);
        let stat;
        try {
            stat = fs.statSync(filePath);
        } catch (error) {
            console.warn(`⚠ Cannot stat ${filePath}: ${error instanceof Error ? error.message : 'unknown error'}`);
            return;
        }

        if (stat.isDirectory()) {
            scanFiles(filePath, fileList);
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}
