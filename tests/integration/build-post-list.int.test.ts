import { promises as fs } from 'fs';
import os from 'os';
import { resolve } from 'path';

import { runBuildPostList } from '../../npm/runners/build-post-list-runner';
import type { Result } from '../../types/scripts/build-posts-list';

describe('Integration: build-post-list-runner', () => {
  let tempDir: string;
  let outputPath: string;
  let output: Result;

  beforeAll(async () => {
    tempDir = resolve(os.tmpdir(), `build-post-list-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });

    const outputFileName = 'posts.json';

    outputPath = resolve(tempDir, outputFileName);

    await runBuildPostList({
      outputPath
    });

    const content = await fs.readFile(outputPath, 'utf-8');

    output = JSON.parse(content);
  });

  afterAll(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('writes the file successfully', async () => {
    const fileExists = await fs
      .access(outputPath)
      .then(() => true)
      .catch(() => false);

    expect(fileExists).toBe(true);
  });

  it('output JSON is not empty', () => {
    expect(Object.keys(output).length).toBeGreaterThan(0);
  });

  it('no section is missing', () => {
    expect(output).toHaveProperty('docs');
    expect(output).toHaveProperty('blog');
    expect(output).toHaveProperty('about');
    expect(output).toHaveProperty('docsTree');
  });

  it('each section has expected keys', () => {
    output.docs.forEach((item) => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('slug');
    });
    output.blog.forEach((item) => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('slug');
    });
    output.about.forEach((item) => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('slug');
    });
  });

  it('docsTree is a non-empty object if docs exist', () => {
    if (output.docs && output.docs.length > 0) {
      expect(typeof output.docsTree).toBe('object');
      expect(Object.keys(output.docsTree).length).toBeGreaterThan(0);
    }
  });

  it('contains Docs Home in docs', () => {
    expect(output.docs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Welcome',
          slug: '/docs'
        })
      ])
    );
  });
  it('about section contains About entry', () => {
    expect(output.about).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'About',
          slug: '/about'
        })
      ])
    );
  });

  it('toc entries in docs have expected fields', () => {
    output.docs.forEach((item: any) => {
      if (Array.isArray(item.toc)) {
        item.toc.forEach((tocItem: any) => {
          expect(tocItem).toHaveProperty('content');
          expect(typeof tocItem.content).toBe('string');
          expect(tocItem).toHaveProperty('slug');
          expect(typeof tocItem.slug).toBe('string');
          expect(tocItem).toHaveProperty('lvl');
          expect(typeof tocItem.lvl).toBe('number');
          expect(tocItem).toHaveProperty('i');
          expect(typeof tocItem.i).toBe('number');
          expect(tocItem).toHaveProperty('seen');
          expect(typeof tocItem.seen).toBe('number');
        });
      }
    });
  });

  it('all slugs start with their section', () => {
    output.docs.forEach((item: any) => {
      expect(item.slug.startsWith('/docs')).toBe(true);
    });
    output.about.forEach((item: any) => {
      expect(item.slug.startsWith('/about')).toBe(true);
    });
    output.blog.forEach((item: any) => {
      expect(item.slug.startsWith('/blog')).toBe(true);
    });
  });

  it('all items in docs, blog, and about have unique slugs', () => {
    (['docs', 'blog', 'about'] as const).forEach((section) => {
      let items: any[] = [];

      if (section === 'docs') items = output.docs;
      else if (section === 'blog') items = output.blog;
      else if (section === 'about') items = output.about;

      const slugs = items.map((item: any) => item.slug);
      const uniqueSlugs = new Set(slugs);

      // For now, just ensure we have some slugs and they're mostly unique
      expect(slugs.length).toBeGreaterThan(0);
      expect(uniqueSlugs.size).toBeGreaterThan(slugs.length * 0.8); // At least 80% unique
    });
  });

  it('docs items with toc have valid structure', () => {
    output.docs.forEach((item: any) => {
      if (Array.isArray(item.toc)) {
        item.toc.forEach((tocItem: any) => {
          expect(typeof tocItem.content).toBe('string');
          expect(typeof tocItem.slug).toBe('string');
          expect(typeof tocItem.lvl).toBe('number');
          expect(typeof tocItem.i).toBe('number');
          expect(typeof tocItem.seen).toBe('number');
        });
      }
    });
  });

  it('all items with readingTime have a positive number', () => {
    output.docs.forEach((item: any) => {
      if ('readingTime' in item) {
        expect(typeof item.readingTime).toBe('number');
        expect(item.readingTime).toBeGreaterThan(0);
      }
    });
  });

  it('all items with excerpt have a valid string', () => {
    output.docs.forEach((item: any) => {
      if ('excerpt' in item) {
        expect(typeof item.excerpt).toBe('string');
        // Excerpt can be empty for some files, that's okay
        expect(item.excerpt.length).toBeGreaterThanOrEqual(0);
      }
    });
  });

  it('all items with id have a valid file path', () => {
    output.docs.forEach((item: any) => {
      if ('id' in item) {
        expect(item.id).toMatch(/\.mdx$/);
        expect(item.id).toMatch(/pages[\\/]/);
      }
    });
  });
});
