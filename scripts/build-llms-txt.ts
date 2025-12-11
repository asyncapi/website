import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

/**
 * Generates LLM-friendly documentation files following the llms.txt standard.
 * This includes:
 * - /llms.txt - A concise markdown index of key documentation
 * - /llms-full.txt - An expanded version with all linked content
 * 
 * Standard: https://llmstxt.org/
 */

const WEBSITE_BASE = 'https://www.asyncapi.com';
const PUBLIC_DIR = './public';
const DOCS_DIR = './markdown/docs';
const CONFIG_DIR = './config';

interface LLMSection {
    title: string;
    items: Array<{
        title: string;
        url: string;
        description?: string;
    }>;
}

/**
 * Main llms.txt content structure.
 * This follows the llms.txt spec with clear sections for LLM consumption.
 */
function generateLLMSTxt(): string {
    const sections: LLMSection[] = [
        {
            title: 'Core Specification',
            items: [
                {
                    title: 'AsyncAPI v3.0.0 Specification',
                    url: `${WEBSITE_BASE}/docs/reference/specification/v3.0.0`,
                    description: 'The official AsyncAPI v3 specification - use this for generating v3 documents'
                },
                {
                    title: 'Migrating to v3',
                    url: `${WEBSITE_BASE}/docs/migration/migrating-to-v3`,
                    description: 'Key differences between AsyncAPI v2 and v3, critical for understanding version changes'
                }
            ]
        },
        {
            title: 'Getting Started',
            items: [
                {
                    title: 'AsyncAPI Introduction',
                    url: `${WEBSITE_BASE}/docs`,
                    description: 'Overview of AsyncAPI and Event-Driven Architectures'
                },
                {
                    title: 'Create AsyncAPI Document',
                    url: `${WEBSITE_BASE}/docs/tutorials/create-asyncapi-document`,
                    description: 'Tutorial on creating your first AsyncAPI document'
                }
            ]
        },
        {
            title: 'Core Concepts',
            items: [
                {
                    title: 'Application',
                    url: `${WEBSITE_BASE}/docs/concepts/application`,
                    description: 'Understanding AsyncAPI applications'
                },
                {
                    title: 'Channel',
                    url: `${WEBSITE_BASE}/docs/concepts/channel`,
                    description: 'Understanding channels in AsyncAPI'
                },
                {
                    title: 'Message',
                    url: `${WEBSITE_BASE}/docs/concepts/message`,
                    description: 'Understanding messages in AsyncAPI'
                },
                {
                    title: 'Server',
                    url: `${WEBSITE_BASE}/docs/concepts/server`,
                    description: 'Understanding servers in AsyncAPI'
                },
                {
                    title: 'Protocol',
                    url: `${WEBSITE_BASE}/docs/concepts/protocol`,
                    description: 'Understanding protocols in AsyncAPI'
                }
            ]
        },
        {
            title: 'Tutorials',
            items: [
                {
                    title: 'Streetlights Interactive Tutorial',
                    url: `${WEBSITE_BASE}/docs/tutorials/streetlights-interactive`,
                    description: 'Interactive tutorial using the streetlights example'
                },
                {
                    title: 'Message Validation',
                    url: `${WEBSITE_BASE}/docs/tutorials/message-validation`,
                    description: 'How to validate AsyncAPI messages'
                },
                {
                    title: 'Generate Code',
                    url: `${WEBSITE_BASE}/docs/tutorials/generate-code`,
                    description: 'Code generation from AsyncAPI documents'
                }
            ]
        },
        {
            title: 'Tools',
            items: [
                {
                    title: 'AsyncAPI Tools',
                    url: `${WEBSITE_BASE}/docs/tools`,
                    description: 'Overview of available AsyncAPI tools and generators'
                }
            ]
        },
        {
            title: 'Optional',
            items: [
                {
                    title: 'AsyncAPI v2.x Specification',
                    url: `${WEBSITE_BASE}/docs/reference/specification/v2`,
                    description: 'Legacy v2 specification (use v3 for new documents)'
                },
                {
                    title: 'Community',
                    url: `${WEBSITE_BASE}/docs/community`,
                    description: 'AsyncAPI community resources and contribution guidelines'
                }
            ]
        }
    ];

    let content = '# AsyncAPI\n\n';
    content += '> AsyncAPI is an open-source specification for defining and documenting event-driven and message-driven APIs.\n\n';
    content += 'AsyncAPI provides a standard way to describe asynchronous APIs similar to how OpenAPI/Swagger describes REST APIs. ';
    content += 'It supports multiple protocols including AMQP, MQTT, WebSockets, Kafka, and more.\n\n';
    content += '**IMPORTANT for LLMs**: When generating AsyncAPI documents, always use the v3.0.0 specification. ';
    content += 'Do NOT generate v2 documents and call them v3. The v2 and v3 specifications have significant differences, ';
    content += 'especially in how channels, operations, and messages are structured.\n\n';

    // Add each section
    for (const section of sections) {
        content += `## ${section.title}\n\n`;
        for (const item of section.items) {
            content += `- [${item.title}](${item.url})`;
            if (item.description) {
                content += `: ${item.description}`;
            }
            content += '\n';
        }
        content += '\n';
    }

    return content;
}

