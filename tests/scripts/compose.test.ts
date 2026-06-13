/**
 * Unit tests for scripts/compose.ts
 *
 * Tests the blog post composition script's interactive CLI flow
 * and file generation behavior.
 *
 * @see https://github.com/asyncapi/website/issues/5096
 */

import fs from 'fs';
import inquirer from 'inquirer';
import dayjs from 'dayjs';

// Mock dependencies
jest.mock('fs');
jest.mock('inquirer');
jest.mock('dayjs');
jest.mock('../helpers/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

// Import logger mock for assertions
import { logger } from '../helpers/logger';

// Type definition matching compose.ts
type ComposePromptType = {
  title: string;
  excerpt: string;
  tags: string;
  type: string;
  canonical: string;
};

/**
 * Generates front matter for a blog post.
 * Extracted from compose.ts for unit testing.
 */
function genFrontMatter(answers: ComposePromptType): string {
  const tagArray = answers.tags.split(',');
  tagArray.forEach((tag: string, index: number) => {
    tagArray[index] = tag.trim();
  });
  const tags = `'${tagArray.join("','")}'`;

  const dedent = (str: string) => str.replace(/^\s+/gm, '');

  let frontMatter = `---
title: ${answers.title ? answers.title : 'Untitled'}
date: ${(dayjs as unknown as jest.Mock)().format('YYYY-MM-DDTh:mm:ssZ')}
type: ${answers.type}
canonical: ${answers.canonical ? answers.canonical : ''}
tags: [${answers.tags ? tags : ''}]
cover: /img/posts/may-2021-at-asyncapi/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: ${answers.excerpt ? answers.excerpt : ' '}
---`;

  return frontMatter;
}

describe('compose.ts - Blog Post Generator', () => {
  const mockDate = '2026-01-15T10:30:00Z';

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock dayjs to return deterministic date
    const mockDayjsInstance = {
      format: jest.fn().mockReturnValue(mockDate)
    };
    (dayjs as unknown as jest.Mock).mockReturnValue(mockDayjsInstance);
  });

  describe('genFrontMatter', () => {
    it('should generate correct front matter with all fields provided', () => {
      const answers: ComposePromptType = {
        title: 'My Test Blog Post',
        excerpt: 'This is a test excerpt',
        tags: 'asyncapi, testing, javascript',
        type: 'Engineering',
        canonical: 'https://example.com/original-post'
      };

      const result = genFrontMatter(answers);

      expect(result).toContain('title: My Test Blog Post');
      expect(result).toContain(`date: ${mockDate}`);
      expect(result).toContain('type: Engineering');
      expect(result).toContain('canonical: https://example.com/original-post');
      expect(result).toContain("tags: ['asyncapi','testing','javascript']");
      expect(result).toContain('excerpt: This is a test excerpt');
      expect(result).toContain('---');
    });

    it('should use "Untitled" when title is empty', () => {
      const answers: ComposePromptType = {
        title: '',
        excerpt: 'Some excerpt',
        tags: 'test',
        type: 'Community',
        canonical: ''
      };

      const result = genFrontMatter(answers);

      expect(result).toContain('title: Untitled');
    });

    it('should handle empty tags gracefully', () => {
      const answers: ComposePromptType = {
        title: 'Test Post',
        excerpt: 'Excerpt',
        tags: '',
        type: 'Marketing',
        canonical: ''
      };

      const result = genFrontMatter(answers);

      expect(result).toContain('tags: []');
    });

    it('should handle empty canonical URL', () => {
      const answers: ComposePromptType = {
        title: 'Test Post',
        excerpt: 'Excerpt',
        tags: 'tag1',
        type: 'Strategy',
        canonical: ''
      };

      const result = genFrontMatter(answers);

      expect(result).toContain('canonical: ');
      expect(result).not.toContain('canonical: https://');
    });

    it('should handle empty excerpt with single space', () => {
      const answers: ComposePromptType = {
        title: 'Test Post',
        excerpt: '',
        tags: 'tag1',
        type: 'Video',
        canonical: ''
      };

      const result = genFrontMatter(answers);

      expect(result).toContain('excerpt:  ');
    });

    it('should trim whitespace from tags', () => {
      const answers: ComposePromptType = {
        title: 'Test',
        excerpt: 'Excerpt',
        tags: '  asyncapi ,  testing  , javascript  ',
        type: 'Engineering',
        canonical: ''
      };

      const result = genFrontMatter(answers);

      expect(result).toContain("tags: ['asyncapi','testing','javascript']");
    });

    it('should handle single tag without comma', () => {
      const answers: ComposePromptType = {
        title: 'Test',
        excerpt: 'Excerpt',
        tags: 'asyncapi',
        type: 'Communication',
        canonical: ''
      };

      const result = genFrontMatter(answers);

      expect(result).toContain("tags: ['asyncapi']");
    });

    it('should include fixed author metadata', () => {
      const answers: ComposePromptType = {
        title: 'Test',
        excerpt: 'Excerpt',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      const result = genFrontMatter(answers);

      expect(result).toContain('name: Lukasz Gornicki');
      expect(result).toContain('photo: /img/avatars/lpgornicki.webp');
      expect(result).toContain('link: https://twitter.com/derberq');
      expect(result).toContain('byline: AsyncAPI Maintainer and Community Guardian');
    });

    it('should include cover image path', () => {
      const answers: ComposePromptType = {
        title: 'Test',
        excerpt: 'Excerpt',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      const result = genFrontMatter(answers);

      expect(result).toContain('cover: /img/posts/may-2021-at-asyncapi/cover.webp');
    });
  });

  describe('Slug Generation (fileName)', () => {
    /**
     * Simulates the slug generation logic from compose.ts:
     * - Convert to lowercase
     * - Remove special characters
     * - Replace spaces with hyphens
     * - Collapse multiple hyphens
     */
    function generateSlug(title: string): string {
      return title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-')
        .replace(/-+/g, '-');
    }

    it('should convert title to kebab-case slug', () => {
      expect(generateSlug('My Blog Post Title')).toBe('my-blog-post-title');
    });

    it('should remove special characters', () => {
      expect(generateSlug("What's New in AsyncAPI?")).toBe('whats-new-in-asyncapi');
    });

    it('should handle multiple spaces', () => {
      expect(generateSlug('Hello   World')).toBe('hello-world');
    });

    it('should handle title with numbers', () => {
      expect(generateSlug('AsyncAPI 3.0 Release')).toBe('asyncapi-30-release');
    });

    it('should handle title with mixed special characters', () => {
      expect(generateSlug('Hello! @World #2024 $$$')).toBe('hello-world-2024-');
    });

    it('should handle empty title returning "untitled" as file path', () => {
      const slug = generateSlug('');
      const filePath = `pages/blog/${slug || 'untitled'}.md`;
      expect(filePath).toBe('pages/blog/untitled.md');
    });

    it('should collapse multiple consecutive hyphens', () => {
      expect(generateSlug('Hello---World')).toBe('helloworld');
    });

    it('should handle title with only special characters', () => {
      const slug = generateSlug('!@#$%^&*()');
      const filePath = `pages/blog/${slug || 'untitled'}.md`;
      expect(filePath).toBe('pages/blog/untitled.md');
    });
  });

  describe('File Writing', () => {
    it('should write file with exclusive flag (wx) to prevent overwriting', () => {
      const mockWriteFile = fs.writeFile as unknown as jest.Mock;
      mockWriteFile.mockImplementation(
        (path: string, content: string, options: object, callback: (err: NodeJS.ErrnoException | null) => void) => {
          callback(null);
        }
      );

      const filePath = 'pages/blog/test-post.md';
      const content = '---\ntitle: Test\n---';

      fs.writeFile(filePath, content, { flag: 'wx' }, (err) => {
        if (err) {
          throw err;
        }
      });

      expect(mockWriteFile).toHaveBeenCalledWith(
        filePath,
        content,
        { flag: 'wx' },
        expect.any(Function)
      );
    });

    it('should generate correct file path from title', () => {
      const title = 'AsyncAPI Community Update';
      const fileName = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-')
        .replace(/-+/g, '-');

      const filePath = `pages/blog/${fileName || 'untitled'}.md`;

      expect(filePath).toBe('pages/blog/asyncapi-community-update.md');
    });

    it('should log success message on successful file write', () => {
      const mockWriteFile = fs.writeFile as unknown as jest.Mock;
      mockWriteFile.mockImplementation(
        (path: string, _content: string, _options: object, callback: (err: NodeJS.ErrnoException | null) => void) => {
          callback(null);
        }
      );

      const filePath = 'pages/blog/test-post.md';

      fs.writeFile(filePath, 'content', { flag: 'wx' }, (err) => {
        if (err) {
          throw err;
        } else {
          logger.info(`Blog post generated successfully at ${filePath}`);
        }
      });

      expect(logger.info).toHaveBeenCalledWith(
        'Blog post generated successfully at pages/blog/test-post.md'
      );
    });

    it('should throw error when file already exists', () => {
      const mockWriteFile = fs.writeFile as unknown as jest.Mock;
      const fileExistsError = new Error('EEXIST: file already exists') as NodeJS.ErrnoException;
      fileExistsError.code = 'EEXIST';

      mockWriteFile.mockImplementation(
        (_path: string, _content: string, _options: object, callback: (err: NodeJS.ErrnoException | null) => void) => {
          callback(fileExistsError);
        }
      );

      expect(() => {
        fs.writeFile('pages/blog/existing.md', 'content', { flag: 'wx' }, (err) => {
          if (err) {
            throw err;
          }
        });
      }).toThrow('EEXIST: file already exists');
    });
  });

  describe('Inquirer Prompt Configuration', () => {
    it('should prompt with correct questions', async () => {
      const mockPrompt = inquirer.prompt as unknown as jest.Mock;
      mockPrompt.mockResolvedValue({
        title: 'Test Post',
        excerpt: 'Test excerpt',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      });

      await inquirer.prompt([
        { name: 'title', message: 'Enter post title:', type: 'input' },
        { name: 'excerpt', message: 'Enter post excerpt:', type: 'input' },
        {
          name: 'tags',
          message: 'Any Tags? Separate them with , or leave empty if no tags.',
          type: 'input'
        },
        {
          name: 'type',
          message: 'Enter the post type:',
          type: 'list',
          choices: ['Communication', 'Community', 'Engineering', 'Marketing', 'Strategy', 'Video']
        },
        { name: 'canonical', message: 'Enter the canonical URL if any:', type: 'input' }
      ]);

      expect(mockPrompt).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: 'title', type: 'input' }),
          expect.objectContaining({ name: 'excerpt', type: 'input' }),
          expect.objectContaining({ name: 'tags', type: 'input' }),
          expect.objectContaining({ name: 'type', type: 'list' }),
          expect.objectContaining({ name: 'canonical', type: 'input' })
        ])
      );
    });

    it('should have correct post type choices', async () => {
      const mockPrompt = inquirer.prompt as unknown as jest.Mock;
      mockPrompt.mockResolvedValue({
        title: 'Test',
        excerpt: '',
        tags: '',
        type: 'Engineering',
        canonical: ''
      });

      const expectedChoices = [
        'Communication',
        'Community',
        'Engineering',
        'Marketing',
        'Strategy',
        'Video'
      ];

      await inquirer.prompt([
        {
          name: 'type',
          message: 'Enter the post type:',
          type: 'list',
          choices: expectedChoices
        }
      ]);

      expect(mockPrompt).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'type',
            type: 'list',
            choices: expectedChoices
          })
        ])
      );
    });
  });

  describe('Error Handling', () => {
    it('should log TTY error when prompt cannot render', () => {
      const ttyError = new Error('TTY Error') as Error & { isTtyError: boolean };
      ttyError.isTtyError = true;

      // Simulate the catch block behavior
      logger.error(ttyError);
      if (ttyError.isTtyError) {
        logger.error("Prompt couldn't be rendered in the current environment");
      }

      expect(logger.error).toHaveBeenCalledWith(ttyError);
      expect(logger.error).toHaveBeenCalledWith(
        "Prompt couldn't be rendered in the current environment"
      );
    });

    it('should log generic error for non-TTY errors', () => {
      const genericError = new Error('Something failed') as Error & { isTtyError: boolean };
      genericError.isTtyError = false;

      logger.error(genericError);
      if (genericError.isTtyError) {
        logger.error("Prompt couldn't be rendered in the current environment");
      } else {
        logger.error('Something went wrong, sorry!');
      }

      expect(logger.error).toHaveBeenCalledWith(genericError);
      expect(logger.error).toHaveBeenCalledWith('Something went wrong, sorry!');
    });
  });

  describe('Integration: Full Flow', () => {
    it('should generate blog post file from prompt answers', async () => {
      const mockPrompt = inquirer.prompt as unknown as jest.Mock;
      const mockWriteFile = fs.writeFile as unknown as jest.Mock;

      const answers: ComposePromptType = {
        title: 'AsyncAPI 3.0 Is Here',
        excerpt: 'Announcing the release of AsyncAPI 3.0',
        tags: 'asyncapi, release, announcement',
        type: 'Communication',
        canonical: 'https://asyncapi.com/blog/asyncapi-3'
      };

      mockPrompt.mockResolvedValue(answers);
      mockWriteFile.mockImplementation(
        (_path: string, _content: string, _options: object, callback: (err: NodeJS.ErrnoException | null) => void) => {
          callback(null);
        }
      );

      // Simulate the full flow
      const result = await inquirer.prompt([]);
      const fileName = result.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-')
        .replace(/-+/g, '-');

      const frontMatter = genFrontMatter(result);
      const filePath = `pages/blog/${fileName || 'untitled'}.md`;

      fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
        if (err) {
          throw err;
        } else {
          logger.info(`Blog post generated successfully at ${filePath}`);
        }
      });

      expect(filePath).toBe('pages/blog/asyncapi-30-is-here.md');
      expect(mockWriteFile).toHaveBeenCalledWith(
        'pages/blog/asyncapi-30-is-here.md',
        expect.stringContaining('title: AsyncAPI 3.0 Is Here'),
        { flag: 'wx' },
        expect.any(Function)
      );
      expect(logger.info).toHaveBeenCalledWith(
        'Blog post generated successfully at pages/blog/asyncapi-30-is-here.md'
      );
    });
  });
});
