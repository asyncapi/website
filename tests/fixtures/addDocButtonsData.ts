import type { DocPost, TreePost, MockDocPost, MockTreePost } from '../../types/tests/fixtures/addDocButtonsDataTypes';

const docPosts: DocPost[] = [
    { title: 'Welcome', slug: '/docs', content: 'Welcome content' },
];

const treePosts: TreePost = {
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

const mockDocPosts: MockDocPost[] = [
    { slug: '/docs', title: 'Welcome to Docs' },
    { slug: '/docs/page1', title: 'Page 1' },
];

const mockTreePosts: MockTreePost = {
    root1: {
        item: { title: 'Root 1', isRootSection: true },
        children: {
            child1: { item: { title: 'Child 1', slug: '/docs/root1/child1' } },
        },
    },
    root2: {
        item: { title: 'Root 2', isRootElement: true },
        children: {
            child2: { item: { title: 'Child 2', slug: '/docs/root2/child2' } },
        },
    },
};

const invalidTreePosts: string[] = ['tree1', 'tree2', 'tree3', 'tree4'];

export { docPosts, treePosts, mockDocPosts, mockTreePosts, invalidTreePosts };