/**
 * Generates llms-full.txt by expanding the llms.txt content.
 * This is a simplified version - in production, this would fetch and include
 * the full content of all linked pages.
 */
function generateLLMSFullTxt(llmsTxt: string): string {
    let content = llmsTxt;
    content += '\n---\n\n';
    content += '# Additional Context\n\n';
    content += 'This file contains the same information as llms.txt. ';
    content += 'In a full implementation, this would include the complete content of all linked documentation pages.\n\n';
    content += 'Key points for AsyncAPI v3:\n\n';
    content += '1. **Operations are decoupled from channels**: In v3, operations (send/receive) are separate from channel definitions\n';
    content += '2. **Use "send" and "receive" instead of "publish" and "subscribe"**: The action property now clearly indicates what your application does\n';
    content += '3. **Channel addresses**: The channel key is now an arbitrary ID, and the actual address/topic/path is in the "address" property\n';
    content += '4. **Messages object**: Channels use a "messages" object (plural) instead of a single "message" property\n';
    content += '5. **Server URL structure**: URLs are split into "host", "pathname", and "protocol" properties\n';
    content += '6. **Metadata location**: "tags" and "externalDocs" are now inside the "info" object\n\n';
    content += 'Always refer to the AsyncAPI v3.0.0 specification when generating or validating AsyncAPI documents.\n';

    return content;
}

/**
 * Copies the AsyncAPI JSON schema to the public schemas directory.
 */
async function copySchemas() {
    const schemasDir = path.join(PUBLIC_DIR, 'schemas');

    // Create schemas directory if it doesn't exist
    await fs.mkdir(schemasDir, { recursive: true });

    // Copy v3 schema
    const v3SchemaSource = path.join(CONFIG_DIR, '3.0.0.json');
    const v3SchemaDest = path.join(schemasDir, '3.0.0.json');

    if (existsSync(v3SchemaSource)) {
        await fs.copyFile(v3SchemaSource, v3SchemaDest);
        console.log('✓ Copied AsyncAPI v3.0.0 JSON schema');
    } else {
        console.warn('⚠ Could not find 3.0.0.json schema');
    }
}

/**
 * Main function to generate all LLM-friendly files.
 */
async function main() {
    try {
        console.log('Generating LLM-friendly documentation files...\n');

        // Generate llms.txt
        const llmsTxt = generateLLMSTxt();
        await fs.writeFile(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf-8');
        console.log('✓ Generated llms.txt');

        // Generate llms-full.txt
        const llmsFullTxt = generateLLMSFullTxt(llmsTxt);
        await fs.writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt, 'utf-8');
        console.log('✓ Generated llms-full.txt');

        // Copy JSON schemas
        await copySchemas();

        console.log('\n✅ All LLM documentation files generated successfully!');
        console.log('\nGenerated files:');
        console.log('  - public/llms.txt');
        console.log('  - public/llms-full.txt');
        console.log('  - public/schemas/3.0.0.json');
        console.log('\nNext steps:');
        console.log('  1. Test llms.txt format compliance');
        console.log('  2. Submit to https://llmstxt.site/');
        console.log('  3. Submit to https://directory.llmstxt.cloud/');
    } catch (error) {
        console.error('Error generating LLM documentation files:', error);
        process.exit(1);
    }
}

main();
