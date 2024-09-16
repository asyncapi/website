const sortBy = require('lodash/sortBy');
const { buildNavTree } = require('../../scripts/build-docs');

// Mocking lodash's sortBy to return the array as-is for simplicity
jest.mock('lodash/sortBy', () => jest.fn(arr => arr));

describe('buildNavTree', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a tree structure from nav items', () => {
    const navItems = [
      { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
      { title: 'Getting Started', weight: 1, isRootSection: true, isSection: true, rootSectionId: 'getting-started', sectionWeight: 1, slug: '/docs/getting-started' },
      { title: 'Installation', weight: 0, isSection: false, rootSectionId: 'getting-started', sectionId: 'installation', slug: '/docs/getting-started/installation' },
      { title: 'Configuration', weight: 1, isSection: false, rootSectionId: 'getting-started', sectionId: 'configuration', slug: '/docs/getting-started/configuration' },
      { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2, slug: '/docs/reference' },
      { title: 'API', weight: 0, isSection: true, rootSectionId: 'reference', sectionId: 'api', parent: 'reference', slug: '/docs/reference/api' },
      { title: 'Endpoints', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'api', slug: '/docs/reference/api/endpoints' },
      { title: 'Specification', weight: 1, isSection: true, rootSectionId: 'reference', sectionId: 'specification', parent: 'reference', slug: '/docs/reference/specification' },
      { title: 'v1.0', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v1.0', isPrerelease: false },
      { title: 'v2.0', weight: 1, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v2.0', isPrerelease: true },
      // Added item without `isPrerelease`
      { title: 'v3.0', weight: 2, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v3.0' }
    ];

    const result = buildNavTree(navItems);

    expect(sortBy).toHaveBeenCalledWith(navItems, ['isRootSection', 'weight', 'isSection']);

    expect(result).toEqual({
      'welcome': {
        item: navItems[0],
        children: {}
      },
      'getting-started': {
        item: navItems[1],
        children: {
          'installation': { item: navItems[2] },
          'configuration': { item: navItems[3] }
        }
      },
      'reference': {
        item: navItems[4],
        children: {
          'api': {
            item: navItems[5],
            children: [navItems[6]]
          },
          'specification': {
            item: { ...navItems[7], href: '/docs/reference/specification/v3.0' },
            children: [navItems[8], navItems[9], navItems[10]] // Including the new item
          }
        }
      }
    });
  });

  test('should handle items without sectionId', () => {
    const navItems = [
      { title: 'Root', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'root', sectionWeight: 0, slug: '/docs' },
      { title: 'Item without sectionId', weight: 1, isSection: false, rootSectionId: 'root', slug: '/docs/item' },
    ];

    const result = buildNavTree(navItems);

    expect(result).toEqual({
      'welcome': {
        item: { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
        children: {}
      },
      'root': {
        item: navItems[0],
        children: {
          'Item without sectionId': { item: navItems[1] }
        }
      }
    });
  });
});
