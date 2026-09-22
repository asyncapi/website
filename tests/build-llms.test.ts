import { mkdir, mkdtemp, readFile, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

import type { Result } from '@/types/scripts/build-posts-list';

import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  collectLlmsSections,
  generateLlmsFiles,
  oneSentenceExcerpt
} from '../scripts/build-llms';

/**
 * Writes a fixture file under a temp site root.
 *
 * @param root - temp directory
 * @param relativePath - path relative to root
 * @param contents - file contents
 */
async function writeSource(root: string, relativePath: string, contents: string) {
  const fullPath = join(root, relativePath);

  await mkdir(join(fullPath, '..'), { recursive: true });
  await writeFile(fullPath, contents, 'utf8');
}

/**
 * Minimal posts.json inventory used by llms generator tests.
 */
function fixturePosts(): Result {
  return {
    docs: [
      {
        title: 'Welcome',
        slug: '/docs',
        id: 'pages/docs/index.mdx',
        excerpt: 'Docs home.'
      },
      {
        title: 'Protocol',
        slug: '/docs/concepts/protocol',
        id: 'pages/docs/concepts/protocol.mdx',
        rootSectionId: 'concepts',
        excerpt: 'What a protocol is.'
      },
      {
        title: 'Code of Conduct',
        slug: '/docs/community/code',
        id: 'pages/docs/community/code.mdx',
        rootSectionId: 'community',
        excerpt: 'Be kind to everyone.'
      },
      {
        title: '3.1.0',
        slug: '/docs/reference/specification/v3.1.0',
        id: 'pages/docs/reference/specification/v3.1.0.mdx',
        rootSectionId: 'reference',
        excerpt: 'Latest specification.'
      },
      {
        title: '3.0.0',
        slug: '/docs/reference/specification/v3.0.0',
        id: 'pages/docs/reference/specification/v3.0.0.mdx',
        rootSectionId: 'reference',
        excerpt: 'Previous specification.'
      },
      {
        title: '3.1.0 - Explorer',
        slug: '/docs/reference/specification/v3.1.0-explorer',
        id: 'pages/docs/reference/specification/v3.1.0-explorer.mdx',
        rootSectionId: 'reference'
      }
    ],
    blog: [
      {
        title: 'Hello blog',
        slug: '/blog/hello',
        id: 'pages/blog/hello.mdx',
        date: '2026-01-02T00:00:00.000Z',
        excerpt: 'A community update.'
      }
    ],
    about: [
      {
        title: 'About AsyncAPI',
        slug: '/about',
        id: 'pages/about/index.mdx',
        excerpt: 'Who we are.'
      }
    ],
    docsTree: {
      concepts: {
        item: {
          title: 'Concepts',
          isRootSection: true,
          isSection: true,
          weight: 1,
          rootSectionId: 'concepts'
        },
        children: {
          Protocol: {
            item: {
              title: 'Protocol',
              slug: '/docs/concepts/protocol',
              rootSectionId: 'concepts',
              excerpt: 'What a protocol is.'
            }
          }
        }
      },
      reference: {
        item: {
          title: 'Reference',
          isRootSection: true,
          isSection: true,
          weight: 5,
          rootSectionId: 'reference'
        },
        children: {
          specification: {
            item: {
              title: 'Specification',
              isSection: true,
              slug: '/docs/reference/specification'
            },
            children: [
              {
                title: '3.1.0',
                slug: '/docs/reference/specification/v3.1.0',
                rootSectionId: 'reference',
                excerpt: 'Latest specification.'
              },
              {
                title: '3.0.0',
                slug: '/docs/reference/specification/v3.0.0',
                rootSectionId: 'reference',
                excerpt: 'Previous specification.'
              },
              {
                title: '3.1.0 - Explorer',
                slug: '/docs/reference/specification/v3.1.0-explorer',
                rootSectionId: 'reference'
              }
            ]
          }
        }
      },
      community: {
        item: {
          title: 'Community',
          isRootSection: true,
          isSection: true,
          weight: 7,
          rootSectionId: 'community'
        },
        children: {
          code: {
            item: {
              title: 'Code of Conduct',
              slug: '/docs/community/code',
              rootSectionId: 'community',
              excerpt: 'Be kind to everyone.'
            }
          }
        }
      }
    }
  };
}

describe('oneSentenceExcerpt', () => {
  it('keeps a short first sentence', () => {
    expect(oneSentenceExcerpt('Hello world. More text.')).toBe('Hello world.');
  });

  it('returns an empty string when there is no excerpt', () => {
    expect(oneSentenceExcerpt()).toBe('');
  });

  it('strips MDX import prefixes from posts.json excerpts', () => {
    expect(
      oneSentenceExcerpt("import Notes from '@/assets/docs/fragments/notes.md'; Welcome to AsyncAPI Concepts!")
    ).toBe('Welcome to AsyncAPI Concepts!');
  });
});

