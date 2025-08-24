import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

describe('Integration: build-post-list-runner CLI', () => {
  let tempDir: string;
  let outputPath: string;
  let output: any;

  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-post-list-real-'));
    const outputFileName = 'posts.json';

    outputPath = path.join(tempDir, outputFileName);

    // Run the build-pages-runner before build-post-list-runner
    execSync('npx tsx npm/runners/build-pages-runner.ts', { stdio: 'inherit' });

    // Run the runner as a CLI command with the test output file name and basePath
    execSync(
      `npx tsx npm/runners/build-post-list-runner.ts --outputFile ${outputFileName} --basePath "${tempDir}"`,
    );

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
    ['docs', 'blog', 'about'].forEach((section) => {
      expect(Array.isArray(output[section])).toBe(true);
      output[section].forEach((item: any) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('slug');
      });
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
          slug: '/docs',
        }),
      ]),
    );
  });
  it('about section contains About entry', () => {
    expect(output.about).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'About',
          slug: '/about',
        }),
      ]),
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
});
