import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

import { logger } from '../../scripts/helpers/logger';
import type { FrontMatter } from '../../scripts/markdown/check-markdown';
import {
  checkMarkdownFiles,
  isValidURL,
  main,
  validateBlogs,
  validateDocs
} from '../../scripts/markdown/check-markdown';

jest.mock('../../scripts/helpers/logger', () => ({
  logger: { error: jest.fn(), warn: jest.fn() }
}));

describe('Frontmatter Validator', () => {
  let tempDir: string;
  let mockConsoleError: jest.SpyInstance;
  let mockProcessExit: jest.SpyInstance;

  beforeEach(async () => {
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    mockProcessExit = jest.spyOn(process, 'exit').mockImplementation();
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-config'));
  });

  afterEach(async () => {
    mockConsoleError.mockRestore();
    mockProcessExit.mockRestore();
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('validates authors array and returns specific errors', async () => {
    const frontmatter = {
      title: 'Test Blog',
      date: '2024-01-01',
      type: 'blog',
      tags: ['test'],
      cover: 'cover.jpg',
      authors: [{ name: 'John' }, { photo: 'jane.jpg' }, { name: 'Bob', photo: 'bob.jpg', link: 'not-a-url' }]
    } as FrontMatter;

    const errors = validateBlogs(frontmatter);

    expect(errors).toEqual(
      expect.arrayContaining([
        'Author at index 0 is missing a photo',
        'Author at index 1 is missing a name',
        'Invalid URL for author at index 2: not-a-url'
      ])
    );
  });

  it('validates docs frontmatter for required fields', async () => {
    const frontmatter = { title: 123, weight: 'not-a-number' };
    // @ts-ignore, to simulate invalid frontmatter
    const errors = validateDocs(frontmatter);

    expect(errors).toEqual(
      expect.arrayContaining(['Title is missing or not a string', 'Weight is missing or not a number'])
    );
  });

  it('checks for errors in markdown files in a directory', async () => {
    await fs.writeFile(path.join(tempDir, 'invalid.md'), '---\ntitle: Invalid Blog\n---');
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    await checkMarkdownFiles(tempDir, validateBlogs);

    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Errors in file invalid.md:'));
    mockConsoleLog.mockRestore();
  });

  it('returns multiple validation errors for invalid blog frontmatter', async () => {
    const frontmatter = {
      title: 123,
      date: 'invalid-date',
      type: 'blog',
      tags: 'not-an-array',
      cover: ['not-a-string'],
      authors: { name: 'John Doe' }
    };
    // @ts-ignore, to simulate invalid frontmatter
    const errors = validateBlogs(frontmatter);

    expect(errors).toEqual([
      'Invalid date format: invalid-date',
      'Tags should be an array',
      'Cover must be a string',
      'Authors should be an array'
    ]);
  });

  it('logs error to console when an error occurs in checkMarkdownFiles', async () => {
    const invalidFolderPath = path.join(tempDir, 'non-existent-folder');
    const mockLoggerError = jest.spyOn(logger, 'error').mockImplementation();

    await expect(checkMarkdownFiles(invalidFolderPath, validateBlogs)).rejects.toThrow('ENOENT');

    expect(mockLoggerError.mock.calls[0][0]).toContain('Error in directory');
  });

  it('skips the "reference/specification" folder during validation', async () => {
    const referenceSpecDir = path.join(tempDir, 'reference', 'specification');

    await fs.mkdir(referenceSpecDir, { recursive: true });
    await fs.writeFile(path.join(referenceSpecDir, 'skipped.md'), '---\ntitle: Skipped File\n---');

    const mockLoggerWarn = jest.spyOn(logger, 'warn').mockImplementation();

    await checkMarkdownFiles(tempDir, validateDocs);
    expect(mockLoggerWarn).not.toHaveBeenCalledWith(
      expect.stringContaining('Errors in file reference/specification/skipped.md')
    );
    mockLoggerWarn.mockRestore();
  });

  it('processes files outside the "reference/specification" folder', async () => {
    const validDir = path.join(tempDir, 'valid');

    await fs.mkdir(validDir, { recursive: true });
    await fs.writeFile(path.join(validDir, 'valid.md'), '---\ntitle: Valid File\n---');

    const mockLoggerWarn = jest.spyOn(logger, 'warn').mockImplementation();

    await checkMarkdownFiles(tempDir, validateDocs);

    // Instead of trying to match the exact path format, check that the filename is present in the warning
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('valid.md:'));
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('Weight is missing or not a number'));
    mockLoggerWarn.mockRestore();
  });

  it('logs and rejects when an exception occurs while processing a file', async () => {
    const filePath = path.join(tempDir, 'invalid.md');

    await fs.writeFile(filePath, '---\ntitle: Valid Title\n---');

    const mockReadFile = jest.spyOn(fs, 'readFile').mockRejectedValue(new Error('Test readFile error'));

    await expect(checkMarkdownFiles(tempDir, validateBlogs)).rejects.toThrow('Test readFile error');
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Error in directory'), expect.any(Error));

    mockReadFile.mockRestore();
  });

  it('should handle main function errors and exit with status 1', async () => {
    const mockReaddir = jest.spyOn(fs, 'readdir').mockRejectedValue(new Error('Test error'));

    await main();

    expect(mockProcessExit).toHaveBeenCalledWith(1);
    expect(logger.error).toHaveBeenCalledWith('Failed to validate markdown files:', expect.any(Error));

    mockReaddir.mockRestore(); // Restore the mock to prevent affecting other tests
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

  it('should throw an error if frontmatter is missing', () => {
    // @ts-ignore, to simulate missing frontmatter
    const errors = validateBlogs(undefined);

    expect(errors).toEqual(['Frontmatter is missing']);
  });
  it('does not push errors if docs frontmatter is valid', () => {
    const frontmatter = { title: 'Valid Title', weight: 10 };

    // @ts-ignore, to simulate valid frontmatter
    const errors = validateDocs(frontmatter);

    expect(errors).toBeNull();
  });

  it('skips non-directory, non-md files without errors', async () => {
    const testFile = path.join(tempDir, 'sample.txt');

    await fs.writeFile(testFile, 'This is just a text file');
    await checkMarkdownFiles(tempDir, validateBlogs);
    expect(logger.warn).not.toHaveBeenCalledWith(expect.stringContaining('Errors in file sample.txt'));
  });

  it('processes markdown files in directories other than reference/specification', async () => {
    const otherDir = path.join(tempDir, 'otherDir');

    await fs.mkdir(otherDir, { recursive: true });
    await fs.writeFile(path.join(otherDir, 'test.md'), '---\ntitle: No Weight\n---');

    const mockLoggerWarn = jest.spyOn(logger, 'warn').mockImplementation();

    await checkMarkdownFiles(tempDir, validateDocs);

    // Expect a warning about missing weight
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining(`Errors in file ${path.join('otherDir', 'test.md')}:`)
    );
    mockLoggerWarn.mockRestore();
  });
});
