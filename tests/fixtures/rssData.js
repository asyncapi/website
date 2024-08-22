const mockRssData = {
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
            date: '2024-07-06',
            featured: false
        },
        {
            title: 'PNG Post',
            slug: '/blog/png-post',
            excerpt: 'This is a post with PNG image',
            date: '2024-07-05',
            featured: false,
            cover: '/img/test-cover.png'
        },
        {
            title: 'SVG Post',
            slug: '/blog/svg-post',
            excerpt: 'This is a post with SVG image',
            date: '2024-07-04',
            featured: false,
            cover: '/img/test-cover.svg'
        },
        {
            title: 'WebP Post',
            slug: '/blog/webp-post',
            excerpt: 'This is a post with WebP image',
            date: '2024-07-03',
            featured: false,
            cover: '/img/test-cover.webp'
        }
    ]
};

module.exports = { mockRssData };
