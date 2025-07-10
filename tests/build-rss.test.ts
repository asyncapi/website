import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';

import { rssFeed } from '../scripts/build-rss';
import { desc, incompletePostMockData, mockRssData, title, type } from './fixtures/rssData';

const parser = new XMLParser({ ignoreAttributes: false });

describe('rssFeed', () => {
  const testOutputDir = path.join(__dirname, '..', 'public', 'test-output');
  const outputPath = 'test-output/rss.xml';

  beforeAll(async () => {
    try {
      await fs.promises.mkdir(testOutputDir, { recursive: true });
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error while creating temp dir: ${err.message}`);
      }
      throw new Error('Error while creating temp dir: Unknown error');
    }
  });

  afterAll(async () => {
    try {
      const files = await fs.promises.readdir(testOutputDir);

      await Promise.all(files.map((file) => fs.promises.unlink(path.join(testOutputDir, file))));
      await fs.promises.rmdir(testOutputDir);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error while deleting temp dir: ${err.message}`);
      }
      throw new Error('Error while deleting temp dir: Unknown error');
    }
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should generate RSS feed and write to file', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined();

    const filePath = path.join(__dirname, '..', 'public', outputPath);

    expect(fs.existsSync(filePath)).toBe(true);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain('<rss version="2.0"');
  });

  it('should prioritize featured posts over non-featured ones', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined();

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const parsedContent = parser.parse(fileContent);
    const itemTitles = parsedContent.rss.channel.item.map((item: { title: any }) => item.title);

    expect(itemTitles[0]).toBe('Test Post 1');
    expect(itemTitles[1]).toBe('Another Featured Post');

    expect(itemTitles[2]).toBe('Post with Special Characters: & < > "');
    expect(itemTitles[3]).toBe('Post with UTC Date Format');
    expect(itemTitles[4]).toBe('Non-Featured Post 1');
    expect(itemTitles[5]).toBe('Non-Featured Post 3');
  });

  it('should sort posts by date in descending order', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined();

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const parsedContent = parser.parse(fileContent);
    const itemTitles = parsedContent.rss.channel.item.map((item: { title: any }) => item.title);

    expect(itemTitles[0]).toBe('Test Post 1');
    expect(itemTitles[1]).toBe('Another Featured Post');
    expect(itemTitles[2]).toBe('Post with Special Characters: & < > "');
    expect(itemTitles[3]).toBe('Post with UTC Date Format');
    expect(itemTitles[4]).toBe('Non-Featured Post 1');
    expect(itemTitles[5]).toBe('Non-Featured Post 3');
  });

  it('should set correct enclosure type based on image extension', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined();

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.png"');
    expect(fileContent).toContain('type="image/png"');
    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.svg"');
    expect(fileContent).toContain('type="image/svg+xml"');
    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.webp"');
    expect(fileContent).toContain('type="image/webp"');
  });

  it('should catch and handle errors when write operation fails', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    const invalidOutputPath = 'invalid/path';

    await expect(rssFeed(type, title, desc, invalidOutputPath)).rejects.toThrow(/ENOENT|EACCES/);
  });

  it('should throw an error when posts.json is malformed', async () => {
    jest.doMock(
      '../config/posts.json',
      () => {
        return { invalidKey: [] };
      },
      { virtual: true }
    );

    await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow('Failed to generate RSS feed');
  });

  it('should handle empty posts array', async () => {
    const emptyMockData = { blog: [] };

    jest.doMock('../config/posts.json', () => emptyMockData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined();

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain('<rss version="2.0"');
    expect(fileContent).not.toContain('<item>');
  });

  it('should throw an error when post is missing required fields', async () => {
    jest.doMock('../config/posts.json', () => incompletePostMockData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow('Missing required fields');
  });

  it('should properly identify posts missing dates and include them in error message', async () => {
    // Create mock data with multiple posts missing dates to test the mapping function
    const multiMissingDatesMockData = {
      blog: [
        { title: 'Post 1 without Date', slug: '/blog/post1-no-date', excerpt: 'Test excerpt' },
        { title: 'Post 2 without Date', slug: '/blog/post2-no-date', excerpt: 'Test excerpt' },
        { title: null, slug: '/blog/post3-no-date-no-title', excerpt: 'Test excerpt' }, // Test post with no title to ensure slug is used
        { title: 'Post with Date', slug: '/blog/post-with-date', excerpt: 'Test excerpt', date: '2023-01-01' }
      ]
    };

    jest.doMock('../config/posts.json', () => multiMissingDatesMockData, { virtual: true });

    // This should specifically test the error thrown by the missingDatePosts check
    await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow(
      'Missing date in posts: Post 1 without Date, Post 2 without Date, /blog/post3-no-date-no-title'
    );
  });

  it('should use default mime type when encountering an unsupported image extension', async () => {
    // Create mock data with an unsupported extension
    const mockDataWithUnknownExt = {
      ...mockRssData,
      blog: [
        ...mockRssData.blog,
        {
          title: 'Post with unknown image extension',
          slug: '/blog/unknown-ext',
          excerpt: 'This is a test post with an unknown image extension',
          date: '2023-01-01',
          cover: '/img/test-cover.unknown'
        }
      ]
    };

    jest.doMock('../config/posts.json', () => mockDataWithUnknownExt, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined();

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.unknown"');
    expect(fileContent).toContain('type="image/jpeg"'); // Should use default mime type
  });
});
