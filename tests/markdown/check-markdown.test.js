const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const pLimit = require('p-limit');
const {
  isValidURL,
  main,
  validateBlogs,
  validateDocs,
  checkMarkdownFiles,
  getConcurrencyLimit
} = require('../../scripts/markdown/check-markdown');

describe('Frontmatter Validator', () => {
  let tempDir;
  let mockConsoleError;
  let mockProcessExit;
  let originalEnv;

  beforeEach(async () => {
    // Store original environment variables
    originalEnv = { ...process.env };

    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    mockProcessExit = jest.spyOn(process, 'exit').mockImplementation();
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-config'));
  });

  afterEach(async () => {
    // Restore original environment variables
    process.env = originalEnv;

    mockConsoleError.mockRestore();
    mockProcessExit.mockRestore();
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('Concurrency Limit Validation', () => {
    it('returns default concurrency limit when no env var is set', () => {
      process.env.MARKDOWN_CONCURRENCY_LIMIT = undefined;
      const limit = getConcurrencyLimit();
      expect(limit).toBe(10);
    });

    it('returns default concurrency limit when env var is invalid', () => {
      const mockWarn = jest.spyOn(console, 'warn').mockImplementation();

      // Test various invalid inputs
      const invalidInputs = ['abc', '-1', '0', ' '];
      invalidInputs.forEach((input) => {
        process.env.MARKDOWN_CONCURRENCY_LIMIT = input;
        const limit = getConcurrencyLimit();
        expect(limit).toBe(10);
      });

      mockWarn.mockRestore();
    });

    it('returns custom concurrency limit when env var is a valid positive integer', () => {
      process.env.MARKDOWN_CONCURRENCY_LIMIT = '20';
      const limit = getConcurrencyLimit();
      expect(limit).toBe(20);
    });

    it('respects concurrency limit during file processing', async () => {
      const processingTimes = [];
      const mockValidateFunction = jest.fn().mockImplementation(() => {
        const startTime = Date.now();
        processingTimes.push(startTime);
        // Simulate some processing time
        return new Promise(resolve => setTimeout(resolve, 50));
      });

      // Create multiple test files
      for (let i = 0; i < 20; i++) {
        await fs.writeFile(
          path.join(tempDir, `test${i}.md`),
          '---\ntitle: Test\n---'
        );
      }

      const limit = pLimit(5); // Set limit to 5
      await checkMarkdownFiles(tempDir, mockValidateFunction, '', limit);

      // Group processing times by 5 (our limit) and verify gaps between groups
      const sortedTimes = processingTimes.sort();
      const groups = [];
      for (let i = 0; i < sortedTimes.length; i += 5) {
        groups.push(sortedTimes.slice(i, i + 5));
      }

      // Verify that each group of 5 started processing together
      groups.forEach(group => {
        const groupSpread = Math.max(...group) - Math.min(...group);
        expect(groupSpread).toBeLessThan(50); // Should start within 50ms of each other
      });

      // Verify that the mock validate function was called for all files
      expect(mockValidateFunction).toHaveBeenCalledTimes(20);
    });
  });

  it('validates authors array and returns specific errors', async () => {
    const frontmatter = {
      title: 'Test Blog',
      date: '2024-01-01',
      type: 'blog',
      tags: ['test'],
      cover: 'cover.jpg',
      authors: [
        { name: 'John' },
        { photo: 'jane.jpg' },
        { name: 'Bob', photo: 'bob.jpg', link: 'not-a-url' },
      ],
    };

    const errors = validateBlogs(frontmatter);
    expect(errors).toEqual(
      expect.arrayContaining([
        'Author at index 0 is missing a photo',
        'Author at index 1 is missing a name',
        'Invalid URL for author at index 2: not-a-url',
      ])
    );
  });

  it('validates docs frontmatter for required fields', async () => {
    const frontmatter = { title: 123, weight: 'not-a-number' };
    const errors = validateDocs(frontmatter);
    expect(errors).toEqual(
        expect.arrayContaining(['Title is missing or not a string', 'Weight is missing or not a number'])
    );
  });

  it('checks for errors in markdown files in a directory', async () => {
    await fs.writeFile(
      path.join(tempDir, 'invalid.md'),
      `---\ntitle: Invalid Blog\n---`,
    );
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    await checkMarkdownFiles(tempDir, validateBlogs, '', pLimit(10));

    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining('Errors in file invalid.md:'),
    );
    mockConsoleLog.mockRestore();
  });

  it('returns multiple validation errors for invalid blog frontmatter', async () => {
    const frontmatter = {
      title: 123,
      date: 'invalid-date',
      type: 'blog',
      tags: 'not-an-array',
      cover: ['not-a-string'],
      authors: { name: 'John Doe' },
    };
    const errors = validateBlogs(frontmatter);

    expect(errors).toEqual([
      'Invalid date format: invalid-date',
      'Tags should be an array',
      'Cover must be a string',
      'Authors should be an array',
    ]);
  });

  it('logs error to console when an error occurs in checkMarkdownFiles', async () => {
    const invalidFolderPath = path.join(tempDir, 'non-existent-folder');

    await expect(
      checkMarkdownFiles(invalidFolderPath, validateBlogs, '', pLimit(10)),
    ).rejects.toThrow('ENOENT');

    expect(mockConsoleError.mock.calls[0][0]).toContain('Error in directory');
  });

  it('skips the "reference/specification" folder during validation', async () => {
    const referenceSpecDir = path.join(tempDir, 'reference', 'specification');
    await fs.mkdir(referenceSpecDir, { recursive: true });
    await fs.writeFile(
      path.join(referenceSpecDir, 'skipped.md'),
      `---\ntitle: Skipped File\n---`,
    );

    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    await checkMarkdownFiles(tempDir, validateDocs, '', pLimit(10));

    expect(mockConsoleLog).not.toHaveBeenCalledWith(
      expect.stringContaining(
        'Errors in file reference/specification/skipped.md',
      ),
    );
    mockConsoleLog.mockRestore();
  });

  it('logs and rejects when an exception occurs while processing a file', async () => {
    const filePath = path.join(tempDir, 'invalid.md');
    await fs.writeFile(filePath, `---\ntitle: Valid Title\n---`);

    const mockReadFile = jest.spyOn(fs, 'readFile').mockRejectedValue(new Error('Test readFile error'));

    await expect(
      checkMarkdownFiles(tempDir, validateBlogs, '', pLimit(10)),
    ).rejects.toThrow('Test readFile error');
    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining(`Error in directory`),
      expect.any(Error),
    );

    mockReadFile.mockRestore();
  });

  it('should handle main function errors and exit with status 1', async () => {
    jest.spyOn(fs, 'readdir').mockRejectedValue(new Error('Test error'));

    await main();

    expect(mockProcessExit).toHaveBeenCalledWith(1);

    expect(mockConsoleError).toHaveBeenCalledWith(
      'Failed to validate markdown files:',
      expect.any(Error),
    );
  });

  it('should handle successful main function execution', async () => {
    await main();

    expect(mockConsoleError).not.toHaveBeenCalledWith();
  });

  it('should return true or false for URLs', () => {
    expect(isValidURL('http://example.com')).toBe(true);
    expect(isValidURL('https://www.example.com')).toBe(true);
    expect(isValidURL('ftp://ftp.example.com')).toBe(true);
    expect(isValidURL('invalid-url')).toBe(false);
    expect(isValidURL('/path/to/file')).toBe(false);
    expect(isValidURL('www.example.com')).toBe(false);
  });
});