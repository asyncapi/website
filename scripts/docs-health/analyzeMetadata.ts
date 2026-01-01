import fs from 'fs';
import matter from 'gray-matter';
import { HealthIssue } from './types';

export function analyzeMetadata(filePath: string): HealthIssue[] {
    const issues: HealthIssue[] = [];
    const content = fs.readFileSync(filePath, 'utf8');

    try {
        const { data } = matter(content);

        if (!data.title) {
            issues.push({
                type: 'metadata',
                file: filePath,
                message: 'Missing "title" in frontmatter',
                severity: 'high',
            });
        }

        if (!data.description) {
            issues.push({
                type: 'metadata',
                file: filePath,
                message: 'Missing "description" in frontmatter',
                severity: 'medium',
            });
        }

    } catch (e: any) {
        issues.push({
            type: 'metadata',
            file: filePath,
            message: `Failed to parse frontmatter: ${e.message}`,
            severity: 'high',
        });
    }

    return issues;
}
