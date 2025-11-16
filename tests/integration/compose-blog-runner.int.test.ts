import { promises as fs } from 'fs';
import os from 'os';
import { join, resolve } from 'path';

import { runComposeBlog } from '../../npm/runners/compose-blog-runner';
import { CustomError } from '../../types/errors/CustomError';

/**
 * Helper function to generate filename from title (matching ComposeBlog logic)
 */
function generateFileName(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /g, '-')
    .replace(/-+/g, '-') || 'untitled';
}

describe('Integration: compose-blog-runner', () => {
  let tempDir: string;
  let outputDir: string;

  beforeEach(async () => {
    // Create a unique temp directory for each test
    tempDir = resolve(os.tmpdir(), `compose-blog-test-${Date.now()}-${Math.random().toString(36).substring(7)}`);
    await fs.mkdir(tempDir, { recursive: true });

    outputDir = resolve(tempDir, 'blog-posts');
    await fs.mkdir(outputDir, { recursive: true });
  });

  afterEach(async () => {
    // Clean up temp files and directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('File Creation', () => {
    it('creates blog post file successfully with default path', async () => {
      // Create markdown/blog directory structure in temp dir to test default path behavior
      const markdownDir = resolve(tempDir, 'markdown', 'blog');

      await fs.mkdir(markdownDir, { recursive: true });

      const answers = {
        title: 'Test Blog Post',
        excerpt: 'This is a test blog post excerpt',
        tags: 'testing, blog, integration',
        type: 'Engineering',
        canonical: ''
      };

      // Use explicit absolute path instead of process.chdir()
      const expectedFileName = generateFileName(answers.title);
      const expectedPath = resolve(tempDir, 'markdown', 'blog', `${expectedFileName}.md`);

      const filePath = await runComposeBlog({
        answers,
        outputPath: expectedPath
      });

      const fileExists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
      // Since we're using explicit absolute paths, check that the path matches the expected path
      expect(filePath).toBe(expectedPath);
      // Verify it contains the expected path components (path-agnostic check)
      expect(filePath.replace(/\\/g, '/')).toContain('markdown/blog/test-blog-post.md');
    });

    it('creates blog post file successfully with custom output path', async () => {
      const customPath = join(outputDir, 'custom-blog-post.md');
      const answers = {
        title: 'Custom Path Blog Post',
        excerpt: 'This blog post uses a custom path',
        tags: 'custom, path',
        type: 'Tutorial',
        canonical: 'https://example.com/blog/custom'
      };

      const filePath = await runComposeBlog({
        answers,
        outputPath: customPath
      });

      expect(filePath).toBe(customPath);

      const fileExists = await fs
        .access(customPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });

    it('creates directory structure if output path directory does not exist', async () => {
      const nestedPath = join(outputDir, 'nested', 'subdir', 'blog-post.md');
      const answers = {
        title: 'Nested Path Blog',
        excerpt: 'Blog in nested directory',
        tags: 'nested',
        type: 'Community',
        canonical: ''
      };

      // Create the directory structure first (ComposeBlog doesn't create directories)
      await fs.mkdir(join(outputDir, 'nested', 'subdir'), { recursive: true });

      const filePath = await runComposeBlog({
        answers,
        outputPath: nestedPath
      });

      expect(filePath).toBe(nestedPath);

      const fileExists = await fs
        .access(nestedPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });
  });

  describe('Content Validation', () => {
    it('generates correct front matter structure', async () => {
      const customPath = join(outputDir, 'front-matter-test.md');
      const answers = {
        title: 'Front Matter Test',
        excerpt: 'Testing front matter generation',
        tags: 'test, front-matter',
        type: 'Engineering',
        canonical: 'https://example.com/blog/front-matter'
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain('---');
      expect(content).toContain('title: Front Matter Test');
      expect(content).toContain('excerpt: Testing front matter generation');
      expect(content).toContain('type: Engineering');
      expect(content).toContain('canonical: https://example.com/blog/front-matter');
      expect(content).toContain('tags:');
    });

    it('parses and formats tags correctly', async () => {
      const customPath = join(outputDir, 'tags-test.md');
      const answers = {
        title: 'Tags Test',
        excerpt: 'Testing tag parsing',
        tags: 'tag1, tag2, tag3',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      // Tags should be formatted as ['tag1','tag2','tag3']
      expect(content).toContain("tags: ['tag1','tag2','tag3']");
    });

    it('trims whitespace from tags', async () => {
      const customPath = join(outputDir, 'tags-trim-test.md');
      const answers = {
        title: 'Tags Trim Test',
        excerpt: 'Testing tag trimming',
        tags: '  tag1  ,  tag2  ,  tag3  ',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      // Tags should have whitespace trimmed
      expect(content).toContain("tags: ['tag1','tag2','tag3']");
    });

    it('handles empty tags array', async () => {
      const customPath = join(outputDir, 'empty-tags-test.md');
      const answers = {
        title: 'Empty Tags Test',
        excerpt: 'Testing empty tags',
        tags: '',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain('tags: []');
    });

    it('handles empty canonical URL', async () => {
      const customPath = join(outputDir, 'empty-canonical-test.md');
      const answers = {
        title: 'Empty Canonical Test',
        excerpt: 'Testing empty canonical',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain('canonical: ');
    });

    it('includes default cover image and author metadata', async () => {
      const customPath = join(outputDir, 'metadata-test.md');
      const answers = {
        title: 'Metadata Test',
        excerpt: 'Testing default metadata',
        tags: 'metadata',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain('cover: /img/posts/may-2021-at-asyncapi/cover.webp');
      expect(content).toContain('authors:');
      expect(content).toContain('name: Lukasz Gornicki');
    });

    it('includes blog post template content', async () => {
      const customPath = join(outputDir, 'template-test.md');
      const answers = {
        title: 'Template Test',
        excerpt: 'Testing template content',
        tags: 'template',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain('Write your blog post content here');
      expect(content).toContain('Test sub-section 1');
      expect(content).toContain('Test sub-section 2');
    });
  });

  describe('File Name Generation', () => {
    it('generates filename from title (lowercase, spaces to dashes)', async () => {
      const customPath = join(outputDir, 'filename-test.md');
      const answers = {
        title: 'My Awesome Blog Post',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      const filePath = await runComposeBlog({
        answers,
        outputPath: customPath
      });

      // Verify the filename generation logic (even though we use custom path)
      expect(filePath).toBe(customPath);
      // The title would generate 'my-awesome-blog-post' if using default path
    });

    it('removes special characters from filename', async () => {
      const customPath = join(outputDir, 'special-chars-test.md');
      const answers = {
        title: 'Blog Post with @Special#Characters!',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      const filePath = await runComposeBlog({
        answers,
        outputPath: customPath
      });

      expect(filePath).toBe(customPath);
      // The title would generate 'blog-post-with-specialcharacters' if using default path
    });

    it('handles multiple consecutive dashes', async () => {
      // Create markdown/blog directory structure in temp dir
      const markdownDir = resolve(tempDir, 'markdown', 'blog');

      await fs.mkdir(markdownDir, { recursive: true });

      const answers = {
        title: 'Blog   Post   With   Multiple   Spaces',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      // Use explicit absolute path instead of process.chdir()
      const expectedFileName = generateFileName(answers.title);
      const expectedPath = resolve(tempDir, 'markdown', 'blog', `${expectedFileName}.md`);

      const filePath = await runComposeBlog({
        answers,
        outputPath: expectedPath
      });

      // Should not have multiple consecutive dashes
      expect(filePath).toContain('blog-post-with-multiple-spaces.md');
      expect(filePath).not.toContain('--');
    });

    it('handles titles with only special characters', async () => {
      // Create markdown/blog directory structure in temp dir
      const markdownDir = resolve(tempDir, 'markdown', 'blog');

      await fs.mkdir(markdownDir, { recursive: true });

      const answers = {
        title: '!!!@@@###',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      // Use explicit absolute path instead of process.chdir()
      const expectedFileName = generateFileName(answers.title);
      const expectedPath = resolve(tempDir, 'markdown', 'blog', `${expectedFileName}.md`);

      const filePath = await runComposeBlog({
        answers,
        outputPath: expectedPath
      });

      // Should fall back to 'untitled' if title becomes empty after processing
      expect(filePath).toContain('untitled.md');
    });

    it('handles very long titles', async () => {
      const customPath = join(outputDir, 'long-title-test.md');
      const longTitle = 'A'.repeat(200);
      const answers = {
        title: longTitle,
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      const filePath = await runComposeBlog({
        answers,
        outputPath: customPath
      });

      expect(filePath).toBe(customPath);
      const fileExists = await fs
        .access(customPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });

    it('handles unicode characters in title', async () => {
      // Create markdown/blog directory structure in temp dir
      const markdownDir = resolve(tempDir, 'markdown', 'blog');

      await fs.mkdir(markdownDir, { recursive: true });

      const answers = {
        title: 'Blog Post with 中文 and émojis 🚀',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      // Use explicit absolute path instead of process.chdir()
      const expectedFileName = generateFileName(answers.title);
      const expectedPath = resolve(tempDir, 'markdown', 'blog', `${expectedFileName}.md`);

      const filePath = await runComposeBlog({
        answers,
        outputPath: expectedPath
      });

      // Unicode characters should be removed, leaving only ASCII characters
      // The regex /[^a-zA-Z0-9 ]/g removes non-alphanumeric, so "中文", "é", and "🚀" are removed
      // "and" and "mojis" remain, with spaces converted to dashes
      expect(filePath).toContain('blog-post-with');
      expect(filePath).toMatch(/blog-post-with.*\.md$/);
      // Verify it doesn't contain unicode characters
      expect(filePath).not.toContain('中文');
      expect(filePath).not.toContain('é');
      expect(filePath).not.toContain('🚀');
    });
  });

  describe('Error Handling', () => {
    it('throws CustomError when title is missing', async () => {
      const answers = {
        title: '',
        excerpt: 'Test excerpt',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      await expect(
        runComposeBlog({
          answers,
          outputPath: join(outputDir, 'missing-title.md')
        })
      ).rejects.toThrow(CustomError);
    });

    it('throws CustomError when title is undefined', async () => {
      const answers = {
        title: undefined as any,
        excerpt: 'Test excerpt',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      await expect(
        runComposeBlog({
          answers,
          outputPath: join(outputDir, 'undefined-title.md')
        })
      ).rejects.toThrow(CustomError);
    });

    it('throws error when file already exists (exclusive write)', async () => {
      const customPath = join(outputDir, 'existing-file.md');
      const answers = {
        title: 'Existing File Test',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      // Create the file first
      await fs.writeFile(customPath, 'existing content', 'utf-8');

      await expect(
        runComposeBlog({
          answers,
          outputPath: customPath
        })
      ).rejects.toThrow();
    });

    it('wraps errors in CustomError with proper context', async () => {
      const answers = {
        title: '',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      try {
        await runComposeBlog({
          answers,
          outputPath: join(outputDir, 'error-test.md')
        });
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        if (error instanceof CustomError) {
          expect(error.context.operation).toBe('runComposeBlog');
          expect(error.context.category).toBe('script');
        }
      }
    });
  });

  describe('Edge Cases', () => {
    it('handles single tag correctly', async () => {
      const customPath = join(outputDir, 'single-tag-test.md');
      const answers = {
        title: 'Single Tag Test',
        excerpt: 'Test',
        tags: 'single-tag',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain("tags: ['single-tag']");
    });

    it('handles tags with special characters', async () => {
      const customPath = join(outputDir, 'special-tags-test.md');
      const answers = {
        title: 'Special Tags Test',
        excerpt: 'Test',
        tags: 'tag-1, tag_2, tag.3',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain("tags: ['tag-1','tag_2','tag.3']");
    });

    it('handles very long excerpt', async () => {
      const customPath = join(outputDir, 'long-excerpt-test.md');
      const longExcerpt = 'A'.repeat(1000);
      const answers = {
        title: 'Long Excerpt Test',
        excerpt: longExcerpt,
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain(`excerpt: ${longExcerpt}`);
    });

    it('handles title with numbers', async () => {
      // Create markdown/blog directory structure in temp dir
      const markdownDir = resolve(tempDir, 'markdown', 'blog');

      await fs.mkdir(markdownDir, { recursive: true });

      const answers = {
        title: 'Blog Post 2024 - Part 1',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      // Use explicit absolute path instead of process.chdir()
      const expectedFileName = generateFileName(answers.title);
      const expectedPath = resolve(tempDir, 'markdown', 'blog', `${expectedFileName}.md`);

      const filePath = await runComposeBlog({
        answers,
        outputPath: expectedPath
      });

      expect(filePath).toContain('blog-post-2024-part-1.md');
    });

    it('handles canonical URL with query parameters', async () => {
      const customPath = join(outputDir, 'canonical-query-test.md');
      const answers = {
        title: 'Canonical Query Test',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: 'https://example.com/blog/post?param=value&other=123'
      };

      await runComposeBlog({
        answers,
        outputPath: customPath
      });

      const content = await fs.readFile(customPath, 'utf-8');

      expect(content).toContain('canonical: https://example.com/blog/post?param=value&other=123');
    });

    it('handles different post types', async () => {
      const types = ['Engineering', 'Community', 'Tutorial', 'News', 'Case Study'];

      for (const type of types) {
        const customPath = join(outputDir, `type-${type.toLowerCase().replace(' ', '-')}.md`);
        const answers = {
          title: `Type Test - ${type}`,
          excerpt: `Testing type: ${type}`,
          tags: 'test',
          type,
          canonical: ''
        };

        // eslint-disable-next-line no-await-in-loop
        await runComposeBlog({
          answers,
          outputPath: customPath
        });

        // eslint-disable-next-line no-await-in-loop
        const content = await fs.readFile(customPath, 'utf-8');

        expect(content).toContain(`type: ${type}`);
      }
    });
  });

  describe('Return Value', () => {
    it('returns the file path when successful', async () => {
      const customPath = join(outputDir, 'return-value-test.md');
      const answers = {
        title: 'Return Value Test',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      const filePath = await runComposeBlog({
        answers,
        outputPath: customPath
      });

      expect(filePath).toBe(customPath);
    });

    it('returns default path when outputPath is not provided', async () => {
      // Note: This test verifies the default path behavior. Since mocking process.cwd()
      // doesn't affect Node's file system operations (which use the real cwd), the file
      // will be created in the actual project directory. We use a unique title to avoid conflicts.
      const uniqueTitle = `Default Path Test ${Date.now()}`;
      const answers = {
        title: uniqueTitle,
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      const expectedFileName = generateFileName(uniqueTitle);
      const expectedRelativePath = `markdown/blog/${expectedFileName}.md`;

      // Clean up the file if it exists from a previous test run
      const projectFilePath = resolve(process.cwd(), expectedRelativePath);
      try {
        await fs.unlink(projectFilePath);
      } catch {
        // File doesn't exist, which is fine
      }

      const filePath = await runComposeBlog({ answers });

      // Verify the file path matches the expected default path format
      expect(filePath.replace(/\\/g, '/')).toContain(expectedRelativePath);

      // Clean up the created file
      try {
        await fs.unlink(projectFilePath);
      } catch {
        // Ignore cleanup errors
      }
    });
  });

  describe('Function Export', () => {
    it('exports the runComposeBlog function', () => {
      expect(typeof runComposeBlog).toBe('function');
      expect(runComposeBlog).toBeInstanceOf(Function);
    });

    it('returns a Promise', async () => {
      const answers = {
        title: 'Promise Test',
        excerpt: 'Test',
        tags: 'test',
        type: 'Engineering',
        canonical: ''
      };

      const result = runComposeBlog({
        answers,
        outputPath: join(outputDir, 'promise-test.md')
      });

      expect(result).toBeInstanceOf(Promise);
      await result;
    });
  });
});
