import { DocNode } from '../../types/tests/fixtures/convertDocPostDataTypes';

const docObject: DocNode = {
  item: { title: 'Root', slug: '/root' },
  children: {
    child1: { item: { title: 'Child 1', slug: '/child1' } },
    child2: { item: { title: 'Child 2', slug: '/child2' } },
  },
};

const emptyDocObject: Record<string, never> = {};

const singlePostDocObject: DocNode = { item: { title: 'Single Post', slug: '/single' } };

const nestedChildrenDocObject: DocNode = {
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

export {
  docObject,
  emptyDocObject,
  singlePostDocObject,
  nestedChildrenDocObject,
};
