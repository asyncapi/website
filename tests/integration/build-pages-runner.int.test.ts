import { promises as fs } from 'fs';
import os from 'os';
import { join, resolve } from 'path';

import { runBuildPages } from '../../npm/runners/build-pages-runner';
import { CustomError } from '../../types/errors/CustomError';
import { acquireBuildPagesLock, releaseBuildPagesLock, waitForPagesBuild } from './helpers/build-pages-lock';
import { getAllFiles } from './helpers/file-utils';

describe('Integration: build-pages-runner', () => {
  let tempDir: string;
  let sourceDir: string;
  let targetDir: string;

  beforeAll(async () => {
    // Create a unique temp directory for this test run
    tempDir = resolve(os.tmpdir(), `build-pages-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });

    sourceDir = resolve(tempDir, 'markdown');
    targetDir = resolve(tempDir, 'pages');

    // Create source directory structure with test files
    await fs.mkdir(sourceDir, { recursive: true });

    // Create a nested directory structure
    const nestedDir = join(sourceDir, 'docs', 'getting-started');

    await fs.mkdir(nestedDir, { recursive: true });

    // Create test markdown files with various content
    const simpleMarkdown = `# Simple Markdown

This is a simple markdown file.
`;

    const markdownWithHtmlComments = `# Markdown with HTML Comments

<!-- This is an HTML comment -->
Some content here.
<!-- Another comment -->
`;

    const markdownWithJsxTags = `# Markdown with JSX Tags

<table>
  <tr>
    <td>Cell 1</td>
    <th>Header</th>
  </tr>
  <thead>
    <tr>
      <th>Header Row</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Body Cell</td>
    </tr>
  </tbody>
</table>
`;

    const markdownWithMixedContent = `# Mixed Content

<!-- HTML comment -->
<table>
  <tr>
    <td>Content</td>
  </tr>
</table>
<!-- Another comment -->
`;

    const nonMarkdownFile = `# This is not a markdown file
But it should still be copied.
`;

    // Write test files
    await fs.writeFile(join(sourceDir, 'simple.md'), simpleMarkdown, 'utf-8');
    await fs.writeFile(join(sourceDir, 'with-comments.md'), markdownWithHtmlComments, 'utf-8');
    await fs.writeFile(join(sourceDir, 'with-jsx-tags.md'), markdownWithJsxTags, 'utf-8');
    await fs.writeFile(join(sourceDir, 'mixed.md'), markdownWithMixedContent, 'utf-8');
    await fs.writeFile(join(nestedDir, 'nested.md'), simpleMarkdown, 'utf-8');
    await fs.writeFile(join(sourceDir, 'readme.txt'), nonMarkdownFile, 'utf-8');
  });

  afterAll(async () => {
    // Clean up temp files and directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('File Creation and Structure', () => {
    it('creates the target directory successfully', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const targetExists = await fs
        .access(targetDir)
        .then(() => true)
        .catch(() => false);

      expect(targetExists).toBe(true);
    });

    it('copies all files from source to target', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const sourceFiles = await getAllFiles(sourceDir);
      const targetFiles = await getAllFiles(targetDir);

      // Should have same number of files (excluding directories)
      const sourceFileCount = sourceFiles.filter((f) => !f.endsWith('/')).length;
      const targetFileCount = targetFiles.filter((f) => !f.endsWith('/')).length;

      expect(targetFileCount).toBe(sourceFileCount);
    });

    it('preserves nested directory structure', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const nestedTargetPath = join(targetDir, 'docs', 'getting-started', 'nested.mdx');
      const nestedExists = await fs
        .access(nestedTargetPath)
        .then(() => true)
        .catch(() => false);

      expect(nestedExists).toBe(true);
    });
  });

  describe('File Renaming', () => {
    it('renames .md files to .mdx', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const mdxFiles = [
        join(targetDir, 'simple.mdx'),
        join(targetDir, 'with-comments.mdx'),
        join(targetDir, 'with-jsx-tags.mdx'),
        join(targetDir, 'mixed.mdx'),
        join(targetDir, 'docs', 'getting-started', 'nested.mdx')
      ];

      for (const file of mdxFiles) {
        // eslint-disable-next-line no-await-in-loop
        const exists = await fs
          .access(file)
          .then(() => true)
          .catch(() => false);

        expect(exists).toBe(true);
      }
    });

    it('does not rename non-.md files', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const txtFile = join(targetDir, 'readme.txt');
      const exists = await fs
        .access(txtFile)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });

    it('original .md files should not exist in target', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const mdFile = join(targetDir, 'simple.md');
      const exists = await fs
        .access(mdFile)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(false);
    });
  });

  describe('Content Transformations', () => {
    it('converts HTML comments to JSX comments', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'with-comments.mdx'), 'utf-8');

      expect(content).toContain('{/* This is an HTML comment */}');
      expect(content).toContain('{/* Another comment */}');
      expect(content).not.toContain('<!-- This is an HTML comment -->');
      expect(content).not.toContain('<!-- Another comment -->');
    });

    it('capitalizes JSX table tags', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'with-jsx-tags.mdx'), 'utf-8');

      expect(content).toContain('<Table>');
      expect(content).toContain('</Table>');
      expect(content).toContain('<Tr>');
      expect(content).toContain('</Tr>');
      expect(content).toContain('<Td>');
      expect(content).toContain('</Td>');
      expect(content).toContain('<Th>');
      expect(content).toContain('</Th>');
      expect(content).toContain('<Thead>');
      expect(content).toContain('</Thead>');
      expect(content).toContain('<Tbody>');
      expect(content).toContain('</Tbody>');
    });

    it('handles mixed content transformations correctly', async () => {
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'mixed.mdx'), 'utf-8');

      // Should have JSX comments
      expect(content).toContain('{/* HTML comment */}');
      expect(content).toContain('{/* Another comment */}');

      // Should have capitalized table tags
      expect(content).toContain('<Table>');
      expect(content).toContain('<Tr>');
      expect(content).toContain('<Td>');
    });
  });

  describe('Default Options', () => {
    it('uses default source and target directories when options not provided', async () => {
      // This test uses the actual markdown and pages directories
      // Use lock mechanism to prevent conflicts with other tests
      const hasLock = await acquireBuildPagesLock();

      if (hasLock) {
        // We have the lock, build pages
        try {
          await expect(runBuildPages()).resolves.not.toThrow();
        } finally {
          await releaseBuildPagesLock();
        }
      } else {
        // Another test is building pages, wait for it to complete
        await waitForPagesBuild();
        // Just verify pages exist (another test built them)
        const pagesDir = resolve(process.cwd(), 'pages');
        const pagesExists = await fs
          .access(pagesDir)
          .then(() => true)
          .catch(() => false);

        expect(pagesExists).toBe(true);
      }
    });
  });

  describe('Error Handling', () => {
    it('throws CustomError when source directory does not exist', async () => {
      const nonExistentSource = resolve(tempDir, 'non-existent-source');

      await expect(
        runBuildPages({
          sourceDir: nonExistentSource,
          targetDir
        })
      ).rejects.toThrow(CustomError);
    });

    it('wraps errors in CustomError with proper context', async () => {
      const nonExistentSource = resolve(tempDir, 'non-existent-source');

      try {
        await runBuildPages({
          sourceDir: nonExistentSource,
          targetDir
        });
        throw new Error('Expected error to be thrown');
      } catch (error) {
        if (error instanceof Error && error.message === 'Expected error to be thrown') {
          throw error;
        }
        expect(error).toBeInstanceOf(CustomError);
        const customError = error as CustomError;

        expect(customError.context.category).toBe('script');
        expect(customError.context.operation).toBe('runBuildPages');
        expect(customError.context.detail).toBeDefined();
        expect(customError.context.detail).toContain('Build pages failed');
      }
    });

    it('handles empty source directory gracefully', async () => {
      const emptySourceDir = resolve(tempDir, 'empty-source');
      const emptyTargetDir = resolve(tempDir, 'empty-target');

      await fs.mkdir(emptySourceDir, { recursive: true });

      await expect(
        runBuildPages({
          sourceDir: emptySourceDir,
          targetDir: emptyTargetDir
        })
      ).resolves.not.toThrow();

      // Target directory should still be created
      const targetExists = await fs
        .access(emptyTargetDir)
        .then(() => true)
        .catch(() => false);

      expect(targetExists).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles files with special characters in names', async () => {
      const specialFile = join(sourceDir, 'file-with-special-chars.md');

      await fs.writeFile(specialFile, '# Special File\nContent', 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const targetFile = join(targetDir, 'file-with-special-chars.mdx');
      const exists = await fs
        .access(targetFile)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });

    it('handles deeply nested directory structures', async () => {
      const deepDir = join(sourceDir, 'level1', 'level2', 'level3', 'level4');

      await fs.mkdir(deepDir, { recursive: true });
      await fs.writeFile(join(deepDir, 'deep.md'), '# Deep File', 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const deepTarget = join(targetDir, 'level1', 'level2', 'level3', 'level4', 'deep.mdx');
      const exists = await fs
        .access(deepTarget)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });

    it('preserves non-table JSX tags as lowercase', async () => {
      const otherTagsFile = join(sourceDir, 'other-tags.md');

      await fs.writeFile(otherTagsFile, '<div><span>Content</span></div>', 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'other-tags.mdx'), 'utf-8');

      expect(content).toContain('<div>');
      expect(content).toContain('</div>');
      expect(content).toContain('<span>');
      expect(content).toContain('</span>');
    });
  });

  describe('Function Export', () => {
    it('should export the runner function', () => {
      expect(typeof runBuildPages).toBe('function');
      // Verify it's a Promise-returning function
      expect(runBuildPages()).toBeInstanceOf(Promise);
    });
  });

  describe('Content Integrity', () => {
    it('preserves exact content for non-transformed parts', async () => {
      const originalContent = `# Title

This is some content with **bold** and *italic* text.

\`\`\`javascript
const code = "example";
\`\`\`

Regular paragraph text.
`;

      const testFile = join(sourceDir, 'content-integrity.md');

      await fs.writeFile(testFile, originalContent, 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const transformedContent = await fs.readFile(join(targetDir, 'content-integrity.mdx'), 'utf-8');

      // Should preserve all non-transformed content
      expect(transformedContent).toContain('# Title');
      expect(transformedContent).toContain('**bold**');
      expect(transformedContent).toContain('*italic*');
      expect(transformedContent).toContain('```javascript');
      expect(transformedContent).toContain('const code = "example";');
    });

    it('handles curly braces in content correctly', async () => {
      // The script does content.replace(/{/g, '{') which seems to be a no-op
      // but we should test it anyway
      const contentWithBraces = `# Code Example

\`\`\`javascript
const obj = { key: 'value' };
const arr = [1, 2, { nested: true }];
\`\`\`

Text with {curly braces} in it.
`;

      const testFile = join(sourceDir, 'curly-braces.md');

      await fs.writeFile(testFile, contentWithBraces, 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const transformed = await fs.readFile(join(targetDir, 'curly-braces.mdx'), 'utf-8');

      expect(transformed).toContain("{ key: 'value' }");
      expect(transformed).toContain('{ nested: true }');
      expect(transformed).toContain('{curly braces}');
    });

    it('handles large files correctly', async () => {
      // Create a large file (simulate a long markdown document)
      const largeContent = `# Large Document\n\n${'Content line.\n'.repeat(1000)}`;
      const largeFile = join(sourceDir, 'large-file.md');

      await fs.writeFile(largeFile, largeContent, 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const transformed = await fs.readFile(join(targetDir, 'large-file.mdx'), 'utf-8');

      expect(transformed.length).toBeGreaterThan(1000);
      expect(transformed).toContain('# Large Document');
      expect(transformed.split('Content line.').length).toBeGreaterThan(1000);
    });
  });

  describe('HTML Comment Edge Cases', () => {
    it('handles HTML comments with special characters', async () => {
      const specialComment = '<!-- Comment with <tags> and {braces} and "quotes" -->';
      const testFile = join(sourceDir, 'special-comment.md');

      await fs.writeFile(testFile, specialComment, 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'special-comment.mdx'), 'utf-8');

      expect(content).toContain('{/*');
      expect(content).toContain('*/}');
    });

    it('handles multi-line HTML comments', async () => {
      const multiLineComment = `<!--
This is a multi-line
HTML comment
with multiple lines
-->`;
      const testFile = join(sourceDir, 'multiline-comment.md');

      await fs.writeFile(testFile, multiLineComment, 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'multiline-comment.mdx'), 'utf-8');

      expect(content).toContain('{/*');
      expect(content).toContain('*/}');
      expect(content).toContain('multi-line');
    });
  });

  describe('JSX Tag Capitalization Edge Cases', () => {
    it('capitalizes table tags with attributes', async () => {
      const tagsWithAttrs = `<table class="my-table" id="table1">
  <tr class="row">
    <td class="cell" data-id="1">Cell 1</td>
    <th scope="col">Header</th>
  </tr>
</table>`;
      const testFile = join(sourceDir, 'tags-with-attrs.md');

      await fs.writeFile(testFile, tagsWithAttrs, 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'tags-with-attrs.mdx'), 'utf-8');

      expect(content).toContain('<Table class="my-table"');
      expect(content).toContain('<Tr class="row">');
      expect(content).toContain('<Td class="cell"');
      expect(content).toContain('<Th scope="col">');
    });

    it('handles mixed case table tags', async () => {
      const mixedCase = `<TABLE>
  <Tr>
    <tD>Mixed case</tD>
    <TH>Also mixed</TH>
  </Tr>
</TABLE>`;
      const testFile = join(sourceDir, 'mixed-case-tags.md');

      await fs.writeFile(testFile, mixedCase, 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'mixed-case-tags.mdx'), 'utf-8');

      // The script only capitalizes lowercase tags, so uppercase stays uppercase
      // Lowercase parts get capitalized: <Tr> -> <Tr>, <tD> -> <TD>, <TH> -> <TH>
      expect(content).toContain('<TABLE>');
      expect(content).toContain('<Tr>'); // Already has capital T, stays as is
      expect(content).toContain('<TD>'); // Lowercase 'd' gets capitalized
      expect(content).toContain('<TH>'); // Already uppercase, stays as is
    });
  });

  describe('File System Edge Cases', () => {
    it('overwrites existing files in target directory', async () => {
      // First run
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const firstContent = await fs.readFile(join(targetDir, 'simple.mdx'), 'utf-8');

      // Modify source file
      await fs.writeFile(join(sourceDir, 'simple.md'), '# Modified Content\nNew text', 'utf-8');

      // Second run should overwrite
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const secondContent = await fs.readFile(join(targetDir, 'simple.mdx'), 'utf-8');

      expect(secondContent).toContain('# Modified Content');
      expect(secondContent).toContain('New text');
      expect(secondContent).not.toEqual(firstContent);
    });

    it('handles files with unicode characters in names', async () => {
      const unicodeFile = join(sourceDir, '测试文件.md');

      await fs.writeFile(unicodeFile, '# Unicode File\nContent', 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const targetFile = join(targetDir, '测试文件.mdx');
      const exists = await fs
        .access(targetFile)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });
  });

  describe('Complex Transformation Scenarios', () => {
    it('handles multiple transformations in sequence correctly', async () => {
      const complexContent = `<!-- Comment 1 -->
<table>
  <tr>
    <td>Cell</td>
  </tr>
</table>
<!-- Comment 2 -->
<div>Not a table</div>
<tbody>
  <tr><th>Header</th></tr>
</tbody>`;
      const testFile = join(sourceDir, 'complex-transform.md');

      await fs.writeFile(testFile, complexContent, 'utf-8');

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const content = await fs.readFile(join(targetDir, 'complex-transform.mdx'), 'utf-8');

      // HTML comments should be converted
      expect(content).toContain('{/* Comment 1 */}');
      expect(content).toContain('{/* Comment 2 */}');

      // Table tags should be capitalized
      expect(content).toContain('<Table>');
      expect(content).toContain('<Tr>');
      expect(content).toContain('<Td>');
      expect(content).toContain('<Tbody>');
      expect(content).toContain('<Th>');

      // Non-table tags should remain lowercase
      expect(content).toContain('<div>');
      expect(content).toContain('</div>');
    });
  });

  describe('Idempotency', () => {
    it('produces same results when run multiple times', async () => {
      // First run
      await runBuildPages({
        sourceDir,
        targetDir
      });

      const firstRunFiles = await getAllFiles(targetDir);
      const firstContent = await fs.readFile(join(targetDir, 'simple.mdx'), 'utf-8');

      // Clear target and run again
      await fs.rm(targetDir, { recursive: true, force: true });

      await runBuildPages({
        sourceDir,
        targetDir
      });

      const secondRunFiles = await getAllFiles(targetDir);
      const secondContent = await fs.readFile(join(targetDir, 'simple.mdx'), 'utf-8');

      // Should produce same results
      expect(firstRunFiles.length).toBe(secondRunFiles.length);
      expect(firstContent).toBe(secondContent);
    });
  });

  describe('Error Scenarios', () => {
    it('throws error when target directory is a file', async () => {
      const fileAsTarget = join(tempDir, 'file-target');

      await fs.writeFile(fileAsTarget, 'this is a file', 'utf-8');

      await expect(
        runBuildPages({
          sourceDir,
          targetDir: fileAsTarget
        })
      ).rejects.toThrow();
    });
  });
});
