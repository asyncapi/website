const fs = require('fs');
const path = require('path');
const rssFeed = require('../scripts/build-rss');

jest.mock('../config/posts.json', () => ({
  blog: [
    {
      title: 'Test Post 1',
      slug: '/blog/test-post-1',
      excerpt: 'This is a test post',
      date: '2024-07-07',
      featured: true,
      cover: '/img/test-cover.jpg'
    },
    {
      title: 'Test Post 2',
      slug: '/blog/test-post-2',
      excerpt: 'This is another test post',
      date: '2024-07-07',
      featured: false
    }
  ]
}), { virtual: true });

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
    
    const firstItemIndex = fileContent.indexOf('<item>');
    const secondItemIndex = fileContent.indexOf('<item>', firstItemIndex + 1);

    const firstItemTitleMatch = fileContent.slice(firstItemIndex, secondItemIndex).match(/<title>(.*?)<\/title>/);
    const secondItemTitleMatch = fileContent.slice(secondItemIndex).match(/<title>(.*?)<\/title>/);

    expect(firstItemTitleMatch[1]).toBe('Test Post 1');
    expect(secondItemTitleMatch[1]).toBe('Test Post 2');
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

    const posts = require('../config/posts.json');
    posts.blog[0].cover = '/img/test-cover.png';

    rssFeed(type, title, desc, outputPath);

    const filePath = path.join(__dirname, '..', 'public', outputPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(fileContent).toContain('<enclosure url="https://www.asyncapi.com/img/test-cover.png"');
    expect(fileContent).toContain('type="image/png"');
  });
});