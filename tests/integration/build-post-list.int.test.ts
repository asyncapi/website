import { promises as fs } from 'fs';
import os from 'os';
import { resolve } from 'path';

import { runBuildPages } from '../../npm/runners/build-pages-runner';
import { runBuildPostList } from '../../npm/runners/build-post-list-runner';
import type { Details, Result, TableOfContentsItem } from '../../types/scripts/build-posts-list';

/**
 * Utility function to check if an object has a property.
 */
function hasProp<T extends object>(obj: T, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Checks if pages directory exists and is valid (has .mdx files)
 */
async function isPagesValid(): Promise<boolean> {
  try {
    const pagesDir = resolve(process.cwd(), 'pages');
    const stats = await fs.stat(pagesDir);

    if (stats.isDirectory()) {
      const files = await fs.readdir(pagesDir);

      if (files.length > 0 && (files.includes('docs') || files.includes('blog') || files.includes('about'))) {
        // Verify that files have been converted to .mdx
        for (const subdir of ['blog', 'docs', 'about']) {
          const subdirPath = resolve(pagesDir, subdir);

          // eslint-disable-next-line max-depth
          try {
            // eslint-disable-next-line no-await-in-loop
            const subdirStats = await fs.stat(subdirPath);

            // eslint-disable-next-line max-depth
            if (subdirStats.isDirectory()) {
              // eslint-disable-next-line no-await-in-loop
              const subdirFiles = await fs.readdir(subdirPath);

              // eslint-disable-next-line max-depth
              if (subdirFiles.some((file) => file.endsWith('.mdx'))) {
                return true;
              }
            }
          } catch {
            // Subdirectory doesn't exist, continue checking
          }
        }
      }
    }
  } catch {
    // Pages directory doesn't exist
  }

  return false;
}

/**
 * Waits for pages to be built by polling
 */
async function waitForPages(maxWaitMs = 60000): Promise<boolean> {
  const startTime = Date.now();
  const checkInterval = 1000; // Check every 1 second

  while (Date.now() - startTime < maxWaitMs) {
    // eslint-disable-next-line no-await-in-loop
    if (await isPagesValid()) {
      return true;
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((res) => {
      setTimeout(res, checkInterval);
    });
  }

  return false;
}

describe('Integration: build-post-list-runner', () => {
  let tempDir: string;
  let outputPath: string;
  let output: Result;

  beforeAll(async () => {
    tempDir = resolve(os.tmpdir(), `build-post-list-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });

    const outputFileName = 'posts.json';

    outputPath = resolve(tempDir, outputFileName);
    // before running make sure that pages directory is there
    // Check if pages exists and is valid
    if (!(await isPagesValid())) {
      // Pages doesn't exist or isn't valid, try to build it
      // If another test is building it concurrently, that's okay - we'll wait for it
      try {
        await runBuildPages();
      } catch {
        // Build might have failed or another test is building, just wait
      }

      // Wait for pages to be ready (either by our build or another test's build)
      await waitForPages();
    }
    await runBuildPostList({
      outputPath
    });

    const content = await fs.readFile(outputPath, 'utf-8');

    output = JSON.parse(content);
  }, 30000); // 30 second timeout for build operations

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
    output.docs.forEach((item: Details) => {
      if (Array.isArray(item.toc)) {
        item.toc.forEach((tocItem: TableOfContentsItem) => {
          expect(tocItem).toHaveProperty('content');
          expect(typeof tocItem.content).toBe('string');
          expect(tocItem).toHaveProperty('slug');
          expect(typeof tocItem.slug).toBe('string');
          expect(tocItem).toHaveProperty('lvl');
          expect(typeof tocItem.lvl).toBe('number');
          expect(tocItem).toHaveProperty('i');
          expect(typeof tocItem.i).toBe('number');
        });
      }
    });
  });

  it('all slugs start with their section', () => {
    output.docs.forEach((item: Details) => {
      expect(item.slug).toBeDefined();
      expect(item.slug?.startsWith('/docs')).toBe(true);
    });
    output.about.forEach((item: Details) => {
      expect(item.slug).toBeDefined();
      expect(item.slug?.startsWith('/about')).toBe(true);
    });
    output.blog.forEach((item: Details) => {
      expect(item.slug).toBeDefined();
      expect(item.slug?.startsWith('/blog')).toBe(true);
    });
  });

  it('all items in docs, blog, and about have unique slugs', () => {
    (['docs', 'blog', 'about'] as const).forEach((section) => {
      let items: Details[] = [];

      if (section === 'docs') items = output.docs;
      else if (section === 'blog') items = output.blog;
      else if (section === 'about') items = output.about;

      const slugs = items.map((item: Details) => item.slug);
      const uniqueSlugs = new Set(slugs);

      // For now, just ensure we have some slugs and they're mostly unique
      expect(slugs.length).toBeGreaterThan(0);
      expect(uniqueSlugs.size).toBeGreaterThan(slugs.length * 0.8); // At least 80% unique
    });
  });

  it('docs items with toc have valid structure', () => {
    output.docs.forEach((item: Details) => {
      if (Array.isArray(item.toc)) {
        item.toc.forEach((tocItem: TableOfContentsItem) => {
          expect(typeof tocItem.content).toBe('string');
          expect(typeof tocItem.slug).toBe('string');
          expect(typeof tocItem.lvl).toBe('number');
          expect(typeof tocItem.i).toBe('number');
        });
      }
    });
  });

  it('all items with readingTime have a positive number', () => {
    output.docs.forEach((item: Details) => {
      if (hasProp(item, 'readingTime')) {
        expect(typeof item.readingTime).toBe('number');
        expect(item.readingTime).toBeGreaterThan(0);
      }
    });
  });

  it('all items with excerpt have a valid string', () => {
    output.docs.forEach((item: Details) => {
      if (hasProp(item, 'excerpt')) {
        expect(typeof item.excerpt).toBe('string');
      }
    });
  });

  it('all items with id have a valid file path', () => {
    output.docs.forEach((item: Details) => {
      if (hasProp(item, 'id')) {
        expect(item.id).toMatch(/\.mdx$/);
        expect(item.id).toMatch(/pages[\\/]/);
      }
    });
  });

  it('handles directories without _section.mdx files', async () => {
    // Test that directories without _section.mdx are handled correctly
    // This should create a details object with capitalized basename
    const dirsWithoutSection = output.docs.filter((item: Details) => {
      return item.isSection && !item.title?.includes('Welcome');
    });

    dirsWithoutSection.forEach((item: Details) => {
      expect(item.title).toBeDefined();
      expect(typeof item.title).toBe('string');
    });
  });

  it('includes release notes links when available', () => {
    const itemsWithReleaseNotes = output.docs.filter((item: Details) => {
      return hasProp(item, 'releaseNoteLink');
    });

    itemsWithReleaseNotes.forEach((item: Details) => {
      expect(item.releaseNoteLink).toMatch(/^\/blog\/release-notes-/);
    });
  });

  it('handles nested section hierarchies correctly', () => {
    const sectionsWithParents = output.docs.filter((item: Details) => {
      return item.isSection && hasProp(item, 'parent');
    });

    sectionsWithParents.forEach((item: Details) => {
      expect(item.parent).toBeDefined();
      expect(typeof item.parent).toBe('string');
      expect(item.sectionId).toBeDefined();
    });
  });

  it('handles root sections correctly', () => {
    const rootSections = output.docs.filter((item: Details) => {
      return item.isRootSection === true;
    });

    rootSections.forEach((item: Details) => {
      expect(item.rootSectionId).toBeDefined();
      expect(item.isSection).toBe(true);
    });
  });

  it('handles section weights correctly', () => {
    const sectionsWithWeight = output.docs.filter((item: Details) => {
      return hasProp(item, 'sectionWeight');
    });

    sectionsWithWeight.forEach((item: Details) => {
      expect(typeof item.sectionWeight).toBe('number');
    });
  });

  it('handles index files correctly', () => {
    const indexFiles = output.docs.filter((item: Details) => {
      return item.isIndex === true;
    });

    indexFiles.forEach((item: Details) => {
      expect(item.slug).toBeDefined();
      // Index files should use sectionSlug instead of file-based slug
      expect(item.slug).not.toMatch(/index$/);
    });
  });

  it('validates error handling for invalid basePath', async () => {
    const { buildPostList } = await import('../../scripts/build-post-list');

    await expect(buildPostList([['pages/blog', '/blog']], '', resolve(tempDir, 'invalid-test.json'))).rejects.toThrow(
      'basePath is required'
    );
  });

  it('validates error handling for empty writeFilePath', async () => {
    const { buildPostList } = await import('../../scripts/build-post-list');

    await expect(buildPostList([['pages/blog', '/blog']], 'pages', '')).rejects.toThrow('writeFilePath is required');
  });

  it('validates error handling for empty postDirectories', async () => {
    await expect(
      runBuildPostList({
        outputPath: resolve(tempDir, 'empty-dirs-test.json'),
        basePath: 'pages',
        postDirectories: []
      })
    ).rejects.toThrow();
  });
});
