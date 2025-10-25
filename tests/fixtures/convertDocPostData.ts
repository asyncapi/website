import type { NavTreeItem, RecursiveChildren } from '@/types/scripts/build-docs';

const docObject: NavTreeItem = {
  item: { title: 'Root', slug: '/root' },
  children: {
    child1: { item: { title: 'Child 1', slug: '/child1' } },
    child2: { item: { title: 'Child 2', slug: '/child2' } }
  } as RecursiveChildren
};

const emptyDocObject = {};

const singlePostDocObject = { item: { title: 'Single Post', slug: '/single' } };

const nestedChildrenDocObject: NavTreeItem = {
  item: { title: 'Root', slug: '/root' },
  children: {
    child1: {
      item: { title: 'Child 1', slug: '/child1' },
      children: {
        grandchild1: { item: { title: 'Grandchild 1', slug: '/grandchild1' } }
      }
    },
    child2: { item: { title: 'Child 2', slug: '/child2' } }
  }
};

export { docObject, emptyDocObject, nestedChildrenDocObject, singlePostDocObject };
