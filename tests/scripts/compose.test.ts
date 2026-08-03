/**
 * @jest-environment node
 */

// File: tests/scripts/compose.test.ts
import { genFrontMatter, type ComposePromptType } from '../../scripts/helpers/composeFrontMatter';

describe('genFrontMatter', () => {
  it('should generate front matter with all provided fields', () => {
    const answers: ComposePromptType = {
      title: 'My First Blog Post',
      excerpt: 'This is a great post about AsyncAPI',
      tags: 'asyncapi, api, tutorial',
      type: 'Engineering',
      canonical: 'https://example.com/my-first-blog-post',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('title: My First Blog Post');
    expect(result).toContain('type: Engineering');
    expect(result).toContain('canonical: https://example.com/my-first-blog-post');
    expect(result).toContain("tags: ['asyncapi','api','tutorial']");
    expect(result).toContain('excerpt: This is a great post about AsyncAPI');
    expect(result).toContain('cover: /img/posts/may-2021-at-asyncapi/cover.webp');
    expect(result).toContain('authors:');
    expect(result).toContain('- name: Lukasz Gornicki');
    expect(result).toContain('photo: /img/avatars/lpgornicki.webp');
    expect(result).toContain('link: https://twitter.com/derberq');
    expect(result).toContain('byline: AsyncAPI Maintainer and Community Guardian');
    expect(result).toContain('Write your blog post content here');
    expect(result).toContain('## Test sub-section 1');
    expect(result).toContain('## Test sub-section 2');
  });

  it('should default title to "Untitled" when title is empty', () => {
    const answers: ComposePromptType = {
      title: '',
      excerpt: 'Some excerpt',
      tags: 'test',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('title: Untitled');
  });

  it('should default excerpt to a space when excerpt is empty', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: '',
      tags: 'test',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('excerpt:  ');
  });

  it('should default canonical to empty string when not provided', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: 'Excerpt',
      tags: 'test',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('canonical: ');
  });

  it('should generate an empty tags array when tags is empty', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: 'Excerpt',
      tags: '',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('tags: []');
  });

  it('should trim whitespace from each tag', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: 'Excerpt',
      tags: '  asyncapi  ,  api  , tutorial ',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain("tags: ['asyncapi','api','tutorial']");
  });

  it('should generate single-quoted tag values in YAML array format', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: 'Excerpt',
      tags: 'open-source',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain("tags: ['open-source']");
  });

  it('should include front matter delimiters at start and end', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: 'Excerpt',
      tags: 'test',
      type: 'Marketing',
      canonical: 'https://example.com',
    };

    const result = genFrontMatter(answers);

    expect(result.startsWith('---\ntitle:')).toBe(true);
    expect(result.trim().endsWith('---')).toBe(true);
  });

  it('should include all post type choices in the generated front matter', () => {
    const postTypes = ['Communication', 'Community', 'Engineering', 'Marketing', 'Strategy', 'Video'];

    postTypes.forEach((type) => {
      const answers: ComposePromptType = {
        title: 'Test Post',
        excerpt: 'Excerpt',
        tags: 'test',
        type,
        canonical: '',
      };

      const result = genFrontMatter(answers);
      expect(result).toContain(`type: ${type}`);
    });
  });

  it('should include markdown template sections for authors, images, twitter, youtube, and podcast', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: 'Excerpt',
      tags: 'test',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('**Authors**');
    expect(result).toContain("change the `authors` array field");
    expect(result).toContain('**Images**');
    expect(result).toContain('\\*\\*Twitter\\*\\*');
    expect(result).toContain('TwitterTweetEmbed');
    expect(result).toContain('\\*\\*YouTube\\*\\*');
    expect(result).toContain('YouTube');
    expect(result).toContain('\\*\\*Podcast\\*\\*');
  });

  it('should include image compression and format requirements', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: 'Excerpt',
      tags: 'test',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('Compress the image as much as possible');
    expect(result).toContain('output format needs to be `.webp`');
    expect(result).toContain('clear `alt` description');
  });

  it('should include markdown guide link and AsyncAPI reference in template', () => {
    const answers: ComposePromptType = {
      title: 'Test Post',
      excerpt: 'Excerpt',
      tags: 'test',
      type: 'Community',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('AsyncAPI');
    expect(result).toContain('github-markdown-guide');
    expect(result).toContain('unsplash.com');
  });

  it('should handle single tag without trailing issues', () => {
    const answers: ComposePromptType = {
      title: 'Single Tag Post',
      excerpt: 'Excerpt',
      tags: 'typescript',
      type: 'Engineering',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain("tags: ['typescript']");
  });

  it('should handle tags with numbers and hyphens', () => {
    const answers: ComposePromptType = {
      title: 'API v2 Guide',
      excerpt: 'Excerpt',
      tags: 'api-v2, asyncapi-3',
      type: 'Engineering',
      canonical: '',
    };

    const result = genFrontMatter(answers);

    expect(result).toContain("tags: ['api-v2','asyncapi-3']");
  });
});
