const fs = require('fs');
const path = require('path');
const rssFeed = require('../scripts/build-rss');
const { mockRssData } = require('./fixtures/rssData');

jest.mock('../config/posts.json', () => mockRssData, { virtual: true })

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
    const type = 'blog';
    const title = 'Test Blog RSS';
    const desc = 'Test blog RSS feed';
    const outputPath = 'test-output/blog.xml';

    rssFeed(type, title, desc, outputPath);

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    expect(fs.existsSync(filePath)).toBe(true);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent).toContain('<rss version="2.0"');
    expect(fileContent).toContain('<title>Test Blog RSS</title>');
  });

  it('should sort posts by date and featured status', () => {
    const type = 'blog';
    const title = 'Test Blog RSS';
    const desc = 'Test blog RSS feed';
    const outputPath = 'test-output/blog.xml';

    rssFeed(type, title, desc, outputPath);

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const itemTitles = fileContent.match(/<title>(.*?)<\/title>/g);
    expect(itemTitles[1]).toContain('Test Post 1');
    expect(itemTitles[2]).toContain('Test Post 2');
    expect(itemTitles[3]).toContain('PNG Post');
    expect(itemTitles[4]).toContain('SVG Post');
    expect(itemTitles[5]).toContain('WebP Post');
  });

  it('should add enclosure for posts with cover image', () => {
    const type = 'blog';
    const title = 'Test Blog RSS';
    const desc = 'Test blog RSS feed';
    const outputPath = 'test-output/blog.xml';

    rssFeed(type, title, desc, outputPath);

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.jpg"');
    expect(fileContent).toContain('type="image/jpeg"');
  });

  it('should set correct enclosure type based on image extension', () => {
    const type = 'blog';
    const title = 'Test Blog RSS';
    const desc = 'Test blog RSS feed';
    const outputPath = 'test-output/blog.xml';

    rssFeed(type, title, desc, outputPath);

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.png"');
    expect(fileContent).toContain('type="image/png"');
    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.svg"');
    expect(fileContent).toContain('type="image/svg+xml"');
    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.webp"');
    expect(fileContent).toContain('type="image/webp"');
  });
});