import fs from 'fs';
import path from 'path';
import { HealthIssue } from './types.js';

/**
 * Analyzes internal markdown links in a file
 * Checks if linked files exist
 * @param filePath - Path to the markdown file
 * @param allFiles - Set of all markdown files for reference checking
 * @returns Array of issues found
 */
export function analyzeLinks(filePath: string, allFiles: Set<string>): HealthIssue[] {
    const issues: HealthIssue[] = [];

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const fileDir = path.dirname(filePath);

        // Match markdown links: [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;

        while ((match = linkRegex.exec(content)) !== null) {
            const linkUrl = match[2];

            // Skip external links (http/https), anchors, and mailto links
            if (
                linkUrl.startsWith('http://') ||
                linkUrl.startsWith('https://') ||
                linkUrl.startsWith('#') ||
                linkUrl.startsWith('mailto:')
            ) {
                continue;
            }

            // Remove anchor from link
            const linkWithoutAnchor = linkUrl.split('#')[0];

            if (!linkWithoutAnchor) {
                // This is just an anchor link, skip
                continue;
            }

            // Resolve the link relative to the current file
            const resolvedPath = path.resolve(fileDir, linkWithoutAnchor);

            // Check if the file exists
            if (!fs.existsSync(resolvedPath)) {
                // Also check if it exists in the set of all markdown files
                const normalizedPath = path.normalize(resolvedPath);
                const existsInSet = Array.from(allFiles).some(f =>
                    path.normalize(f) === normalizedPath ||
                    path.normalize(f) === normalizedPath + '.md' ||
                    path.normalize(f) === normalizedPath + '.mdx'
                );

                if (!existsInSet) {
                    issues.push({
                        type: 'broken-link',
                        file: filePath,
                        message: `Broken internal link: ${linkUrl}`,
                        severity: 'medium'
                    });
                }
            }
        }
    } catch (error) {
        issues.push({
            type: 'link-analysis-error',
            file: filePath,
            message: `Failed to analyze links: ${error instanceof Error ? error.message : 'Unknown error'}`,
            severity: 'low'
        });
    }

    return issues;
}
