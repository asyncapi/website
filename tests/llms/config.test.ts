import {
  isOlderSpecificationPage,
  isOptionalSection,
  isSkippedFromFull,
  LATEST_SPEC_SLUG,
  shouldIncludeInLlmsFull
} from '../../scripts/llms/config';

describe('llms classification', () => {
  it('treats community as Optional and concepts as core', () => {
    expect(isOptionalSection('community')).toBe(true);
    expect(isOptionalSection('concepts')).toBe(false);
    expect(isOptionalSection('tutorials')).toBe(false);
    expect(isOptionalSection(undefined)).toBe(false);
  });

  it('skips explorer and v2 stub pages from llms-full.txt', () => {
    expect(isSkippedFromFull('/docs/reference/specification/v3.1.0-explorer')).toBe(true);
    expect(isSkippedFromFull('/docs/reference/specification/v2.x')).toBe(true);
    expect(isSkippedFromFull('/docs/concepts/protocol')).toBe(false);
  });

  it('keeps only the latest specification version in llms-full.txt', () => {
    expect(isOlderSpecificationPage(LATEST_SPEC_SLUG)).toBe(false);
    expect(isOlderSpecificationPage('/docs/reference/specification/v3.0.0')).toBe(true);
    expect(isOlderSpecificationPage('/docs/reference/specification')).toBe(false);
  });

  it('includes core docs and about pages, but not blogs or community', () => {
    expect(
      shouldIncludeInLlmsFull({ title: 'Protocol', slug: '/docs/concepts/protocol', rootSectionId: 'concepts' }, 'docs')
    ).toBe(true);
    expect(shouldIncludeInLlmsFull({ title: 'About', slug: '/about' }, 'about')).toBe(true);
    expect(
      shouldIncludeInLlmsFull(
        { title: 'Code of Conduct', slug: '/docs/community/code', rootSectionId: 'community' },
        'docs'
      )
    ).toBe(false);
    expect(shouldIncludeInLlmsFull({ title: 'A post', slug: '/blog/hello' }, 'blog')).toBe(false);
    expect(
      shouldIncludeInLlmsFull(
        { title: 'Explorer', slug: '/docs/reference/specification/v3.1.0-explorer', rootSectionId: 'reference' },
        'docs'
      )
    ).toBe(false);
    expect(
      shouldIncludeInLlmsFull(
        { title: '3.0.0', slug: '/docs/reference/specification/v3.0.0', rootSectionId: 'reference' },
        'docs'
      )
    ).toBe(false);
    expect(
      shouldIncludeInLlmsFull(
        { title: '3.1.0', slug: '/docs/reference/specification/v3.1.0', rootSectionId: 'reference' },
        'docs'
      )
    ).toBe(true);
  });
});