describe('collectLlmsSections and indexes', () => {
  const posts = fixturePosts();

  it('puts community and blogs under Optional and core docs in named sections', () => {
    const sections = collectLlmsSections(posts);
    const coreIds = sections.filter((section) => !section.optional).map((section) => section.id);
    const optionalIds = sections.filter((section) => section.optional).map((section) => section.id);

    expect(coreIds).toEqual(['welcome', 'concepts', 'reference', 'about']);
    expect(optionalIds).toEqual(['community', 'blog']);
  });

  it('builds llms.txt with the spec heading, core H2s, Optional entries, and .md hrefs', () => {
    const txt = buildLlmsTxt(posts);

    expect(txt.startsWith('# AsyncAPI\n')).toBe(true);
    expect(txt).toContain('> Open source tools to easily build and maintain your event-driven architecture.');
    expect(txt).toContain('industry standard for defining asynchronous APIs');
    expect(txt).toContain('## Welcome');
    expect(txt).toContain('[Welcome](https://www.asyncapi.com/docs.md)');
    expect(txt).toContain('## Concepts');
    expect(txt).toContain('## Reference');
    expect(txt).toContain('## About');
    expect(txt).toContain('## Optional');
    expect(txt).toContain('[Protocol](https://www.asyncapi.com/docs/concepts/protocol.md)');
    expect(txt).toContain('[Code of Conduct](https://www.asyncapi.com/docs/community/code.md)');
    expect(txt).toContain('[Hello blog](https://www.asyncapi.com/blog/hello.md)');
    expect(txt).toContain('[Blog RSS](https://www.asyncapi.com/rss.xml)');
    expect(txt.indexOf('## Concepts')).toBeLessThan(txt.indexOf('## Optional'));
  });

  it('builds llms-full.txt with core docs and latest spec, omitting community, blog, explorer, and old spec', () => {
    const converted = new Map([
      ['/docs/concepts/protocol', 'Protocol body'],
      ['/docs/community/code', 'Community body'],
      ['/docs/reference/specification/v3.1.0', 'Latest spec body'],
      ['/docs/reference/specification/v3.0.0', 'Old spec body'],
      ['/docs/reference/specification/v3.1.0-explorer', 'Explorer body'],
      ['/blog/hello', 'Blog body'],
      ['/about', 'About body']
    ]);
    const full = buildLlmsFullTxt(posts, converted);

    expect(full).toContain('Protocol body');
    expect(full).toContain('Latest spec body');
    expect(full).toContain('About body');
    expect(full).toContain('Source: https://www.asyncapi.com/docs/concepts/protocol.md');
    expect(full).not.toContain('Community body');
    expect(full).not.toContain('Blog body');
    expect(full).not.toContain('Explorer body');
    expect(full).not.toContain('Old spec body');
  });
});

