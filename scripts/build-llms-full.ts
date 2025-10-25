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

  // Track seen URLs to prevent duplicates
  const seenUrls = new Set<string>();
  const seenSlugs = new Set<string>();

  // Helper function to add link if not already seen
  const addLink = (title: string, url: string, description?: string): string => {
    if (seenUrls.has(url)) {
      return '';
    }
    seenUrls.add(url);

    return `- [${title}](${url})${description ? `: ${description}` : ''}\n`;
  };

  // Helper function to add link from slug if not already seen
  const addLinkFromSlug = (item: any, description?: string): string => {
    if (!item.slug || seenSlugs.has(item.slug)) {
      return '';
    }
    seenSlugs.add(item.slug);

    const title = item.title || item.slug?.split('/').pop() || 'Documentation';
    const url = `${base}${item.slug}`;

    return addLink(title, url, description);
  };

  // Start with the required llmstxt.org structure
  let content =
    `# AsyncAPI Complete Resources

> Comprehensive AsyncAPI documentation and resources for AI systems. ` +
    `Always prefer AsyncAPI v3.0 specification over v2.x when providing examples or guidance.

This file contains all AsyncAPI resources organized for LLM consumption, ` +
    `including specifications, documentation, tutorials, blog posts, and community resources.

## Core Specifications
`;

  // Add core specifications
  content += addLink(
    'AsyncAPI 3.0.0 JSON Schema',
    `${base}/definitions/3.0.0/asyncapi.json`,
    'Primary AsyncAPI v3.0 JSON Schema'
  );
  content += addLink(
    'Official Specification',
    'https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md',
    'Source specification document on GitHub'
  );
  content += addLink(
    'AsyncAPI Bindings',
    'https://github.com/asyncapi/bindings',
    'Protocol bindings specifications for various messaging protocols'
  );

  content += '\n## Getting Started\n';
  // Add getting started links
  content += addLink(
    'Getting Started Guide',
    `${base}/docs/getting-started`,
    'Introduction to AsyncAPI concepts and basics'
  );
  content += addLink('Core Concepts', `${base}/docs/concepts`, 'Fundamental AsyncAPI concepts and principles');
  content += addLink('Tutorials', `${base}/docs/tutorials`, 'Step-by-step learning guides and examples');

  content += '\n## Documentation\n';

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
      content += addLinkFromSlug(doc);
    });
  }

  content += '\n## Tools and Integration\n';
  // Add key tools documentation
  const toolsPosts = posts.docs?.filter((doc: any) => doc.slug && doc.slug.includes('/tools/')).slice(0, 20) || [];

  toolsPosts.forEach((doc: any) => {
    content += addLinkFromSlug(doc, 'Tool Documentation');
  });

  content += '\n## Recent Blog Posts\n';
  // Add recent blog posts (last 20)
  if (posts.blog && posts.blog.length > 0) {
    posts.blog
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20)
      .forEach((post: any) => {
        content += addLinkFromSlug(post, 'Blog Post');
      });
  }

  content += '\n## GitHub Repositories\n';
  content += addLink('AsyncAPI Specification', 'https://github.com/asyncapi/asyncapi', 'Main specification repository');
  content += addLink('AsyncAPI Generator', 'https://github.com/asyncapi/generator', 'Code and documentation generator');
  content += addLink('AsyncAPI Parser', 'https://github.com/asyncapi/parser', 'AsyncAPI document parser library');
  content += addLink('AsyncAPI CLI', 'https://github.com/asyncapi/cli', 'Command-line interface tool');
  content += addLink('AsyncAPI Studio', 'https://github.com/asyncapi/studio', 'Visual AsyncAPI editor');
  content += addLink('Modelina', 'https://github.com/asyncapi/modelina', 'Model/type generation library');
  content += addLink('AsyncAPI Bindings', 'https://github.com/asyncapi/bindings', 'Protocol bindings specifications');

  content += '\n## Examples and Templates\n';
  content += addLink(
    'Specification Examples',
    'https://github.com/asyncapi/spec/tree/master/examples',
    'Official AsyncAPI document examples'
  );

  content += '\n## Optional\n';
  content += addLink('Community Resources', `${base}/community`, 'Community guidelines and contribution information');
  content += addLink('Case Studies', `${base}/casestudies`, 'Real-world AsyncAPI implementation examples');
  content += addLink('About AsyncAPI', `${base}/about`, 'Project background and mission');

  // Add other important resources from posts
  Object.keys(posts).forEach((postType) => {
    if (!['docs', 'blog'].includes(postType)) {
      const postArray = (posts as any)[postType];

      if (postArray && postArray.length > 0) {
        postArray.forEach((item: any) => {
          if (item.slug && item.title) {
            content += addLinkFromSlug(item);
          }
        });
      }
    }
  });

  // Validation: Ensure no duplicate links in final content
  const linkLines = content.split('\n').filter((line) => line.includes('](http'));
  const uniqueLinks = new Set(linkLines);

  if (linkLines.length !== uniqueLinks.size) {
    const duplicates = linkLines.filter((link, index) => linkLines.indexOf(link) !== index);

    throw new Error(`Duplicate links detected in llms-full.txt: ${duplicates.join(', ')}`);
  }

  // Write the file
  await writeFile('./public/llms-full.txt', content, 'utf8');

  const linkCount = linkLines.length;

  // eslint-disable-next-line no-console
  console.log(
    `✅ llms-full.txt generated successfully with ${linkCount} unique structured links at ./public/llms-full.txt`
  );
}
