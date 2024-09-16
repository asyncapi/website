const { addDocButtons } = require('../../scripts/build-docs');

describe('addDocButtons', () => {
  it('should add next and previous page information', () => {
    const docPosts = [
      { title: 'Welcome', slug: '/docs', content: 'Welcome content' },
    ];
    const treePosts = {
      welcome: {
        item: { title: 'Welcome', isRootSection: true, slug: '/docs' },
        children: {},
      },
      section1: {
        item: { title: 'Section 1', isRootSection: true },
        children: {
          page1: { item: { title: 'Page 1', slug: '/docs/section1/page1' } },
          page2: { item: { title: 'Page 2', slug: '/docs/section1/page2' } },
        },
      },
    };

    const result = addDocButtons(docPosts, treePosts);

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({
      title: 'Welcome',
      slug: '/docs',
      content: 'Welcome content'
    });
    expect(result[1]).toEqual({
      isRootSection: true,
      title: 'Section 1'
    });
    expect(result[2]).toEqual({
      title: 'Page 1',
      slug: '/docs/section1/page1',
      nextPage: {
        title: 'Page 2',
        href: '/docs/section1/page2'
      },
      prevPage: {
        title: 'Section 1',
        href: undefined
      }
    });
    expect(result[3]).toEqual({
      title: 'Page 2',
      slug: '/docs/section1/page2',
      prevPage: {
        title: 'Page 1',
        href: '/docs/section1/page1'
      }
    });
  });
});