describe('generateLlmsFiles', () => {
  let siteRoot: string;

  beforeEach(async () => {
    siteRoot = await mkdtemp(join(tmpdir(), 'asyncapi-llms-'));
    await mkdir(join(siteRoot, 'public'), { recursive: true });
    await writeSource(siteRoot, 'markdown/docs/index.md', '---\ntitle: Welcome\n---\n\nDocs home.\n');
    await writeSource(
      siteRoot,
      'markdown/docs/concepts/protocol.md',
      '---\ntitle: Protocol\n---\n\nA protocol is a set of rules.\n'
    );
    await writeSource(
      siteRoot,
      'markdown/docs/community/code.md',
      '---\ntitle: Code of Conduct\n---\n\nBe kind to everyone.\n'
    );
    await writeSource(
      siteRoot,
      'markdown/docs/reference/specification/v3.1.0.md',
      '# AsyncAPI Specification\n\nLatest.\n'
    );
    await writeSource(
      siteRoot,
      'markdown/docs/reference/specification/v3.0.0.md',
      '# AsyncAPI Specification\n\nPrevious.\n'
    );
    await writeSource(
      siteRoot,
      'markdown/docs/reference/specification/v3.1.0-explorer.md',
      '<Visualizer version="3.1.0" />\n'
    );
    await writeSource(siteRoot, 'markdown/blog/hello.md', '---\ntitle: Hello blog\n---\n\nA community update.\n');
    await writeSource(siteRoot, 'markdown/about/index.md', '---\ntitle: About AsyncAPI\n---\n\nWho we are.\n');
  });

  afterEach(async () => {
    await rm(siteRoot, { recursive: true, force: true });
  });

  it('writes per-page markdown, llms.txt, and llms-full.txt', async () => {
    const posts = fixturePosts();

    await generateLlmsFiles({
      posts,
      siteRoot,
      markdownDir: join(siteRoot, 'markdown'),
      publicDir: join(siteRoot, 'public')
    });

    const protocol = await readFile(join(siteRoot, 'public/docs/concepts/protocol.md'), 'utf8');
    const llmsTxt = await readFile(join(siteRoot, 'public/llms.txt'), 'utf8');
    const llmsFull = await readFile(join(siteRoot, 'public/llms-full.txt'), 'utf8');
    const explorer = await readFile(join(siteRoot, 'public/docs/reference/specification/v3.1.0-explorer.md'), 'utf8');

    expect(protocol).toContain('> Markdown version of https://www.asyncapi.com/docs/concepts/protocol');
    expect(protocol).toContain('A protocol is a set of rules.');
    expect(llmsTxt).toContain('## Concepts');
    expect(llmsTxt).toContain('## Optional');
    expect(llmsFull).toContain('A protocol is a set of rules.');
    expect(llmsFull).toContain('Latest.');
    expect(llmsFull).not.toContain('Be kind to everyone.');
    expect(llmsFull).not.toContain('A community update.');
    expect(explorer).toContain('Interactive specification explorer');
    expect(llmsFull).not.toContain('Interactive specification explorer');
  });

  it('removes stale generated markdown and keeps other public files', async () => {
    const posts = fixturePosts();

    await writeSource(siteRoot, 'public/docs/stale.md', 'old page');
    await writeSource(siteRoot, 'public/docs/keep.txt', 'stay');
    await writeSource(siteRoot, 'public/blog/old-post.md', 'old blog');

    await generateLlmsFiles({
      posts,
      siteRoot,
      markdownDir: join(siteRoot, 'markdown'),
      publicDir: join(siteRoot, 'public')
    });

    await expect(readFile(join(siteRoot, 'public/docs/stale.md'), 'utf8')).rejects.toThrow();
    await expect(readFile(join(siteRoot, 'public/blog/old-post.md'), 'utf8')).rejects.toThrow();
    expect(await readFile(join(siteRoot, 'public/docs/keep.txt'), 'utf8')).toBe('stay');
  });

  it('skips pages whose markdown source is missing', async () => {
    const posts = fixturePosts();

    posts.docs.push({
      title: 'Missing',
      slug: '/docs/concepts/missing',
      id: 'pages/docs/concepts/missing.mdx',
      rootSectionId: 'concepts'
    });

    await generateLlmsFiles({
      posts,
      siteRoot,
      markdownDir: join(siteRoot, 'markdown'),
      publicDir: join(siteRoot, 'public')
    });

    const llmsTxt = await readFile(join(siteRoot, 'public/llms.txt'), 'utf8');

    expect(llmsTxt).toContain('/docs/concepts/protocol.md');
    expect(llmsTxt).not.toContain('/docs/concepts/missing.md');
    await expect(readFile(join(siteRoot, 'public/docs/concepts/missing.md'), 'utf8')).rejects.toThrow();
  });

  it('throws when no markdown sources exist', async () => {
    await expect(
      generateLlmsFiles({
        posts: {
          docs: [{ title: 'Gone', slug: '/docs/gone', id: 'pages/docs/gone.mdx' }],
          blog: [],
          about: [],
          docsTree: {}
        },
        siteRoot,
        markdownDir: join(siteRoot, 'markdown'),
        publicDir: join(siteRoot, 'public')
      })
    ).rejects.toThrow('No markdown sources found');
  });

  it('points latest.md at the same spec version as the HTML latest redirect', async () => {
    await writeSource(
      siteRoot,
      'public/_redirects',
      `# LATEST-SPEC-REDIRECTION:START
/docs/reference/specification/latest /docs/reference/specification/v3.1.0 302!
# LATEST-SPEC-REDIRECTION:END

/docs/reference/specification/latest.md /docs/reference/specification/v3.0.0.md 302!
`
    );

    await generateLlmsFiles({
      posts: fixturePosts(),
      siteRoot,
      markdownDir: join(siteRoot, 'markdown'),
      publicDir: join(siteRoot, 'public')
    });

    const redirects = await readFile(join(siteRoot, 'public/_redirects'), 'utf8');

    expect(redirects).toContain('/docs/reference/specification/latest.md /docs/reference/specification/v3.1.0.md 302!');
    expect(redirects).not.toContain('/docs/reference/specification/latest.md /docs/reference/specification/v3.0.0.md');
  });
});
