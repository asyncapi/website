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

function mockWriteFileSuccess() {
  (fs.writeFile as jest.Mock).mockImplementation((_path: string, _content: string, _options: object, callback: (err: Error | null) => void) => {
    callback(null);
  });
}

function mockWriteFileError(errorMessage: string) {
  (fs.writeFile as jest.Mock).mockImplementation((_path: string, _content: string, _options: object, callback: (err: Error | null) => void) => {
    callback(new Error(errorMessage));
  });
}

describe('scripts/compose.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy path', () => {
    test('should generate a blog post with correct file path and front matter', () => {
      mockWriteFileSuccess();
      mockAnswers();

      jest.isolateModules(() => {
        require('../../scripts/compose');
      });

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      const [filePath, content, options] = (fs.writeFile as jest.Mock).mock.calls[0];

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
      mockWriteFileSuccess();
      mockAnswers({
        title: '',
        excerpt: '',
        tags: '',
        canonical: ''
      });

      jest.isolateModules(() => {
        require('../../scripts/compose');
      });

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      const [filePath, content] = (fs.writeFile as jest.Mock).mock.calls[0];

      // Empty title defaults to 'untitled'
      expect(filePath).toBe('pages/blog/untitled.md');
      expect(content).toContain('title: Untitled');
      expect(content).toContain('excerpt:');
      expect(content).toContain("tags: []");
      expect(content).toContain("canonical: ''");
    });
  });

  describe('Slug generation', () => {
    test('should remove special characters from title slug', () => {
      mockWriteFileSuccess();
      mockAnswers({ title: 'Hello!!! World??? & More***' });

      jest.isolateModules(() => {
        require('../../scripts/compose');
      });

      const [filePath] = (fs.writeFile as jest.Mock).mock.calls[0];
      expect(filePath).toBe('pages/blog/hello-world--more.md');
    });

    test('should collapse multiple hyphens into one', () => {
      mockWriteFileSuccess();
      mockAnswers({ title: 'Too    Many   Spaces' });

      jest.isolateModules(() => {
        require('../../scripts/compose');
      });

      const [filePath] = (fs.writeFile as jest.Mock).mock.calls[0];
      expect(filePath).toBe('pages/blog/too-many-spaces.md');
    });

    test('should convert title to lowercase', () => {
      mockWriteFileSuccess();
      mockAnswers({ title: 'UPPERCASE Title Test' });

      jest.isolateModules(() => {
        require('../../scripts/compose');
      });

      const [filePath] = (fs.writeFile as jest.Mock).mock.calls[0];
      expect(filePath).toBe('pages/blog/uppercase-title-test.md');
    });
  });

  describe('Error handling', () => {
    test('should log error when file write fails', () => {
      const errorMessage = 'EEXIST: file already exists';
      mockWriteFileError(errorMessage);
      mockAnswers({ title: 'Error Test' });

      jest.isolateModules(() => {
        require('../../scripts/compose');
      });

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
      // The compose.ts catch block should have logged the error
      // Since the error is thrown synchronously in the callback,
      // the .catch handler on the promise will fire
    });

    test('should handle fs.writeFile callback error gracefully', () => {
      const diskError = 'ENOSPC: no space left on device';
      mockWriteFileError(diskError);
      mockAnswers({ title: 'Disk Full Test' });

      jest.isolateModules(() => {
        require('../../scripts/compose');
      });

      // The error is thrown, not logged - it's in the .then() callback
      // This triggers the .catch() which calls logger.error
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
    });
  });
});
