import fs from 'fs';
import path from 'path';

export function scanFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);

    files.forEach((file: string) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

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
