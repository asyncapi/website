import dayjs from 'dayjs';
import fs from 'fs';

import { genFrontMatter, getSlug, writePost } from '../../scripts/compose';
import { logger } from '../../scripts/helpers/logger';

jest.mock('fs');
jest.mock('dayjs');
jest.mock('../../scripts/helpers/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

const FIXED_DATE = '2024-01-15T3:30:00+05:30';
const mockDayjsInstance = {
  format: jest.fn(() => FIXED_DATE)
};

const mockWriteFile = fs.writeFile as unknown as jest.Mock;
const mockLogger = jest.mocked(logger);

(dayjs as unknown as jest.Mock).mockReturnValue(mockDayjsInstance);

/**
 * Configures mockWriteFile to call its callback with no error (success path).
 */
function mockWriteFileSuccess() {
  mockWriteFile.mockImplementation((_path: string, _data: string, _opts: object, cb: (err: null) => void) => {
    cb(null);
  });
}

/**
 * Configures mockWriteFile to call its callback with the given error (failure path).
 *
 * @param err - The error to pass to the writeFile callback.
 */
function mockWriteFileError(err: Error) {
  mockWriteFile.mockImplementation((_path: string, _data: string, _opts: object, cb: (err: Error) => void) => {
    cb(err);
  });
}

/**
 * Builds a minimal valid ComposePromptType answers object for use in tests.
 *
 * @param overrides - Optional field overrides to customise the returned object.
 * @returns A complete answers object suitable for passing to genFrontMatter or writePost.
 */
function makeAnswers(overrides: Partial<Parameters<typeof genFrontMatter>[0]> = {}) {
  return {
    title: 'My First Post',
    excerpt: 'A short excerpt',
    tags: 'asyncapi, community',
    type: 'Engineering',
    canonical: 'https://example.com/post',
    ...overrides
  };
}

describe('genFrontMatter', () => {
  it('includes the correct title in the front matter', () => {
    const result = genFrontMatter(makeAnswers({ title: 'Hello AsyncAPI' }));

    expect(result).toContain('title: Hello AsyncAPI');
  });

  it('falls back to "Untitled" when title is empty', () => {
    const result = genFrontMatter(makeAnswers({ title: '' }));

    expect(result).toContain('title: Untitled');
  });

  it('includes the correct post type', () => {
    const result = genFrontMatter(makeAnswers({ type: 'Community' }));

    expect(result).toContain('type: Community');
  });

  it('includes the canonical URL when provided', () => {
    const result = genFrontMatter(makeAnswers({ canonical: 'https://example.com' }));

    expect(result).toContain('canonical: https://example.com');
  });

  it('uses an empty string for canonical when not provided', () => {
    const result = genFrontMatter(makeAnswers({ canonical: '' }));

    expect(result).toContain('canonical: ');
  });

  it('parses multiple comma-separated tags correctly', () => {
    const result = genFrontMatter(makeAnswers({ tags: 'asyncapi, community, testing' }));

    expect(result).toContain("tags: ['asyncapi','community','testing']");
  });

  it('handles a single tag without trailing comma', () => {
    const result = genFrontMatter(makeAnswers({ tags: 'asyncapi' }));

    expect(result).toContain("tags: ['asyncapi']");
  });

  it('produces an empty tags array when tags field is empty', () => {
    const result = genFrontMatter(makeAnswers({ tags: '' }));

    expect(result).toContain('tags: []');
  });

  it('includes the excerpt in the front matter', () => {
    const result = genFrontMatter(makeAnswers({ excerpt: 'This is my excerpt.' }));

    expect(result).toContain('excerpt: This is my excerpt.');
  });

  it('uses a single space for excerpt when not provided', () => {
    const result = genFrontMatter(makeAnswers({ excerpt: '' }));

    expect(result).toContain('excerpt:  ');
  });

  it('includes the fixed date returned by dayjs', () => {
    const result = genFrontMatter(makeAnswers());

    expect(result).toContain(`date: ${FIXED_DATE}`);
  });

  it('closes with --- at the end', () => {
    const result = genFrontMatter(makeAnswers());

    expect(result.trim().endsWith('---')).toBe(true);
  });
});

describe('getSlug', () => {
  it('converts a simple title to kebab-case', () => {
    expect(getSlug('Hello World')).toBe('hello-world');
  });

  it('lowercases the entire title', () => {
    expect(getSlug('My GREAT Post')).toBe('my-great-post');
  });

  it('strips special characters', () => {
    expect(getSlug('Hello, World! #1')).toBe('hello-world-1');
  });

  it('collapses multiple consecutive spaces/dashes into one dash', () => {
    expect(getSlug('Hello   World')).toBe('hello-world');
  });

  it('handles a title with only special characters', () => {
    expect(getSlug('!!!')).toBe('');
  });

  it('returns an empty string for an empty title', () => {
    expect(getSlug('')).toBe('');
  });

  it('handles unicode letters that are not a-z as special characters (stripped)', () => {
    expect(getSlug('café au lait')).toBe('caf-au-lait');
  });

  it('handles a title with numbers', () => {
    expect(getSlug('AsyncAPI 3.0 Released')).toBe('asyncapi-30-released');
  });
});

describe('writePost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (dayjs as unknown as jest.Mock).mockReturnValue(mockDayjsInstance);
  });

  it('calls fs.writeFile with the correct file path derived from the title', async () => {
    mockWriteFileSuccess();

    const answers = makeAnswers({ title: 'My Test Post' });
    const filePath = await writePost(answers);

    expect(filePath).toBe('pages/blog/my-test-post.md');
    expect(mockWriteFile).toHaveBeenCalledWith(
      'pages/blog/my-test-post.md',
      expect.any(String),
      { flag: 'wx' },
      expect.any(Function)
    );
  });

  it('uses "untitled" as the filename when the title is empty', async () => {
    mockWriteFileSuccess();

    const answers = makeAnswers({ title: '' });
    const filePath = await writePost(answers);

    expect(filePath).toBe('pages/blog/untitled.md');
  });

  it('writes the generated front matter as the file content', async () => {
    let writtenContent = '';

    mockWriteFile.mockImplementation((_path: string, data: string, _opts: object, cb: (err: null) => void) => {
      writtenContent = data;
      cb(null);
    });

    const answers = makeAnswers({ title: 'Content Check' });

    await writePost(answers);

    expect(writtenContent).toContain('title: Content Check');
    expect(writtenContent).toContain('type: Engineering');
  });

  it('logs success after a successful file write', async () => {
    mockWriteFileSuccess();

    await writePost(makeAnswers({ title: 'Success Post' }));

    expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('pages/blog/success-post.md'));
  });

  it('rejects and logs the error when fs.writeFile fails', async () => {
    const writeError = new Error('EEXIST: file already exists');

    mockWriteFileError(writeError);

    await expect(writePost(makeAnswers({ title: 'Duplicate Post' }))).rejects.toThrow('EEXIST: file already exists');
    expect(mockLogger.error).toHaveBeenCalledWith(writeError);
  });
});
