const { convertDocPosts } = require('../../scripts/build-docs');

describe('convertDocPosts', () => {
  it('should convert a doc object to an array', () => {
    const docObject = {
      item: { title: 'Root', slug: '/root' },
      children: {
        child1: { item: { title: 'Child 1', slug: '/child1' } },
        child2: { item: { title: 'Child 2', slug: '/child2' } },
      },
    };

    const result = convertDocPosts(docObject);

    expect(result).toHaveLength(3);
    expect(result[0].title).toBe('Root');
    expect(result[1].title).toBe('Child 1');
    expect(result[2].title).toBe('Child 2');
  });
});
