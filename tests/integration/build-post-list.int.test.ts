import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

import type { Result } from '../../types/scripts/build-posts-list';

describe('Integration: build-post-list-runner CLI', () => {
  let tempDir: string;
  let outputPath: string;
  let output: Result;

  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-post-list-real-'));
    const outputFileName = 'posts.json';

    outputPath = path.join(tempDir, outputFileName);

    // Run the build-pages-runner before build-post-list-runner
    execSync('npx tsx npm/runners/build-pages-runner.ts', { stdio: 'inherit' });

    // Run the runner as a CLI command with the test output file name and basePath
    execSync(`npx tsx npm/runners/build-post-list-runner.ts --outputFile ${outputFileName} --basePath "${tempDir}"`);

    output = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
  });

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('writes the file successfully', () => {
    expect(fs.existsSync(outputPath)).toBe(true);
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

      expect(uniqueSlugs.size).toBe(slugs.length);
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

  it('all items with excerpt have a non-empty string', () => {
    output.docs.forEach((item: any) => {
      if ('excerpt' in item) {
        expect(typeof item.excerpt).toBe('string');
        expect(item.excerpt.length).toBeGreaterThan(0);
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
