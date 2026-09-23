import getDocsBreadcrumbs from '../../utils/getDocsBreadcrumbs';

const docs = [
  { title: 'Concepts', slug: '/docs/concepts', isSection: true },
  { title: 'Overview', slug: '/docs/concepts' },
  { title: 'AsyncAPI Document', slug: '/docs/concepts/asyncapi-document', isSection: true },
  { title: 'Server', slug: '/docs/concepts/server' },
  { title: 'Structure', slug: '/docs/concepts/asyncapi-document/structure' }
];

const crumb = (title: string, slug: string, isCurrent = false) => ({ title, slug, isCurrent });

const rootCrumb = crumb('Docs', '/docs');
const conceptsCrumb = crumb('Concepts', '/docs/concepts');

describe('getDocsBreadcrumbs', () => {
  test('builds a trail from the root section down to the current page', () => {
    const post = { title: 'Structure', slug: '/docs/concepts/asyncapi-document/structure' };

    expect(getDocsBreadcrumbs(docs, post)).toEqual([
      rootCrumb,
      conceptsCrumb,
      crumb('AsyncAPI Document', '/docs/concepts/asyncapi-document'),
      crumb('Structure', post.slug, true)
    ]);
  });

  test('resolves the immediate section for a page one level deep', () => {
    const post = { title: 'Server', slug: '/docs/concepts/server' };

    expect(getDocsBreadcrumbs(docs, post)).toEqual([rootCrumb, conceptsCrumb, crumb('Server', post.slug, true)]);
  });

  test('marks the last crumb as the current page', () => {
    const crumbs = getDocsBreadcrumbs(docs, { title: 'Server', slug: '/docs/concepts/server' });

    expect(crumbs[crumbs.length - 1].isCurrent).toBe(true);
    expect(crumbs.slice(0, -1).every((entry) => entry.isCurrent === false)).toBe(true);
  });

  test('returns only the root crumb when the slug is missing or not a docs page', () => {
    expect(getDocsBreadcrumbs(docs, { title: 'Homepage', slug: '/' })).toEqual([rootCrumb]);
    expect(getDocsBreadcrumbs(docs, { title: 'No slug' })).toEqual([rootCrumb]);
    expect(getDocsBreadcrumbs(docs, { title: 'Guides', slug: '/docs-guides/page' })).toEqual([rootCrumb]);
  });
});
