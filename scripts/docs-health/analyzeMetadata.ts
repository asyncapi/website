import fs from 'fs';
import matter from 'gray-matter';
import { HealthIssue } from './types.js';

/**
 * Analyzes front-matter metadata in markdown files
 * Checks for required fields like title, description, etc.
 * @param filePath - Path to the markdown file
 * @returns Array of issues found
 */
export function analyzeMetadata(filePath: string): HealthIssue[] {
    const issues: HealthIssue[] = [];

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content);

        // Check for required fields
        if (!data.title || data.title.trim() === '') {
            issues.push({
                type: 'missing-title',
                file: filePath,
                message: 'Missing or empty title in front-matter',
                severity: 'high'
            });
        }

        if (!data.description || data.description.trim() === '') {
            issues.push({
                type: 'missing-description',
                file: filePath,
                message: 'Missing or empty description in front-matter',
                severity: 'medium'
            });
        }

        // Check for excessively long titles
        if (data.title && data.title.length > 100) {
            issues.push({
                type: 'long-title',
                file: filePath,
                message: `Title is too long (${data.title.length} characters, recommended max: 100)`,
                severity: 'low'
            });
        }

        // Check for excessively long descriptions
        if (data.description && data.description.length > 200) {
            issues.push({
                type: 'long-description',
                file: filePath,
                message: `Description is too long (${data.description.length} characters, recommended max: 200)`,
                severity: 'low'
            });
        }

    } catch (error) {
        issues.push({
            type: 'parse-error',
            file: filePath,
            message: `Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}`,
            severity: 'high'
        });
    }

    return issues;
}
