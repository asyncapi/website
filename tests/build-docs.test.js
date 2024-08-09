const { buildNavTree, addDocButtons, convertDocPosts } = require('../scripts/build-docs');

jest.mock('lodash/sortBy', () => jest.fn(arr => arr));

describe('Documentation Navigation Functions', () => {
  describe('buildNavTree', () => {
    it('should create a tree structure from nav items', () => {
      const navItems = [
        { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
        { title: 'Getting Started', weight: 1, isRootSection: true, isSection: true, rootSectionId: 'getting-started', sectionWeight: 1 },
        { title: 'Installation', weight: 0, isSection: false, rootSectionId: 'getting-started', sectionId: 'installation', slug: '/docs/getting-started/installation' },
      ];

      const result = buildNavTree(navItems);

      expect(result).toHaveProperty('welcome');
      expect(result).toHaveProperty('getting-started');
      expect(result['getting-started'].children).toHaveProperty('installation');
    });

    it('should handle subsections correctly', () => {
      const navItems = [
        { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2 },
        { title: 'Specification', weight: 0, isSection: true, rootSectionId: 'reference', sectionId: 'specification', parent: 'reference' },
        { title: 'v1.0', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v1.0' },
      ];

      const result = buildNavTree(navItems);

      expect(result.reference.children.specification.children[0].slug).toBe('/docs/reference/specification/v1.0');
    });
  });

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
});