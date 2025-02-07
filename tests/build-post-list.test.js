const fs = require('fs-extra');
const { resolve, join } = require('path');
const { setupTestDirectories, generateTempDirPath } = require('./helper/buildPostListSetup')
const { buildPostList, slugifyToC, addItem } = require('../scripts/build-post-list');

describe('buildPostList', () => {
  let tempDir;
  let writeFilePath;
  let postDirectories;

  beforeEach(async () => {
    tempDir = generateTempDirPath(__dirname);
    writeFilePath = resolve(tempDir, 'posts.json');
    postDirectories = [
      [join(tempDir, 'blog'), '/blog'],
      [join(tempDir, 'docs'), '/docs'],
      [join(tempDir, 'about'), '/about'],
    ];

    await setupTestDirectories(tempDir);

  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  it('writes the file successfully', async () => {
    await buildPostList(postDirectories, tempDir, writeFilePath);
    const outputExists = await fs.pathExists(writeFilePath);
    expect(outputExists).toBe(true);
  });
  
  it('writes valid JSON content', async () => {
    await buildPostList(postDirectories, tempDir, writeFilePath);
    const content = await fs.readFile(writeFilePath, 'utf-8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  it('correctly structures docs entries', async () => {
    await buildPostList(postDirectories, tempDir, writeFilePath);
    const output = JSON.parse(await fs.readFile(writeFilePath, 'utf-8'));

    expect(output.docs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Docs Home',
          slug: '/docs',
        }),
        expect.objectContaining({
          title: 'Reference',
          slug: '/docs/reference',
          isRootSection: true,
        }),
        expect.objectContaining({
          title: 'Specification',
          slug: '/docs/reference/specification',
          isSection: true,
        }),
      ]),
    );
  });

  it('correctly structures blog entries', async () => {
    await buildPostList(postDirectories, tempDir, writeFilePath);
    const output = JSON.parse(await fs.readFile(writeFilePath, 'utf-8'));

    expect(output.blog).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Release Notes 2.1.0',
          slug: '/blog/release-notes-2.1.0',
        }),
      ]),
    );

    expect(output.about).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'About Us',
          slug: '/about',
        }),
      ]),
    );

    expect(output.docsTree).toBeDefined();

    const blogEntry = output.blog.find(
      (item) => item.slug === '/blog/release-notes-2.1.0',
    );
    expect(blogEntry).toBeDefined();
    expect(blogEntry.title).toBe('Release Notes 2.1.0');
  });

  it('handles a directory with only section files', async () => {
    await fs.ensureDir(join(tempDir, 'docs', 'section1'));
    await fs.writeFile(
      join(tempDir, 'docs', 'section1', '_section.mdx'),
      '---\ntitle: Section 1\n---\nThis is section 1.',
    );

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(await fs.readFile(writeFilePath, 'utf-8'));

    const sectionEntry = output.docs.find((item) => item.title === 'Section 1');
    expect(sectionEntry).toMatchObject({
      title: 'Section 1',
      slug: expect.stringContaining('/docs/section1'),
      isSection: true,
    });
  });

  it('handles multiple release notes correctly', async () => {
    await fs.writeFile(
      join(tempDir, 'blog', 'release-notes-2.1.1.mdx'),
      '---\ntitle: Release Notes 2.1.1\n---\nThis is a release note.',
    );

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(await fs.readFile(writeFilePath, 'utf-8'));

    const firstReleaseNote = output.blog.find(
      (item) => item.slug === '/blog/release-notes-2.1.0',
    );
    const secondReleaseNote = output.blog.find(
      (item) => item.slug === '/blog/release-notes-2.1.1',
    );

    expect(firstReleaseNote).toBeDefined();
    expect(firstReleaseNote.title).toBe('Release Notes 2.1.0');

    expect(secondReleaseNote).toBeDefined();
    expect(secondReleaseNote.title).toBe('Release Notes 2.1.1');
  });

  it('throws an error when accessing non-existent directory', async () => {
    const invalidDir = [join(tempDir, 'non-existent-dir'), '/invalid'];
    await expect(
      buildPostList([invalidDir], tempDir, writeFilePath),
    ).rejects.toThrow(/Error while building post list: ENOENT/);
  });

  it('does not process specification files without a title', async () => {
    const specDir = join(tempDir, 'docs', 'reference', 'specification');
    await fs.writeFile(
      join(specDir, 'v2.1.0-no-title.mdx'),
      '---\n---\nContent of specification without a title.',
    );

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(await fs.readFile(writeFilePath, 'utf-8'));
    const noTitleEntry = output.docs.find((item) =>
      item.slug.includes('/reference/specification/v2.1.0-no-title'),
    );

    expect(noTitleEntry).toBeUndefined();
  });

  it('does not process specification files with "next-spec" in the filename', async () => {
    const specDir = join(tempDir, 'docs', 'reference', 'specification');
    await fs.writeFile(
      join(specDir, 'v2.1.0-next-spec.1.mdx'),
      '---\n---\nContent of pre-release specification v2.1.0-next-spec.1.',
    );

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(await fs.readFile(writeFilePath, 'utf-8'));
    const nextSpecEntry = output.docs.find((item) =>
      item.slug.includes('/reference/specification/v2.1.0-next-spec.1'),
    );

    expect(nextSpecEntry).toBeUndefined();
  });

  it('does not process specification files with "explorer" in the filename', async () => {
    const specDir = join(tempDir, 'docs', 'reference', 'specification');
    await fs.writeFile(
      join(specDir, 'explorer.mdx'),
      '---\n---\nContent of explorer specification.',
    );

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(await fs.readFile(writeFilePath, 'utf-8'));
    const explorerEntry = output.docs.find((item) =>
      item.slug.includes('/reference/specification/explorer'),
    );

    expect(explorerEntry).toBeUndefined();
  });

  it('throws "Error while building post list" when front matter is invalid', async () => {
    await fs.writeFile(
      join(tempDir, 'docs', 'invalid.mdx'),
      '---\ninvalid front matter\n---\nContent',
    );

    await expect(
      buildPostList(postDirectories, tempDir, writeFilePath),
    ).rejects.toThrow(/Error while building post list/);
  });

  it('throws an error if no post directories are provided', async () => {
    await expect(buildPostList([], tempDir, writeFilePath)).rejects.toThrow(
      /Error while building post list/,
    );
  });

  it('throws specific error message when basePath parameter is undefined', async () => {
    await expect(
      buildPostList(postDirectories, undefined, writeFilePath),
    ).rejects.toThrow(
      "Error while building post list: basePath is required",
    );
  });

  it('throws specific error message when writeFilePath parameter is undefined', async () => {
    await expect(
      buildPostList(postDirectories, tempDir, undefined),
    ).rejects.toThrow(
      "Error while building post list: writeFilePath is required",
    );
  });

  it('throws an error when details object is invalid', () => {
    expect(() => addItem(null)).toThrow('Invalid details object provided to addItem');
    expect(() => addItem({})).toThrow('Invalid details object provided to addItem');
    expect(() => addItem({ slug: 123 })).toThrow('Invalid details object provided to addItem');
    expect(() => addItem(undefined)).toThrow('Invalid details object provided to addItem');
  });

  describe('slugifyToC', () => {
    it('handles heading ids like {# myHeadingId}', () => {
      const input = '## My Heading {#custom-id}';
      expect(slugifyToC(input)).toBe('custom-id');
    });

    it('handles heading ids like {<a name="myHeadingId"/>}', () => {
      const input = '## My Heading {<a name="custom-anchor-id"/>}';
      expect(slugifyToC(input)).toBe('custom-anchor-id');
    });

    it('handles empty strings', () => {
      expect(slugifyToC('')).toBe('');
    });
    
    it('returns empty string for malformed heading IDs', () => {
      expect(slugifyToC('## Heading {#}')).toBe('');
      expect(slugifyToC('## Heading {# }')).toBe('');
      expect(slugifyToC('## Heading {<a name=""/>}')).toBe('');
    });
    
    it('handles mixed format heading IDs', () => {
      expect(slugifyToC('## Heading {#id} {<a name="name"/>}')).toBe('id');
    });

    it('handles invalid input types gracefully', () => {
      expect(slugifyToC(null)).toBe('');
      expect(slugifyToC(undefined)).toBe('');
      expect(slugifyToC(123)).toBe('');
    });

    it('ignores invalid characters in heading IDs', () => {
      expect(slugifyToC('## Heading {#invalid@id}')).toBe('');
      expect(slugifyToC('## Heading {#invalid spaces}')).toBe('');
    });
  });
});
