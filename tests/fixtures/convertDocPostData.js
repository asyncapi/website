const docObject = {
    item: { title: 'Root', slug: '/root' },
    children: {
      child1: { item: { title: 'Child 1', slug: '/child1' } },
      child2: { item: { title: 'Child 2', slug: '/child2' } },
    },
  };
  
const emptyDocObject = {};

const singlePostDocObject = { item: { title: 'Single Post', slug: '/single' } };

const nestedChildrenDocObject = {
  item: { title: 'Root', slug: '/root' },
  children: {
    child1: {
      item: { title: 'Child 1', slug: '/child1' },
      children: {
        grandchild1: { item: { title: 'Grandchild 1', slug: '/grandchild1' } },
      },
    },
    child2: { item: { title: 'Child 2', slug: '/child2' } },
  },
};

module.exports = {
  docObject,
  emptyDocObject,
  singlePostDocObject,
  nestedChildrenDocObject
};
