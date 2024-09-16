const fs = require('fs');
const path = require('path');
const rssFeed = require('../scripts/build-rss');
const { mockRssData, title, type, desc, outputPath } = require('./fixtures/rssData');

jest.mock('../config/posts.json', () => mockRssData, { virtual: true });

describe('rssFeed', () => {
  const testOutputDir = path.join(__dirname, '..', 'public', 'test-output');

  beforeEach(() => {
    fs.mkdirSync(testOutputDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testOutputDir)) {
      fs.readdirSync(testOutputDir).forEach(file => {
        fs.unlinkSync(path.join(testOutputDir, file));
      });
      fs.rmdirSync(testOutputDir);
    }
  });

  it('should generate RSS feed and write to file', () => {
    try {
      rssFeed(type, title, desc, outputPath);
    } catch (err) {
      console.error('Error encountered during test execution:', err)
    }

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    expect(fs.existsSync(filePath)).toBe(true);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('<rss version="2.0"');
    expect(fileContent).toContain('<title>Test Blog RSS</title>');
  });

  it('should prioritize featured posts over non-featured ones', () => {
    try {
      rssFeed(type, title, desc, outputPath);
    } catch (err) {
      console.error('Error encountered during test execution:', err)
    }

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const itemTitles = fileContent.match(/<title>(.*?)<\/title>/g);

    expect(itemTitles[1]).toContain('Test Post 1');
    expect(itemTitles[2]).toContain('Another Featured Post');
    expect(itemTitles[3]).toContain('Non-Featured Post 1');
  });

  it('should sort posts by date in descending order', () => {
    try {
      rssFeed(type, title, desc, outputPath);
    } catch (err) {
      console.error('Error encountered during test execution:', err)
    }

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const itemTitles = fileContent.match(/<title>(.*?)<\/title>/g);

    expect(itemTitles[1]).toContain('Test Post 1');
    expect(itemTitles[2]).toContain('Another Featured Post');
    expect(itemTitles[3]).toContain('Non-Featured Post 1');
    expect(itemTitles[4]).toContain('Non-Featured Post 3');
    expect(itemTitles[5]).toContain('Non-Featured Post 2');
  });

  it('should set correct enclosure type based on image extension', () => {
    try {
      rssFeed(type, title, desc, outputPath);
    } catch (err) {
      console.error('Error encountered during test execution:', err)
    }

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.png"');
    expect(fileContent).toContain('type="image/png"');
    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.svg"');
    expect(fileContent).toContain('type="image/svg+xml"');
    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.webp"');
    expect(fileContent).toContain('type="image/webp"');
  });

  it('should throw error when write operation fails', () => {
    const outputPath = "invalid/path"
    try {
      rssFeed(type, title, desc, outputPath)
    } catch (err) {
      expect(err.message).toMatch(/ENOENT|EACCES/);
    }
  });

});
