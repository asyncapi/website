import fs from 'fs/promises';
import path from 'path';

/**
 * Validates that llms.txt follows the official llms.txt specification.
 * Spec: https://llmstxt.org/
 */

const PUBLIC_DIR = './public';

interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}

/**
 * Validates llms.txt format according to the specification.
 */
async function validateLLMSTxt(): Promise<ValidationResult> {
    const result: ValidationResult = {
        valid: true,
        errors: [],
        warnings: []
    };

    try {
        const filePath = path.join(PUBLIC_DIR, 'llms.txt');
        const content = await fs.readFile(filePath, 'utf-8');
        const lines = content.split('\n');

        // Check 1: Must start with H1 header
        if (!lines[0]?.startsWith('# ')) {
            result.valid = false;
            result.errors.push('File must start with an H1 header (# Title)');
        }

        // Check 2: Must have a blockquote description
        const blockquoteIndex = lines.findIndex(line => line.startsWith('>'));
        if (blockquoteIndex === -1) {
            result.valid = false;
            result.errors.push('File must contain a blockquote description (> Description)');
        }

        // Check 3: Check for H2 sections
        const h2Sections = lines.filter(line => line.startsWith('## '));
        if (h2Sections.length === 0) {
            result.warnings.push('No H2 sections found - consider organizing content into sections');
        }

        // Check 4: Validate markdown link format
        const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
        let hasLinks = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const matches = [...line.matchAll(linkPattern)];

            if (matches.length > 0) {
                hasLinks = true;

                for (const match of matches) {
                    const url = match[2];

                    // Check if links are properly formatted
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        result.warnings.push(`Line ${i + 1}: Link URL should be absolute: ${url}`);
                    }
                }
            }
        }

        if (!hasLinks) {
            result.warnings.push('No markdown links found - llms.txt should contain links to documentation');
        }

        // Check 5: Look for "Optional" section
        const hasOptionalSection = lines.some(line => line.trim() === '## Optional');
        if (!hasOptionalSection) {
            result.warnings.push('Consider adding an "Optional" section for secondary resources');
        }

        // Check 6: Validate structure (list items after H2)
        let inSection = false;
        let currentSection = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('## ')) {
                inSection = true;
                currentSection = line;
            } else if (inSection && line.trim() && !line.startsWith('- ') && !line.startsWith('>') && !line.startsWith('#')) {
                // Allow plain text between H2 and list items
                if (i + 1 < lines.length && !lines[i + 1].startsWith('- ') && lines[i + 1].trim()) {
                    // Multiple lines of text after H2 without list items might be an issue
                    result.warnings.push(`Section "${currentSection}" should contain markdown list items`);
                    inSection = false;
                }
            }
        }

    } catch (error) {
        result.valid = false;
        result.errors.push(`Failed to read llms.txt: ${(error as Error).message}`);
    }

    return result;
}

/**
 * Validates that all required files exist.
 */
async function validateGeneratedFiles(): Promise<ValidationResult> {
    const result: ValidationResult = {
        valid: true,
        errors: [],
        warnings: []
    };

    const requiredFiles = [
        'llms.txt',
        'llms-full.txt',
        'sitemap.xml',
        'schemas/3.0.0.json'
    ];

    for (const file of requiredFiles) {
        const filePath = path.join(PUBLIC_DIR, file);
        try {
            await fs.access(filePath);
            console.log(`✓ ${file} exists`);
        } catch {
            result.valid = false;
            result.errors.push(`Required file not found: ${file}`);
        }
    }

    return result;
}

/**
 * Main validation function.
 */
async function main() {
    console.log('Validating LLM documentation files...\n');

    // Validate file existence
    console.log('Checking for required files:');
    const fileResult = await validateGeneratedFiles();
    console.log('');

    // Validate llms.txt format
    console.log('Validating llms.txt format:');
    const formatResult = await validateLLMSTxt();

    // Print results
    console.log('\n' + '='.repeat(50));

    if (formatResult.errors.length > 0) {
        console.log('\n❌ ERRORS:');
        formatResult.errors.forEach(err => console.log(`  - ${err}`));
    }

    if (formatResult.warnings.length > 0) {
        console.log('\n⚠️  WARNINGS:');
        formatResult.warnings.forEach(warn => console.log(`  - ${warn}`));
    }

    if (fileResult.errors.length > 0) {
        console.log('\n❌ MISSING FILES:');
        fileResult.errors.forEach(err => console.log(`  - ${err}`));
    }

    const allValid = fileResult.valid && formatResult.valid;

    if (allValid) {
        console.log('\n✅ All validations passed!');
        console.log('\nYour llms.txt file is compliant with the llms.txt specification.');
        console.log('\nNext steps:');
        console.log('  1. Submit to https://llmstxt.site/');
        console.log('  2. Submit to https://directory.llmstxt.cloud/');
        console.log('  3. Test with an LLM to verify it generates correct AsyncAPI v3 documents');
    } else {
        console.log('\n❌ Validation failed!');
        console.log('Please fix the errors above before deploying.');
        process.exit(1);
    }
}

main();
