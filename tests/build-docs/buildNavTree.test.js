const { buildNavTree } = require('../../scripts/build-docs');
const { basicNavItems, sectionNavItems, orphanNavItems, missingSpecVersion, nullNavItems } = require('../fixtures/buildNavTreeData')

jest.mock('lodash/sortBy', () => jest.fn(arr => arr));

describe('buildNavTree', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a tree structure from nav items', () => {

    const result = buildNavTree(basicNavItems);

    expect(result['welcome'].item).toEqual(
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

    expect(result['reference'].item).toEqual(
      expect.objectContaining({
        title: 'Reference',
        slug: '/docs/reference'
      })
    );

    expect(result['reference'].children.api.item).toEqual(
      expect.objectContaining({
        title: 'API',
        slug: '/docs/reference/api'
      })
    );

    expect(result['reference'].children.api.children[0]).toEqual(
      expect.objectContaining({
        title: 'Endpoints',
        slug: '/docs/reference/api/endpoints'
      })
    );

    expect(result['reference'].children.specification.item.slug).toBe('/docs/reference/specification');
    expect(result['reference'].children.specification.children[0].slug).toBe('/docs/reference/specification/v1.0');
    expect(result['reference'].children.specification.children[0].isPrerelease).toBe(false);

  });

  it('should handle items without sectionId', () => {

    const result = buildNavTree(sectionNavItems);

    expect(result['root'].item).toEqual(
      expect.objectContaining({
        title: 'Root',
        slug: '/docs'
      })
    );

    expect(result['root'].children).toHaveProperty('Item without sectionId');
    expect(result['root'].children['Item without sectionId'].item).toEqual(
      expect.objectContaining({
        title: 'Item without sectionId',
        slug: '/docs/item'
      })
    );
  });

  it('should throw and catch an error if a parent section is missing', () => {

    try {
      buildNavTree(orphanNavItems);
    } catch (err) {
      expect(err.message).toContain('Parent section non-existent-parent not found for item Orphaned Subsection');
    }
  });

  it('should throw and catch an error if no valid specification version is found', () => {

    try {
      buildNavTree(missingSpecVersion);
    } catch (err) {
      expect(err.message).toContain('No valid specification version found');
    }
  });

  it('should throw and catch a generic error if something unexpected happens', () => {

    try {
      buildNavTree(nullNavItems);
    } catch (err) {
      expect(err.message).toContain("Cannot read properties of null (reading 'forEach')");
    }
  });

});
