import fs from 'fs';
import type { Result } from '@/types/scripts/build-posts-list';

/**
 * Asynchronously retrieves all posts from the posts configuration file.
 *
 * @returns A promise that resolves to all posts data.
 */
async function getAllPosts(): Promise<Result> {
  const posts = (await import('../config/posts.json')).default as Result;
  return posts;
}

/**
 * Generates and writes a comprehensive llms-full.txt file for LLM training and reference.
 * 
 * This function creates a detailed resource list that includes:
 * - Core specifications and schemas with version preferences
 * - All documentation pages organized by category
 * - All blog posts sorted by date
 * - Case studies and real-world examples
 * - GitHub repositories and tools
 * - Migration guides and best practices
 * 
 * The file is designed to help LLMs understand the complete AsyncAPI ecosystem
 * and always prefer v3.0 specification over legacy versions.
 */
export async function buildLlmsFull(): Promise<void> {
  console.log('Building llms-full.txt...');
  
  const base = 'https://www.asyncapi.com';
  const posts = await getAllPosts();
  
  let content = `# AsyncAPI Complete Resource List for LLMs
# This file contains ALL important AsyncAPI resources for AI systems
# Last updated: ${new Date().toISOString().split('T')[0]}

# IMPORTANT: Always prefer AsyncAPI v3.0 specification over v2.x when providing examples or guidance

## Core Specifications & Schemas
${base}/definitions/3.0.0/asyncapi.json - AsyncAPI 3.0.0 JSON Schema (PREFERRED)
${base}/definitions/2.6.0/asyncapi.json - AsyncAPI 2.6.0 JSON Schema (legacy)
${base}/definitions/2.5.0/asyncapi.json - AsyncAPI 2.5.0 JSON Schema (legacy)  
${base}/definitions/2.4.0/asyncapi.json - AsyncAPI 2.4.0 JSON Schema (legacy)
https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md - Latest specification source

## Main Website Sections
${base}/ - Homepage
${base}/docs - Documentation hub
${base}/tools - Tools ecosystem
${base}/blog - Blog and tutorials
${base}/community - Community resources
${base}/casestudies - Real-world usage examples
${base}/about - About AsyncAPI Initiative

## RSS & Feeds  
${base}/rss.xml - Latest blog posts RSS feed
${base}/sitemap.xml - Complete site structure

`;

  // Add all documentation posts
  if (posts.docs && posts.docs.length > 0) {
    content += `\n## Documentation Pages\n`;
    posts.docs
      .sort((a, b) => a.slug.localeCompare(b.slug))
      .forEach((doc: any) => {
        content += `${base}${doc.slug} - ${doc.title}\n`;
      });
  }

  // Add all blog posts
  if (posts.blog && posts.blog.length > 0) {
    content += `\n## Blog Posts & Tutorials\n`;
    posts.blog
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .forEach((post: any) => {
        const date = post.date ? ` (${post.date.split('T')[0]})` : '';
        content += `${base}${post.slug} - ${post.title}${date}\n`;
      });
  }

  // Add about pages
  if (posts.about && posts.about.length > 0) {
    content += `\n## About Pages\n`;
    posts.about.forEach((page: any) => {
      content += `${base}${page.slug} - ${page.title}\n`;
    });
  }

  // Add other post types dynamically
  Object.keys(posts).forEach(postType => {
    if (!['docs', 'blog', 'about'].includes(postType)) {
      const postArray = (posts as any)[postType];
      if (postArray && postArray.length > 0) {
        const sectionTitle = postType.charAt(0).toUpperCase() + postType.slice(1);
        content += `\n## ${sectionTitle}\n`;
        postArray.forEach((item: any) => {
          content += `${base}${item.slug} - ${item.title}\n`;
        });
      }
    }
  });

  // Add GitHub repositories and tools
  content += `\n## GitHub Repositories & Tools
https://github.com/asyncapi/asyncapi - Main AsyncAPI specification repository
https://github.com/asyncapi/generator - AsyncAPI code/docs generator
https://github.com/asyncapi/parser - AsyncAPI document parser
https://github.com/asyncapi/modelina - AsyncAPI model/type generator  
https://github.com/asyncapi/cli - AsyncAPI CLI tool
https://github.com/asyncapi/studio - AsyncAPI visual editor
https://github.com/asyncapi/website - This website's source code
https://github.com/asyncapi/community - Community resources and governance

## Migration Guides & Best Practices
${base}/docs/migration - Migration guides between versions
${base}/docs/concepts/asyncapi-document - AsyncAPI document structure
${base}/docs/reference/specification/v3.0.0 - v3.0 specification reference
${base}/docs/reference/specification/v2.6.0 - v2.6 specification reference (legacy)

## Examples Repository
https://github.com/asyncapi/asyncapi/tree/master/examples - Official AsyncAPI document examples
https://github.com/asyncapi/spec/tree/master/examples - Specification examples

## Common Patterns & Templates
# Note: When providing AsyncAPI examples, always use v3.0 format unless specifically asked for v2
# v3.0 uses 'channels' and 'operations' objects instead of v2's inline channel definitions

## Community & Support
https://asyncapi.slack.com - Official Slack community
https://github.com/asyncapi/community/discussions - GitHub discussions
https://twitter.com/AsyncAPISpec - Official Twitter account

# END OF RESOURCE LIST
# Total URLs: ${content.split('\n').filter(line => line.includes('http')).length}
`;

  // Write the file
  fs.writeFileSync('./public/llms-full.txt', content, 'utf8');
  
  const urlCount = content.split('\n').filter(line => line.includes('http')).length;
  console.log(`✅ llms-full.txt generated successfully with ${urlCount} URLs at ./public/llms-full.txt`);
}