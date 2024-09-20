const fs = require('fs');
const path = require('path');
const rssFeed = require('../scripts/build-rss');
const { mockRssData, title, type, desc } = require('./fixtures/rssData');

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
      await rssFeed(type, title, desc, outputPath);
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
      await rssFeed(type, title, desc, outputPath);
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
      await rssFeed(type, title, desc, outputPath);
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
      await rssFeed(type, title, desc, outputPath);
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
      await rssFeed(type, title, desc, invalidOutputPath);
    } catch (err) {
      error = err;
    }

    expect(error.message).toMatch(/ENOENT|EACCES/);
  });

  it('should throw an error when posts.json is not found', async () => {
    const postsJsonPath = path.join(__dirname, '..', 'config', 'posts.json');
    const tempPath = path.join(__dirname, '..', 'config', 'posts.json.temp');
    
    if (fs.existsSync(postsJsonPath)) {
      fs.renameSync(postsJsonPath, tempPath);
    }
  
    try {
      await rssFeed(type, title, desc, outputPath);
    } catch (err) {
      expect(err.message).toContain('Failed to generate RSS feed');
      expect(err.message).toContain('Cannot find posts.json');
    } finally {
      if (fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, postsJsonPath);
      }
    }
  
  });

  it('should throw an error when posts.json is malformed', async () => {
    jest.doMock('../config/posts.json', () => {
      return { invalidKey: [] };
    }, { virtual: true });

    let error;
    try {
      await rssFeed(type, title, desc, outputPath);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('Failed to generate RSS feed');
    expect(error.message).toContain('Cannot read properties of undefined');
  });

  it('should handle empty posts array', async () => {
    const emptyMockData = { blog: [] };
    jest.doMock('../config/posts.json', () => emptyMockData, { virtual: true });

    let error;
    try {
      await rssFeed(type, title, desc, outputPath);
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();
    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('<rss version="2.0"');
    expect(fileContent).not.toContain('<item>');
  });
});