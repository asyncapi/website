import getDocsBreadcrumbs from '../../utils/getDocsBreadcrumbs';

const docs = [
  { title: 'Concepts', slug: '/docs/concepts', isSection: true },
  { title: 'Overview', slug: '/docs/concepts' },
  { title: 'AsyncAPI Document', slug: '/docs/concepts/asyncapi-document', isSection: true },
  { title: 'Server', slug: '/docs/concepts/server' },
  { title: 'Structure', slug: '/docs/concepts/asyncapi-document/structure' }
];

describe('getDocsBreadcrumbs', () => {
  test('builds a trail from the root section down to the current page', () => {
    const post = { title: 'Structure', slug: '/docs/concepts/asyncapi-document/structure' };

    expect(getDocsBreadcrumbs(docs, post)).toEqual([
      { title: 'Docs', slug: '/docs', isCurrent: false },
      { title: 'Concepts', slug: '/docs/concepts', isCurrent: false },
      { title: 'AsyncAPI Document', slug: '/docs/concepts/asyncapi-document', isCurrent: false },
      { title: 'Structure', slug: '/docs/concepts/asyncapi-document/structure', isCurrent: true }
    ]);
  });

  test('resolves the immediate section for a page one level deep', () => {
    const post = { title: 'Server', slug: '/docs/concepts/server' };

    expect(getDocsBreadcrumbs(docs, post)).toEqual([
      { title: 'Docs', slug: '/docs', isCurrent: false },
      { title: 'Concepts', slug: '/docs/concepts', isCurrent: false },
      { title: 'Server', slug: '/docs/concepts/server', isCurrent: true }
    ]);
  });

  test('marks the last crumb as the current page', () => {
    const post = { title: 'Server', slug: '/docs/concepts/server' };
    const crumbs = getDocsBreadcrumbs(docs, post);

    expect(crumbs[crumbs.length - 1].isCurrent).toBe(true);
    expect(crumbs.slice(0, -1).every((crumb) => crumb.isCurrent === false)).toBe(true);
  });

  test('returns only the root crumb when the slug is missing or not a docs page', () => {
    expect(getDocsBreadcrumbs(docs, { title: 'Homepage', slug: '/' })).toEqual([
      { title: 'Docs', slug: '/docs', isCurrent: false }
    ]);
    expect(getDocsBreadcrumbs(docs, { title: 'No slug' })).toEqual([
      { title: 'Docs', slug: '/docs', isCurrent: false }
    ]);
  });
});
