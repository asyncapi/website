const { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } = require('fs');
const { join, resolve } = require('path');
const { buildPostList, slugifyToC } = require('../scripts/build-post-list');
const os = require('os');

describe('buildPostList', () => {
  let tempDir;
  let writeFilePath;
  let postDirectories;
  const lineBreak = os.EOL;

  beforeEach(() => {
    tempDir = resolve(__dirname, 'test-config');
    writeFilePath = join(tempDir, 'posts.json');
    postDirectories = [
      [join(tempDir, 'blog'), '/blog'],
      [join(tempDir, 'docs'), '/docs'],
      [join(tempDir, 'about'), '/about'],
    ];

    mkdirSync(tempDir, { recursive: true });

    mkdirSync(join(tempDir, 'blog'), { recursive: true });
    writeFileSync(join(tempDir, 'blog', 'release-notes-2.1.0.mdx'), '---' + lineBreak + 'title: Release Notes 2.1.0' + lineBreak + '---' + lineBreak + 'This is a release note.');

    mkdirSync(join(tempDir, 'docs'), { recursive: true });
    writeFileSync(join(tempDir, 'docs', 'index.mdx'), '---' + lineBreak + 'title: Docs Home' + lineBreak + '---' + lineBreak + 'This is the documentation homepage.');

    mkdirSync(join(tempDir, 'about'), { recursive: true });
    writeFileSync(join(tempDir, 'about', 'index.mdx'), '---' + lineBreak + 'title: About Us' + lineBreak + '---' + lineBreak + 'This is the about page.');

    mkdirSync(join(tempDir, 'docs', 'reference', 'specification'), { recursive: true });
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('builds a post list and writes the result to a file', async () => {
    await buildPostList(postDirectories, tempDir, writeFilePath);

    const outputExists = existsSync(writeFilePath);
    expect(outputExists).toBe(true);

    const output = JSON.parse(readFileSync(writeFilePath, 'utf-8'));

    expect(output).toHaveProperty('docs');
    expect(output).toHaveProperty('blog');
    expect(output).toHaveProperty('about');
    expect(output).toHaveProperty('docsTree');

    const blogEntry = output.blog.find(item => item.slug === '/blog/release-notes-2.1.0');
    expect(blogEntry).toBeDefined();
    expect(blogEntry.title).toBe('Release Notes 2.1.0');
  });

  it('handles a directory with only section files', async () => {
    mkdirSync(join(tempDir, 'docs', 'section1'), { recursive: true });
    writeFileSync(join(tempDir, 'docs', 'section1', '_section.mdx'), '---' + lineBreak + 'title: Section 1' + lineBreak + '---' + lineBreak + 'This is section 1.');

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(readFileSync(writeFilePath, 'utf-8'));

    expect(output.docs.length).toBeGreaterThan(0);
    expect(output.docs.find(item => item.title === 'Section 1')).toBeDefined();
  });

  it('handles multiple release notes correctly', async () => {
    writeFileSync(join(tempDir, 'blog', 'release-notes-2.1.1.mdx'), '---' + lineBreak + 'title: Release Notes 2.1.1' + lineBreak + '---' + lineBreak + 'This is a release note.');

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(readFileSync(writeFilePath, 'utf-8'));

    const firstReleaseNote = output.blog.find(item => item.slug === '/blog/release-notes-2.1.0');
    const secondReleaseNote = output.blog.find(item => item.slug === '/blog/release-notes-2.1.1');

    expect(firstReleaseNote).toBeDefined();
    expect(firstReleaseNote.title).toBe('Release Notes 2.1.0');

    expect(secondReleaseNote).toBeDefined();
    expect(secondReleaseNote.title).toBe('Release Notes 2.1.1');
  });

  it('handles errors gracefully', async () => {
    const invalidDir = [join(tempDir, 'non-existent-dir'), '/invalid'];
    await expect(buildPostList([invalidDir], tempDir, writeFilePath)).rejects.toThrow();
  });

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

  it('does not process specification files without a title', async () => {
    const specDir = join(tempDir, 'docs', 'reference', 'specification');
    writeFileSync(
      join(specDir, 'v2.1.0-no-title.mdx'),
      '---' + lineBreak + '---' + lineBreak + 'Content of specification without a title.'
    );

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(readFileSync(writeFilePath, 'utf-8'));
    const noTitleEntry = output.docs.find(item => item.slug.includes('/reference/specification/v2.1.0-no-title'));

    expect(noTitleEntry).toBeUndefined();
  });

  it('does not process specification files with "next-spec" in the filename', async () => {
    const specDir = join(tempDir, 'docs', 'reference', 'specification');
    writeFileSync(
      join(specDir, 'v2.1.0-next-spec.1.mdx'),
      '---' + lineBreak + '---' + lineBreak + 'Content of pre-release specification v2.1.0-next-spec.1.'
    );

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(readFileSync(writeFilePath, 'utf-8'));
    const nextSpecEntry = output.docs.find(item => item.slug.includes('/reference/specification/v2.1.0-next-spec.1'));

    expect(nextSpecEntry).toBeUndefined();
  });

  it('does not process specification files with "explorer" in the filename', async () => {
    const specDir = join(tempDir, 'docs', 'reference', 'specification');
    writeFileSync(
      join(specDir, 'explorer.mdx'),
      '---' + lineBreak + '---' + lineBreak + 'Content of explorer specification.'
    );

    await buildPostList(postDirectories, tempDir, writeFilePath);

    const output = JSON.parse(readFileSync(writeFilePath, 'utf-8'));
    const explorerEntry = output.docs.find(item => item.slug.includes('/reference/specification/explorer'));

    expect(explorerEntry).toBeUndefined();
  });

  it('throws an error if the directory cannot be read', async () => {
    const invalidDir = [join(tempDir, 'non-existent-dir'), '/invalid'];

    let error;
    try {
      await buildPostList([invalidDir], tempDir, writeFilePath);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toMatch(/Error while building post list/);
  });

  it('throws an error if the front matter cannot be parsed', async () => {
    writeFileSync(join(tempDir, 'docs', 'invalid.mdx'), '---' + lineBreak + 'invalid front matter' + lineBreak + '---' + lineBreak + 'Content');

    let error;
    try {
      await buildPostList(postDirectories, tempDir, writeFilePath);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toMatch(/Error while building post list/);
  });

  it('throws an error if no post directories are provided', async () => {
    let error;

    try {
      await buildPostList([], tempDir, writeFilePath);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toMatch(/Error while building post list/);
  });

});
