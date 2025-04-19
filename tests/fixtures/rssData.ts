const mockRssData = {
  blog: [
    {
      title: 'Non-Featured Post 1',
      slug: '/blog/non-featured-post-1',
      excerpt: 'This is a non-featured post',
      date: '2023-07-05',
      featured: false
    },
    {
      title: 'Test Post 1',
      slug: '/blog/test-post-1',
      excerpt: 'This is a featured test post',
      date: '2023-07-07',
      featured: true,
      cover: '/img/test-cover.jpg'
    },
    {
      title: 'Another Featured Post',
      slug: '/blog/another-featured-post',
      excerpt: 'This is another featured post',
      date: '2023-07-06',
      featured: true,
      cover: '/img/test-cover.svg'
    },
    {
      title: 'Non-Featured Post 2',
      slug: '/blog/non-featured-post-2',
      excerpt: 'This is another non-featured post',
      date: '2023-07-03',
      featured: false,
      cover: '/img/test-cover.webp'
    },
    {
      title: 'Non-Featured Post 3',
      slug: '/blog/non-featured-post-3',
      excerpt: 'This is yet another non-featured post',
      date: '2023-07-04',
      featured: false,
      cover: '/img/test-cover.png'
    },
    {
      title: 'Post with Special Characters: & < > "',
      slug: '/blog/special-chars',
      excerpt: 'Testing HTML entities & encoding',
      date: '2023-07-06T12:00:00Z',
      featured: false
    },
    {
      title: 'Post with UTC Date Format',
      slug: '/blog/utc-date-format',
      excerpt: 'This post uses a UTC date format',
      date: 'Wed, 05 Jul 2023 12:00:00 GMT',
      featured: false
    }
  ]
};

const missingDateMockData = {
  blog: [
    {
      title: 'Post without Date',
      slug: '/blog/no-date-post',
      excerpt: 'This post is missing a date',
      featured: false
    },
    {
      title: 'Valid Post',
      slug: '/blog/valid-post',
      excerpt: 'This post has a valid date',
      date: '2024-07-05',
      featured: true
    }
  ]
};

const incompletePostMockData = {
  blog: [
    {
      slug: '/blog/incomplete-post',
      excerpt: 'This post is incomplete',
      date: '2024-07-05',
      featured: false
    }
  ]
};

const type = 'blog';
const title = 'Test Blog RSS';
const desc = 'Test blog RSS feed';
const outputPath = 'test-output/blog.xml';

export { desc, incompletePostMockData, missingDateMockData, mockRssData, outputPath, title, type };
