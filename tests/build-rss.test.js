const fs = require('fs');
const path = require('path');
const rssFeed = require('../scripts/build-rss');
const { mockRssData, title, type, desc, missingDateMockData, incompletePostMockData } = require('./fixtures/rssData');

describe('rssFeed', () => {
  const testOutputDir = path.join(__dirname, '..', 'public', 'test-output');
  const outputPath = 'test-output/rss.xml';

  beforeAll(() => {
    if (!fs.existsSync(testOutputDir)) {
      fs.mkdirSync(testOutputDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(testOutputDir)) {
      fs.readdirSync(testOutputDir).forEach(file => {
        fs.unlinkSync(path.join(testOutputDir, file));
      });
      fs.rmdirSync(testOutputDir);
    }
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should generate RSS feed and write to file', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    let error;
    try {
      await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined()
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();
    const filePath = path.join(__dirname, '..', 'public', outputPath);
    expect(fs.existsSync(filePath)).toBe(true);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('<rss version="2.0"');
  });

  it('should prioritize featured posts over non-featured ones', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    let error;
    try {
      await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined()
    } catch (err) {
      error = err
    }

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const itemTitles = fileContent.match(/<title>(.*?)<\/title>/g);

    expect(error).toBeUndefined();
    expect(itemTitles[1]).toContain('Test Post 1');
    expect(itemTitles[2]).toContain('Another Featured Post');
    expect(itemTitles[3]).toContain('Non-Featured Post 1');
  });

  it('should sort posts by date in descending order', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    let error;
    try {
      await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined()
    } catch (err) {
      error = err
    }

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const itemTitles = fileContent.match(/<title>(.*?)<\/title>/g);

    expect(error).toBeUndefined();
    expect(itemTitles[1]).toContain('Test Post 1');
    expect(itemTitles[2]).toContain('Another Featured Post');
    expect(itemTitles[3]).toContain('Non-Featured Post 1');
    expect(itemTitles[4]).toContain('Non-Featured Post 3');
    expect(itemTitles[5]).toContain('Non-Featured Post 2');
  });

  it('should set correct enclosure type based on image extension', async () => {
    jest.doMock('../config/posts.json', () => mockRssData, { virtual: true });

    let error;
    try {
      await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined()
    } catch (err) {
      error = err
    }

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(error).toBeUndefined();
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

    let error;
    try {
      await expect(rssFeed(type, title, desc, invalidOutputPath))
      .rejects.toThrow(/ENOENT|EACCES/);
    } catch (err) {
      error = err;
      expect(error.message).toMatch(/ENOENT|EACCES/);
    }
  });

  it('should throw an error when posts.json is malformed', async () => {
    jest.doMock('../config/posts.json', () => {
      return { invalidKey: [] };
    }, { virtual: true });

    let error;
    try {
      await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow('Failed to generate RSS feed');
    } catch (err) {
      error = err;
      expect(error).toBeDefined();
      expect(error.message).toContain('Failed to generate RSS feed');
    }
  });

  it('should handle empty posts array', async () => {
    const emptyMockData = { blog: [] };
    jest.doMock('../config/posts.json', () => emptyMockData, { virtual: true });

    let error;
    try {
      await expect(rssFeed(type, title, desc, outputPath)).resolves.toBeUndefined()
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();
    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('<rss version="2.0"');
    expect(fileContent).not.toContain('<item>');
  });

  it('should throw an error when post is missing required fields', async () => {

    jest.doMock('../config/posts.json', () => incompletePostMockData, { virtual: true });

    let error;
    try {
      await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow('Missing required fields');
    } catch (err) {
      error = err;
      expect(error).toBeDefined();
      expect(error.message).toContain('Missing required fields');
    }
  });

  it('should throw an error when a post is missing a date field during sorting', async () => {
  
    jest.doMock('../config/posts.json', () => missingDateMockData, { virtual: true });
  
    let error;
    try {
      await expect(rssFeed(type, title, desc, outputPath)).rejects.toThrow('Missing date in post data');
    } catch (err) {
      error = err;
      expect(error).toBeDefined();
      expect(error.message).toContain('Missing date in post data');
    }
  });
});
