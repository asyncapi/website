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

  it('should handle items without a sectionId', () => {
    const navItems = [
      { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2 },
      { title: 'Overview', weight: 0, isSection: false, rootSectionId: 'reference', slug: '/docs/reference/overview' },
    ];
    const result = buildNavTree(navItems);
    expect(result.reference.children).toHaveProperty('Overview');
    expect(result.reference.children.Overview.item.slug).toBe('/docs/reference/overview');
  });

  it('should sort children by weight', () => {
    const navItems = [
      { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2 },
      { title: 'B', weight: 2, isSection: true, rootSectionId: 'reference', sectionId: 'b', parent: 'reference' },
      { title: 'A', weight: 1, isSection: true, rootSectionId: 'reference', sectionId: 'a', parent: 'reference' },
    ];
    const result = buildNavTree(navItems);
    const childrenKeys = Object.keys(result.reference.children);
    expect(childrenKeys[0]).toBe('a');
    expect(childrenKeys[1]).toBe('b');
  });

  it('should correctly handle pre-release and non-pre-release items', () => {
    const navItems = [
      { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2 },
      { title: 'API', weight: 1, isSection: true, rootSectionId: 'reference', sectionId: 'api', parent: 'reference' },
      { title: 'v1.1', weight: 1, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v1.1', isPrerelease: true },
      { title: 'v1.0', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v1.0' }, // no isPrerelease property
      { title: 'Specification', weight: 0, isSection: true, rootSectionId: 'reference', sectionId: 'specification', parent: 'reference' },
    ];
  
    const result = buildNavTree(navItems);
  
    // Ensure the specification exists
    expect(result.reference.children).toHaveProperty('specification');
    expect(result.reference.children.specification.children.length).toBeGreaterThan(0);
  
    // Check that the item without isPrerelease is selected as the latest specification version
    expect(result.reference.children.specification.item.href).toBe('/docs/reference/specification/v1.0');
  });
  

});
