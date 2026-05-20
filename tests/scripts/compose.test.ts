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
  format: jest.fn().mockReturnValue(MOCK_DATE),
};

(dayjs as unknown as jest.Mock).mockReturnValue(mockDayjsInstance);
(inquirer.prompt as jest.Mock).mockResolvedValue({
  title: 'Test Blog Post',
  excerpt: 'A test excerpt',
  tags: 'test, jest',
  type: 'Engineering',
  canonical: 'https://example.com/test',
});

/**
 * Synchronous pseudo-promise that mimics .then/.catch chaining synchronously.
 * compose.ts uses inquirer.prompt().then().catch() at module level — we need
 * this to execute synchronously when compose.ts is required.
 */
interface SyncPromise<T> {
  then<U>(fn: (v: T) => U): SyncPromise<U>;
  catch<U>(fn: (e: Error) => U): SyncPromise<T | U>;
}

function syncResolved<T>(value: T): SyncPromise<T> {
  return {
    then<U>(fn: (v: T) => U): SyncPromise<U> {
      try {
        return syncResolved(fn(value));
      } catch (e) {
        return syncRejected(e instanceof Error ? e : new Error(String(e)));
      }
    },
    catch(): SyncPromise<T> {
      return syncResolved(value);
    },
  };
}

function syncRejected(error: Error): SyncPromise<never> {
  return {
    then(): SyncPromise<never> {
      return syncRejected(error);
    },
    catch<U>(fn: (e: Error) => U): SyncPromise<U> {
      try {
        return syncResolved(fn(error));
      } catch (e) {
        return syncRejected(e instanceof Error ? e : new Error(String(e)));
      }
    },
  };
}

function runCompose(
  answers: Record<string, string> = {},
  errorMsg?: string
) {
  jest.resetModules();

  jest.doMock('fs', () => ({
    writeFile: jest.fn(
      (
        _path: string,
        _content: string,
        _options: object,
        callback: (err: Error | null) => void
      ) => {
        callback(errorMsg ? new Error(errorMsg) : null);
      }
    ),
  }));

  jest.doMock('inquirer', () => ({
    prompt: jest.fn(() =>
      syncResolved({
        title: 'Test Blog Post',
        excerpt: 'A test excerpt',
        tags: 'test, jest',
        type: 'Engineering',
        canonical: 'https://example.com/test',
        ...answers,
      })
    ),
  }));

  jest.doMock('dayjs', () => {
    const mockInstance = {
      format: jest.fn().mockReturnValue(MOCK_DATE),
    };
    return Object.assign(jest.fn(() => mockInstance), {
      __esModule: true,
      default: jest.fn(() => mockInstance),
    });
  });

  jest.doMock('../../scripts/helpers/logger', () => ({
    logger: {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    },
  }));

  jest.doMock('dedent', () => {
    const fn = (strings: TemplateStringsArray, ...values: unknown[]) => {
      let result = strings[0];
      for (let i = 0; i < values.length; i++) {
        result += String(values[i]) + strings[i + 1];
      }
      return result;
    };
    return Object.assign(fn, { default: fn });
  });

  // This triggers compose.ts's top-level inquirer.prompt().then().catch()
  // chain synchronously via our pseudo-promise
  require('../../scripts/compose');

  const localFs = require('fs');
  const localLogger = require('../../scripts/helpers/logger');
  return {
    writeFileCalls: (localFs.writeFile as jest.Mock).mock.calls,
    loggerErrorCalls: (localLogger.logger.error as jest.Mock).mock.calls,
  };
}

describe('scripts/compose.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy path', () => {
    test('should generate blog post with file path and front matter', () => {
      const { writeFileCalls } = runCompose();

      expect(writeFileCalls).toHaveLength(1);
      const [filePath, content, options] = writeFileCalls[0] as [
        string,
        string,
        object
      ];

      expect(filePath).toBe('pages/blog/test-blog-post.md');
      expect(options).toEqual({ flag: 'wx' });

      expect(content).toContain('title: Test Blog Post');
      expect(content).toContain('date: 2026-01-15T10:30:00+00:00');
      expect(content).toContain('type: Engineering');
      expect(content).toContain('canonical: https://example.com/test');
      expect(content).toContain("tags: ['test','jest']");
      expect(content).toContain('excerpt: A test excerpt');
      expect(content).toContain('Write your blog post content here');
    });

    test('should use defaults when fields empty', () => {
      const { writeFileCalls } = runCompose({
        title: '',
        excerpt: '',
        tags: '',
        canonical: '',
      });

      expect(writeFileCalls).toHaveLength(1);
      const [filePath, content] = writeFileCalls[0] as [string, string];

      expect(filePath).toBe('pages/blog/untitled.md');
      expect(content).toContain('title: Untitled');
      expect(content).toContain('excerpt:');
      expect(content).toContain('tags: []');
      // canonical: empty string → the template outputs "canonical: " with trailing space
      expect(content).toContain('canonical:');
    });
  });

  describe('Slug generation', () => {
    test.each([
      // The slug pipeline: .toLowerCase() → replace(/[^a-zA-Z0-9 ]/g,'') → replace(/ /g,'-') → replace(/-+/g,'-')
      // "Hello!!! World??? & More***" → "hello world  more" → "hello-world--more" → "hello-world-more"
      { title: 'Hello!!! World??? & More***', expected: 'pages/blog/hello-world-more.md' },
      { title: 'Too    Many   Spaces', expected: 'pages/blog/too-many-spaces.md' },
      { title: 'UPPERCASE Title Test', expected: 'pages/blog/uppercase-title-test.md' },
    ])('should convert "$title" to slug "$expected"', ({ title, expected }) => {
      const { writeFileCalls } = runCompose({ title });

      expect(writeFileCalls).toHaveLength(1);
      const [filePath] = writeFileCalls[0] as [string];
      expect(filePath).toBe(expected);
    });
  });

  describe('Error handling', () => {
    test('should log EEXIST error when file already exists', () => {
      const { writeFileCalls, loggerErrorCalls } = runCompose(
        { title: 'Error Test' },
        'EEXIST: file already exists'
      );
      expect(writeFileCalls).toHaveLength(1);
      expect(loggerErrorCalls.length).toBeGreaterThanOrEqual(1);
      expect(loggerErrorCalls[0][0].message).toContain('EEXIST');
    });

    test('should log ENOSPC error when disk full', () => {
      const { writeFileCalls, loggerErrorCalls } = runCompose(
        { title: 'Error Test' },
        'ENOSPC: no space left on device'
      );
      expect(writeFileCalls).toHaveLength(1);
      expect(loggerErrorCalls.length).toBeGreaterThanOrEqual(1);
      expect(loggerErrorCalls[0][0].message).toContain('ENOSPC');
    });
  });
});
