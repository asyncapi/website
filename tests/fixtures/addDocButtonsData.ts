const docPosts = [{ title: 'Welcome', slug: '/docs', content: 'Welcome content' }];

const treePosts = {
  welcome: {
    item: { title: 'Welcome', isRootSection: true, slug: '/docs' },
    children: {}
  },
  section1: {
    item: { title: 'Section 1', isRootSection: true },
    children: {
      page1: { item: { title: 'Page 1', slug: '/docs/section1/page1' } },
      page2: { item: { title: 'Page 2', slug: '/docs/section1/page2' } }
    }
  }
};

const mockDocPosts = [
  { slug: '/docs', title: 'Welcome to Docs' },
  { slug: '/docs/page1', title: 'Page 1' }
];

const mockTreePosts = {
  root1: {
    item: { title: 'Root 1', isRootSection: true },
    children: {
      child1: { item: { title: 'Child 1', slug: '/docs/root1/child1' } }
    }
  },
  root2: {
    item: { title: 'Root 2', isRootElement: true },
    children: {
      child2: { item: { title: 'Child 2', slug: '/docs/root2/child2' } }
    }
  }
};

const invalidTreePosts = ['tree1', 'tree2', 'tree3', 'tree4'];

export { docPosts, invalidTreePosts, mockDocPosts, mockTreePosts, treePosts };
