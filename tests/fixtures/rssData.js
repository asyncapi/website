const mockRssData = {
  blog: [
    {
      title: 'Non-Featured Post 1',
      slug: '/blog/non-featured-post-1',
      excerpt: 'This is a non-featured post',
      date: '2024-07-05',
      featured: false,
    },
    {
      title: 'Test Post 1',
      slug: '/blog/test-post-1',
      excerpt: 'This is a featured test post',
      date: '2024-07-07',
      featured: true,
      cover: '/img/test-cover.jpg',
    },
    {
      title: 'Another Featured Post',
      slug: '/blog/another-featured-post',
      excerpt: 'This is another featured post',
      date: '2024-07-06',
      featured: true,
      cover: '/img/test-cover.svg',
    },
    {
      title: 'Non-Featured Post 2',
      slug: '/blog/non-featured-post-2',
      excerpt: 'This is another non-featured post',
      date: '2024-07-03',
      featured: false,
      cover: '/img/test-cover.webp',
    },
    {
      title: 'Non-Featured Post 3',
      slug: '/blog/non-featured-post-3',
      excerpt: 'This is yet another non-featured post',
      date: '2024-07-04',
      featured: false,
      cover: '/img/test-cover.png',
    },
  ],
};

const type = 'blog';
const title = 'Test Blog RSS';
const desc = 'Test blog RSS feed';
const outputPath = 'test-output/blog.xml';

module.exports = { mockRssData, title, type, desc, outputPath };