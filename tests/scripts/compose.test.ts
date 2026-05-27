jest.mock('fs', () => ({
  writeFile: jest.fn((_path: any, _data: any, _opts: any, cb: any) => cb(null))
}));
jest.mock('inquirer', () => ({
  prompt: jest.fn().mockResolvedValue({
    title: 'Default Test Post',
    excerpt: 'Default excerpt',
    tags: '',
    type: 'Engineering',
    canonical: ''
  })
}));
jest.mock('dayjs', () => () => ({ format: () => '2026-01-15T12:00:00+0000' }));
jest.mock('../../scripts/helpers/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn() }
}));

import fs from 'fs';
import inquirer from 'inquirer';
import { genFrontMatter, generateFileName, run } from '../../scripts/compose';

const baseAnswers = {
  title: 'Hello World',
  excerpt: 'A test post excerpt',
  tags: 'asyncapi, testing',
  type: 'Engineering',
  canonical: 'https://example.com'
};

describe('generateFileName', () => {
  it('converts spaces to hyphens', () => {
    expect(generateFileName('Hello World Post')).toBe('hello-world-post');
  });

  it('lowercases the title', () => {
    expect(generateFileName('AsyncAPI Tutorial')).toBe('asyncapi-tutorial');
  });

  it('removes special characters', () => {
    expect(generateFileName('Hello! World? 2026')).toBe('hello-world-2026');
  });

  it('collapses consecutive hyphens', () => {
    expect(generateFileName('Hello  World')).toBe('hello-world');
  });

  it('returns empty string for empty input', () => {
    expect(generateFileName('')).toBe('');
  });
});

describe('genFrontMatter', () => {
  it('generates complete front matter from provided answers', () => {
    const result = genFrontMatter(baseAnswers);

    expect(result).toContain('title: Hello World');
    expect(result).toContain('date: 2026-01-15T12:00:00+0000');
    expect(result).toContain('type: Engineering');
    expect(result).toContain("'asyncapi','testing'");
    expect(result).toContain('canonical: https://example.com');
    expect(result).toContain('excerpt: A test post excerpt');
    expect(result).toMatch(/^---/);
    expect(result).toMatch(/---\s*$/);
  });

  it('defaults title to "Untitled" when empty', () => {
    const result = genFrontMatter({ ...baseAnswers, title: '' });

    expect(result).toContain('title: Untitled');
  });

  it('defaults excerpt to a space when empty', () => {
    const result = genFrontMatter({ ...baseAnswers, excerpt: '' });

    expect(result).toContain('excerpt:  ');
  });

  it('leaves canonical blank when not provided', () => {
    const result = genFrontMatter({ ...baseAnswers, canonical: '' });

    expect(result).toContain('canonical: \n');
  });

  it('produces an empty tags array when tags input is empty', () => {
    const result = genFrontMatter({ ...baseAnswers, tags: '' });

    expect(result).toContain('tags: []');
  });

  it('trims whitespace from each tag', () => {
    const result = genFrontMatter({ ...baseAnswers, tags: ' react , typescript , nextjs ' });

    expect(result).toContain("'react','typescript','nextjs'");
  });
});

describe('run', () => {
  const mockWriteFile = jest.mocked(fs.writeFile as jest.MockedFunction<typeof fs.writeFile>);

  beforeEach(() => {
    jest.clearAllMocks();
    mockWriteFile.mockImplementation((_path: any, _data: any, _opts: any, cb: any) => cb(null));
  });

  it('writes the blog post to pages/blog/<slug>.md', async () => {
    jest.mocked(inquirer.prompt).mockResolvedValueOnce({ ...baseAnswers, title: 'My New Blog Post' });

    await run();

    expect(mockWriteFile).toHaveBeenCalledWith(
      'pages/blog/my-new-blog-post.md',
      expect.stringContaining('title: My New Blog Post'),
      expect.anything(),
      expect.any(Function)
    );
  });

  it('uses "untitled" as the filename when title is empty', async () => {
    jest.mocked(inquirer.prompt).mockResolvedValueOnce({ ...baseAnswers, title: '' });

    await run();

    expect(mockWriteFile).toHaveBeenCalledWith(
      'pages/blog/untitled.md',
      expect.anything(),
      expect.anything(),
      expect.any(Function)
    );
  });

  it('rejects when the file write fails', async () => {
    const writeError = new Error('EEXIST: file already exists');
    jest.mocked(inquirer.prompt).mockResolvedValueOnce(baseAnswers);
    mockWriteFile.mockImplementation((_path: any, _data: any, _opts: any, cb: any) => cb(writeError));

    await expect(run()).rejects.toThrow('EEXIST: file already exists');
  });
});
