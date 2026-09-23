import { join } from 'path';

import { SITE_BASE_URL } from '../../scripts/llms/config';
import {
  canonicalHtmlUrl,
  canonicalMarkdownUrl,
  markdownPageHint,
  postIdToMarkdownSource,
  slugToMarkdownPath,
  slugToPublicFile
} from '../../scripts/llms/urls';

describe('llms url helpers', () => {
  it('maps slugs to markdown paths, including index routes', () => {
    expect(slugToMarkdownPath('/docs')).toBe('docs.md');
    expect(slugToMarkdownPath('/docs/guides/validate')).toBe('docs/guides/validate.md');
    expect(slugToMarkdownPath('/docs/tutorials/getting-started/')).toBe('docs/tutorials/getting-started.md');
    expect(slugToMarkdownPath('/blog/hello')).toBe('blog/hello.md');
    expect(slugToMarkdownPath('/about')).toBe('about.md');
  });

  it('does not emit index.md for folder index slugs', () => {
    expect(slugToMarkdownPath('/docs/foo')).not.toBe('docs/foo/index.md');
    expect(slugToMarkdownPath('/docs/foo')).toBe('docs/foo.md');
  });

  it('builds public file paths and canonical URLs', () => {
    expect(slugToPublicFile('/docs/concepts', 'public')).toBe(join('public', 'docs', 'concepts.md'));
    expect(canonicalMarkdownUrl('/docs/concepts')).toBe(`${SITE_BASE_URL}/docs/concepts.md`);
    expect(canonicalHtmlUrl('/docs/concepts')).toBe(`${SITE_BASE_URL}/docs/concepts`);
  });

  it('maps posts.json ids back to authored markdown files', () => {
    expect(postIdToMarkdownSource('pages/docs/guides/validate.mdx')).toBe('markdown/docs/guides/validate.md');
    expect(postIdToMarkdownSource('pages/docs/tutorials/getting-started/index.mdx')).toBe(
      'markdown/docs/tutorials/getting-started/index.md'
    );
    expect(postIdToMarkdownSource('pages/blog/hello.mdx')).toBe('markdown/blog/hello.md');
    expect(postIdToMarkdownSource('pages/about/index.mdx')).toBe('markdown/about/index.md');
  });

  it('builds the per-page markdown hint', () => {
    expect(markdownPageHint('/docs/guides/validate')).toContain(
      '> Markdown version of https://www.asyncapi.com/docs/guides/validate'
    );
    expect(markdownPageHint('/docs/guides/validate')).toContain('> Index: https://www.asyncapi.com/llms.txt');
  });
});
