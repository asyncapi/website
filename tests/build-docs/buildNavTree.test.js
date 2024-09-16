const { buildNavTree } = require('../../scripts/build-docs');
jest.mock('lodash/sortBy', () => jest.fn(arr => arr));

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
