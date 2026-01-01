import fs from 'fs';
import path from 'path';
import { HealthIssue } from './types';

// Simple regex to catch [text](link)
const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

export function analyzeLinks(filePath: string, allFiles: string[]): HealthIssue[] {
    const issues: HealthIssue[] = [];
    const content = fs.readFileSync(filePath, 'utf8');
    const dir = path.dirname(filePath);

    let match;
    while ((match = LINK_REGEX.exec(content)) !== null) {
        const link = match[2];

        // Skip external links, anchors, and mailto
        if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) {
            continue;
        }

        // Skip images for now (often processed differently)
        if (match[0].startsWith('!')) {
            continue;
        }

        // Resolve path
        // If it starts with /, it's relative to root (often public or pages) - simplified check
        // We mainly check relative paths for now or existing files

        // NOTE: This is a simplified checker. 
        // It checks if the file exists on disk if it looks like a relative file path.
        // It does not perfectly handle Next.js routing (e.g. /docs/something mapping to markdown/docs/something.md)
        // For this requirement "Align with existing tooling", we'll do a basic check for broken relative file links
        // or obvious missing internal references if possible.

        // However, the constraint is "Analyze markdown / mdx documentation".
        // Many links in docs go to other docs.
        // e.g. [foo](./bar.md) or [foo](../baz)

        // Let's implement a basic check: if it ends in .md/.mdx, check file existence.
        // If it doesn't end in extension, it might be a route. We'll skip route checking for now 
        // to avoid false positives unless we map routes to files, which is complex.
        // The requirement says "detect broken internal markdown links".

        if (link.endsWith('.md') || link.endsWith('.mdx')) {
            let absolutePath;
            if (link.startsWith('/')) {
                // content root assumption? or public? 
                // Often in these repos / references root. 
                // But scanned files are in e:\website\markdown
                // Let's assume relative to current file if using ./ or ../
                // If starting with /, skip for now as it's ambiguous without project root context
                continue;
            } else {
                absolutePath = path.resolve(dir, link);
            }

            if (!fs.existsSync(absolutePath)) {
                issues.push({
                    type: 'broken-link',
                    file: filePath,
                    message: `Broken internal link: ${link}`,
                    severity: 'medium',
                });
            }
        }
    }

    return issues;
}
