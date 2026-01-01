import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scanMarkdownFiles } from './scanFiles.js';
import { analyzeMetadata } from './analyzeMetadata.js';
import { analyzeLinks } from './analyzeLinks.js';
import { HealthReport, HealthIssue } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main entry point for documentation health analysis
 */
async function main() {
    console.log('🔍 Starting documentation health analysis...\n');

    // Define paths
    const projectRoot = path.resolve(__dirname, '../..');
    const docsDir = path.join(projectRoot, 'markdown', 'docs');
    const outputPath = path.join(projectRoot, 'public', 'docs-health.json');

    // Ensure docs directory exists
    if (!fs.existsSync(docsDir)) {
        console.error(`❌ Documentation directory not found: ${docsDir}`);
        process.exit(1);
    }

    // Scan for markdown files
    console.log(`📂 Scanning: ${docsDir}`);
    const files = scanMarkdownFiles(docsDir);
    console.log(`✓ Found ${files.length} markdown files\n`);

    if (files.length === 0) {
        console.warn('⚠️  No markdown files found');
        process.exit(0);
    }

    // Create a set of all files for link checking
    const allFilesSet = new Set(files);

    // Analyze each file
    const allIssues: HealthIssue[] = [];
    let processedCount = 0;

    console.log('🔎 Analyzing files...');
    for (const file of files) {
        processedCount++;

        // Show progress every 50 files
        if (processedCount % 50 === 0) {
            console.log(`   Processed ${processedCount}/${files.length} files...`);
        }

        // Analyze metadata
        const metadataIssues = analyzeMetadata(file);
        allIssues.push(...metadataIssues);

        // Analyze links
        const linkIssues = analyzeLinks(file, allFilesSet);
        allIssues.push(...linkIssues);
    }

    console.log(`✓ Analysis complete\n`);

    // Calculate summary statistics
    const summary = {
        totalFiles: files.length,
        issues: allIssues.length,
        high: allIssues.filter(i => i.severity === 'high').length,
        medium: allIssues.filter(i => i.severity === 'medium').length,
        low: allIssues.filter(i => i.severity === 'low').length
    };

    // Create health report
    const report: HealthReport = {
        summary,
        issues: allIssues
    };

    // Ensure public directory exists
    const publicDir = path.dirname(outputPath);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write report to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');

    // Print summary
    console.log('📊 Health Report Summary:');
    console.log(`   Total Files: ${summary.totalFiles}`);
    console.log(`   Total Issues: ${summary.issues}`);
    console.log(`   - High: ${summary.high}`);
    console.log(`   - Medium: ${summary.medium}`);
    console.log(`   - Low: ${summary.low}`);
    console.log(`\n✅ Report saved to: ${outputPath}\n`);

    // Exit with error code if there are high severity issues
    if (summary.high > 0) {
        console.warn(`⚠️  Found ${summary.high} high-severity issues`);
    }
}

// Run the analysis
main().catch(error => {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
});
