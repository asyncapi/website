const fs = require('fs');
const path = require('path');
const rssFeed = require('../scripts/build-rss');
const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser({ ignoreAttributes: false });
const { mockRssData, title, type, desc, missingDateMockData, incompletePostMockData } = require('./fixtures/rssData');

describe('rssFeed', () => {
  const testOutputDir = path.join(__dirname, '..', 'public', 'test-output');
  const outputPath = 'test-output/rss.xml';

  beforeAll(async () => {
    try {
      await fs.promises.mkdir(testOutputDir, { recursive: true });
    } catch (err) {
      throw new Error(`Error while creating temp dir: ${err.message}`);
    }
  });

  afterAll(async () => {
    try {
      const files = await fs.promises.readdir(testOutputDir);
      await Promise.all(files.map(file => fs.promises.unlink(path.join(testOutputDir, file))));
      await fs.promises.rmdir(testOutputDir);
    } catch (err) {
      throw new Error(`Error while deleting temp dir: ${err.message}`);
    }
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should generate RSS feed and write to file', async () => {
    
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined()

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
    const itemTitles = parsedContent.rss.channel.item.map(item => item.title);
  
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
    const itemTitles = parsedContent.rss.channel.item.map(item => item.title);
  
    expect(itemTitles[0]).toBe('Test Post 1');
    expect(itemTitles[1]).toBe('Another Featured Post')
    expect(itemTitles[2]).toBe('Post with Special Characters: & < > "');
    expect(itemTitles[3]).toBe('Post with UTC Date Format');
    expect(itemTitles[4]).toBe('Non-Featured Post 1');
    expect(itemTitles[5]).toBe('Non-Featured Post 3');
  });

  it('should set correct enclosure type based on image extension', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined()

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

    const invalidOutputPath = "invalid/path";

    await expect(rssFeed(type, title, desc, invalidOutputPath)).rejects.toThrow(/ENOENT|EACCES/);

  });

  it('should throw an error when posts.json is malformed', async () => {
    jest.doMock('../config/posts.json', () => {
      return { invalidKey: [] };
    }, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow('Failed to generate RSS feed');

  });

  it('should handle empty posts array', async () => {
    const emptyMockData = { blog: [] };
    jest.doMock('../config/posts.json', () => emptyMockData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined()

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('<rss version="2.0"');
    expect(fileContent).not.toContain('<item>');
  });

  it('should throw an error when post is missing required fields', async () => {

    jest.doMock('../config/posts.json', () => incompletePostMockData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow('Missing required fields');

  });

  it('should throw an error when a post is missing a date field during sorting', async () => {

    jest.doMock('../config/posts.json', () => missingDateMockData, { virtual: true });

    await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow('Failed to generate RSS feed: Missing date in posts: Post without Date');

  });
  
});
