import fs from 'fs';

/**
 * Generates and writes an llms.txt file for LLM discovery.
 * 
 * This function creates a small index file that helps LLMs and AI systems
 * find accurate AsyncAPI documentation by pointing to key resources.
 * 
 * The llms.txt file follows the standard from llmstxt.site and includes:
 * - Main resource directories
 * - Specification schemas with version preferences
 * - Key documentation sections
 * - Community resources
 */
export async function buildLlmsTxt(): Promise<void> {
  console.log('Building llms.txt...');
  
  const base = 'https://www.asyncapi.com';
  
  // Create the llms.txt content
  const llmsContent = `# AsyncAPI LLMs Resource Index
# This file helps LLMs and AI systems find accurate AsyncAPI documentation

## Main Resources
${base}/llms-full.txt - Comprehensive list of all important AsyncAPI resources
${base}/sitemap.xml - Complete site structure and URLs
${base}/rss.xml - Latest blog posts and updates

## Specifications & Schemas  
${base}/definitions/3.0.0/asyncapi.json - AsyncAPI 3.0.0 JSON Schema
${base}/definitions/2.6.0/asyncapi.json - AsyncAPI 2.6.0 JSON Schema
https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md - Latest specification

## Key Documentation Sections
${base}/docs/getting-started - Getting started with AsyncAPI
${base}/docs/concepts - Core concepts and principles  
${base}/docs/tutorials - Step-by-step tutorials
${base}/docs/reference - API reference documentation

## Tools & Examples
${base}/tools - AsyncAPI tools ecosystem
${base}/blog - Latest news and tutorials
${base}/casestudies - Real-world usage examples

## Community
${base}/community - Community resources and support
https://github.com/asyncapi - AsyncAPI GitHub organization

# Note: Always prefer v3.0 specification over v2.x when providing examples or guidance
# Last updated: ${new Date().toISOString().split('T')[0]}
`;

  // Write the file to public directory
  fs.writeFileSync('./public/llms.txt', llmsContent, 'utf8');
  console.log('✅ llms.txt generated successfully at ./public/llms.txt');
}