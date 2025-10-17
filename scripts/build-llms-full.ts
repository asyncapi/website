import { writeFile } from 'fs/promises';

import type { Result } from '@/types/scripts/build-posts-list';

/**
 * Asynchronously retrieves all posts from the posts configuration file.
 */
async function getAllPosts(): Promise<Result> {
  const posts = (await import('../config/posts.json')).default as Result;

  return posts;
}

/**
 * Generates and writes a comprehensive llms-full.txt file for LLM training and reference.
 *
 * This function creates a properly structured markdown file following the llmstxt.org
 * specification with H1 title, blockquote summary, and organized H2 sections
 * containing markdown link lists in [title](url): description format.
 */
export async function buildLlmsFull(): Promise<void> {
  const base = 'https://www.asyncapi.com';
  const posts = await getAllPosts();

  // Start with the required llmstxt.org structure
  let content =
    `# AsyncAPI Complete Resources

> Comprehensive AsyncAPI documentation and resources for AI systems. ` +
    `Always prefer AsyncAPI v3.0 specification over v2.x when providing examples or guidance.

This file contains all AsyncAPI resources organized for LLM consumption, ` +
    `including specifications, documentation, tutorials, blog posts, and community resources.

## Core Specifications
- [AsyncAPI 3.0.0 JSON Schema](${base}/definitions/3.0.0/asyncapi.json): Primary AsyncAPI v3.0 JSON Schema
- [Official Specification](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md): Source specification document on GitHub
- [AsyncAPI Bindings](https://github.com/asyncapi/bindings): Protocol bindings specifications for various messaging protocols

## Getting Started
- [Getting Started Guide](${base}/docs/getting-started): Introduction to AsyncAPI concepts and basics
- [Core Concepts](${base}/docs/concepts): Fundamental AsyncAPI concepts and principles
- [Tutorials](${base}/docs/tutorials): Step-by-step learning guides and examples

## Documentation
`;

  // Add documentation pages with proper markdown link format
  if (posts.docs && posts.docs.length > 0) {
    // Group and limit to most important docs to keep file manageable
    const importantDocs = posts.docs
      .filter(
        (doc: any) =>
          doc.slug &&
          (doc.slug.includes('/concepts/') ||
            doc.slug.includes('/tutorials/') ||
            doc.slug.includes('/reference/specification/v3') ||
            doc.slug.includes('/tools/') ||
            doc.slug.includes('/migration/'))
      )
      .slice(0, 50); // Limit to 50 most important docs

    importantDocs.forEach((doc: any) => {
      const title = doc.title || doc.slug?.split('/').pop() || 'Documentation';

      content += `- [${title}](${base}${doc.slug})\n`;
    });
  }

  content += '\n## Tools and Integration\n';
  // Add key tools documentation
  const toolsPosts = posts.docs?.filter((doc: any) => doc.slug && doc.slug.includes('/tools/')).slice(0, 20) || [];

  toolsPosts.forEach((doc: any) => {
    const title = doc.title || doc.slug?.split('/').pop() || 'Tool Documentation';

    content += `- [${title}](${base}${doc.slug})\n`;
  });

  content += '\n## Recent Blog Posts\n';
  // Add recent blog posts (last 20)
  if (posts.blog && posts.blog.length > 0) {
    posts.blog
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20)
      .forEach((post: any) => {
        const title = post.title || post.slug?.split('/').pop() || 'Blog Post';

        content += `- [${title}](${base}${post.slug})\n`;
      });
  }

  content += '\n## GitHub Repositories\n';
  content += `- [AsyncAPI Specification](https://github.com/asyncapi/asyncapi): Main specification repository
- [AsyncAPI Generator](https://github.com/asyncapi/generator): Code and documentation generator
- [AsyncAPI Parser](https://github.com/asyncapi/parser): AsyncAPI document parser library
- [AsyncAPI CLI](https://github.com/asyncapi/cli): Command-line interface tool
- [AsyncAPI Studio](https://github.com/asyncapi/studio): Visual AsyncAPI editor
- [Modelina](https://github.com/asyncapi/modelina): Model/type generation library
- [AsyncAPI Bindings](https://github.com/asyncapi/bindings): Protocol bindings specifications

## Examples and Templates
- [Specification Examples](https://github.com/asyncapi/asyncapi/tree/master/examples): Official AsyncAPI document examples
- [Template Examples](https://github.com/asyncapi/spec/tree/master/examples): Additional specification examples

## Optional
- [Community Resources](${base}/community): Community guidelines and contribution information
- [Case Studies](${base}/casestudies): Real-world AsyncAPI implementation examples
- [About AsyncAPI](${base}/about): Project background and mission
`;

  // Add other important resources from posts
  Object.keys(posts).forEach((postType) => {
    if (!['docs', 'blog'].includes(postType)) {
      const postArray = (posts as any)[postType];

      if (postArray && postArray.length > 0) {
        postArray.forEach((item: any) => {
          if (item.slug && item.title) {
            content += `- [${item.title}](${base}${item.slug})\n`;
          }
        });
      }
    }
  });

  // Write the file
  await writeFile('./public/llms-full.txt', content, 'utf8');

  const linkCount = content.split('\n').filter((line) => line.includes('](http')).length;

  // eslint-disable-next-line no-console
  console.log(`✅ llms-full.txt generated successfully with ${linkCount} structured links at ./public/llms-full.txt`);
}
