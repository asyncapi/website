import fs from 'fs';
import inquirer from 'inquirer';
import dayjs from 'dayjs';

import { logger } from '../../scripts/helpers/logger';

jest.mock('fs');
jest.mock('inquirer');
jest.mock('dayjs');
jest.mock('../../scripts/helpers/logger');

const MOCK_DATE = '2026-01-15T10:30:00+00:00';

const mockDayjsInstance = {
  format: jest.fn().mockReturnValue(MOCK_DATE)
};

(dayjs as unknown as jest.Mock).mockReturnValue(mockDayjsInstance);

function mockAnswers(overrides: Record<string, string> = {}) {
  const defaults: Record<string, string> = {
    title: 'Test Blog Post',
    excerpt: 'A test excerpt',
    tags: 'test, jest',
    type: 'Engineering',
    canonical: 'https://example.com/test'
  };
  (inquirer.prompt as jest.Mock).mockResolvedValue({ ...defaults, ...overrides });
}

function mockWriteFile(errorMessage?: string) {
  (fs.writeFile as jest.Mock).mockImplementation((_path: string, _content: string, _options: object, callback: (err: Error | null) => void) => {
    callback(errorMessage ? new Error(errorMessage) : null);
  });
}

/**
 * Helper: runs a test by importing compose.ts via jest.isolateModules and
 * returns the file write call for assertions.
 */
function runCompose() {
  jest.isolateModules(() => {
    require('../../scripts/compose');
  });
  const writeFileCalls = (fs.writeFile as jest.Mock).mock.calls;
  return { writeFileCalls };
}

describe('scripts/compose.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy path', () => {
    test('should generate a blog post with correct file path and front matter', () => {
      mockWriteFile();
      mockAnswers();

      const { writeFileCalls } = runCompose();

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      const [filePath, content, options] = writeFileCalls[0];

      // Verify file path is kebab-case slug
      expect(filePath).toBe('pages/blog/test-blog-post.md');

      // Verify write flag is wx (fail if exists)
      expect(options).toEqual({ flag: 'wx' });

      // Verify front matter content
      expect(content).toContain('title: Test Blog Post');
      expect(content).toContain('date: 2026-01-15T10:30:00+00:00');
      expect(content).toContain('type: Engineering');
      expect(content).toContain('canonical: https://example.com/test');
      expect(content).toContain("tags: ['test','jest']");
      expect(content).toContain('excerpt: A test excerpt');
      expect(content).toContain('Write your blog post content here');
    });

    test('should use defaults for optional fields when empty', () => {
      mockWriteFile();
      mockAnswers({
        title: '',
        excerpt: '',
        tags: '',
        canonical: ''
      });

      const { writeFileCalls } = runCompose();

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      const [filePath, content] = writeFileCalls[0];

      // Empty title defaults to 'untitled'
      expect(filePath).toBe('pages/blog/untitled.md');
      expect(content).toContain('title: Untitled');
      expect(content).toContain('excerpt:');
      expect(content).toContain("tags: []");
      expect(content).toContain("canonical: ''");
    });
  });

  describe('Slug generation', () => {
    test.each([
      { title: 'Hello!!! World??? & More***', expected: 'pages/blog/hello-world--more.md' },
      { title: 'Too    Many   Spaces', expected: 'pages/blog/too-many-spaces.md' },
      { title: 'UPPERCASE Title Test', expected: 'pages/blog/uppercase-title-test.md' }
    ])('should convert "$title" to slug "$expected"', ({ title, expected }) => {
      mockWriteFile();
      mockAnswers({ title });

      const { writeFileCalls } = runCompose();
      const [filePath] = writeFileCalls[0];
      expect(filePath).toBe(expected);
    });
  });

  describe('Error handling', () => {
    test.each([
      { message: 'EEXIST: file already exists', label: 'file exists error' },
      { message: 'ENOSPC: no space left on device', label: 'disk full error' }
    ])('should log $label: "$message"', ({ message }) => {
      mockWriteFile(message);
      mockAnswers({ title: 'Error Test' });

      const { writeFileCalls } = runCompose();

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(expect.objectContaining({ message }));
      expect(logger.error).toHaveBeenCalledWith('Something went wrong, sorry!');
    });
  });
});
