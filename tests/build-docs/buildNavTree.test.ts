import { buildNavTree } from '../../scripts/build-docs';
import navData from '../fixtures/buildNavTreeData';

const {
  basicNavItems,
  sectionNavItems,
  orphanNavItems,
  missingFieldsNavItems,
  invalidParentNavItems,
  multipleSubsectionsNavItems
} = navData;

describe('buildNavTree', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a tree structure from nav items', () => {
    const result = buildNavTree(basicNavItems);

    expect(result.welcome.item).toEqual(
      expect.objectContaining({
        title: 'Welcome',
        slug: '/docs'
      })
    );

    expect(result['getting-started'].item).toEqual(
      expect.objectContaining({
        title: 'Getting Started',
        slug: '/docs/getting-started'
      })
    );

    expect(result['getting-started'].children).toHaveProperty('installation');
    expect(result['getting-started'].children).toHaveProperty('configuration');

    expect(result.reference.item).toEqual(
      expect.objectContaining({
        title: 'Reference',
        slug: '/docs/reference'
      })
    );

    expect(result.reference.children.api.item).toEqual(
      expect.objectContaining({
        title: 'API',
        slug: '/docs/reference/api'
      })
    );

    expect(result.reference.children.specification.item.slug).toBe('/docs/reference/specification');
    expect(result.reference.children.specification.children[0].slug).toBe('/docs/reference/specification/v3.0');
  });

  it('should handle items without sectionId', () => {
    const result = buildNavTree(sectionNavItems);

    expect(result.root.item).toEqual(
      expect.objectContaining({
        title: 'Root',
        slug: '/docs'
      })
    );

    expect(result.root.children).toHaveProperty('Item without sectionId');
    expect(result.root.children['Item without sectionId'].item).toEqual(
      expect.objectContaining({
        title: 'Item without sectionId',
        slug: '/docs/item'
      })
    );
  });

  it('should throw and catch an error if a parent section is missing', () => {
    let error;

    try {
      buildNavTree(orphanNavItems);
    } catch (err) {
      error = err;
      expect((err as Error).message).toContain(
        'Parent section non-existent-parent not found for item Orphaned Subsection'
      );
    }
    expect(error).toBeDefined();
  });

  it('should handle items with missing required fields gracefully', () => {
    let error;

    try {
      buildNavTree(missingFieldsNavItems);
    } catch (err) {
      error = err;
      expect((err as Error).message).toContain('Failed to build navigation tree');
    }
    expect(error).toBeDefined();
  });

  it('should throw an error when parent references are invalid', () => {
    let error;

    try {
      buildNavTree(invalidParentNavItems);
    } catch (err) {
      error = err;
      expect((err as Error).message).toContain(
        'Parent section non-existent-parent not found for item Child with invalid parent'
      );
    }
    expect(error).toBeDefined();
  });

  it('should sort children within subsections based on weight', () => {
    const result = buildNavTree(multipleSubsectionsNavItems);

    const apiChildren = result.reference.children.api.children;

    expect(apiChildren[0].title).toBe('Authentication');
    expect(apiChildren[1].title).toBe('Endpoints');
    expect(apiChildren[2].title).toBe('Rate Limiting');

    const specChildren = result.reference.children.specification.children;

    expect(specChildren[0].title).toBe('v1.0');
    expect(specChildren[1].title).toBe('v2.0');
    expect(specChildren[2].title).toBe('v3.0');

    expect(apiChildren[0].weight).toBeLessThan(apiChildren[1].weight);
    expect(apiChildren[1].weight).toBeLessThan(apiChildren[2].weight);

    expect(specChildren[0].weight).toBeLessThan(specChildren[1].weight);
    expect(specChildren[1].weight).toBeLessThan(specChildren[2].weight);
  });
});
