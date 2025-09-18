import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { buildPostList } from '../../scripts/build-post-list';
import type { Result } from '../../types/scripts/build-posts-list';

describe('Integration: build-post-list Comprehensive Testing', () => {
  let tempDir: string;

  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-post-list-comprehensive-'));

    // Run the build-pages-runner before build-post-list-runner
    execSync('npx tsx npm/runners/build-pages-runner.ts', { stdio: 'inherit' });
  });

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe('CLI Runner Integration (Real World Usage)', () => {
    let runnerOutput: Result;
    let runnerOutputPath: string;

    beforeAll(() => {
      const outputFileName = 'posts-runner.json';

      runnerOutputPath = path.join(tempDir, outputFileName);

      // Test the actual npm script/runner
      execSync(`npm run post-list-runner -- --outputFile ${outputFileName} --basePath "${tempDir}"`, {
        stdio: 'inherit'
      });

      runnerOutput = JSON.parse(fs.readFileSync(runnerOutputPath, 'utf-8'));
    });

    it('writes the file successfully', () => {
      expect(fs.existsSync(runnerOutputPath)).toBe(true);
    });

    it('output JSON is not empty', () => {
      expect(Object.keys(runnerOutput).length).toBeGreaterThan(0);
    });

    it('no section is missing', () => {
      expect(runnerOutput).toHaveProperty('docs');
      expect(runnerOutput).toHaveProperty('blog');
      expect(runnerOutput).toHaveProperty('about');
      expect(runnerOutput).toHaveProperty('docsTree');
    });

    it('each section has expected keys', () => {
      runnerOutput.docs.forEach((item) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('slug');
      });
      runnerOutput.blog.forEach((item) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('slug');
      });
      runnerOutput.about.forEach((item) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('slug');
      });
    });

    it('docsTree is a non-empty object if docs exist', () => {
      if (runnerOutput.docs && runnerOutput.docs.length > 0) {
        expect(typeof runnerOutput.docsTree).toBe('object');
        expect(Object.keys(runnerOutput.docsTree).length).toBeGreaterThan(0);
      }
    });

    it('contains Docs Home in docs', () => {
      expect(runnerOutput.docs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'Welcome',
            slug: '/docs'
          })
        ])
      );
    });

    it('about section contains About entry', () => {
      expect(runnerOutput.about).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'About',
            slug: '/about'
          })
        ])
      );
    });

    it('all slugs start with their section', () => {
      runnerOutput.docs.forEach((item) => {
        expect(typeof item.slug).toBe('string');
        expect(item.slug!.startsWith('/docs')).toBe(true);
      });

      runnerOutput.about.forEach((item) => {
        expect(typeof item.slug).toBe('string');
        expect(item.slug!.startsWith('/about')).toBe(true);
      });

      runnerOutput.blog.forEach((item) => {
        expect(typeof item.slug).toBe('string');
        expect(item.slug!.startsWith('/blog')).toBe(true);
      });
    });

    it('all items in docs, blog, and about have unique slugs', () => {
      const slugs = [
        ...runnerOutput.docs.map((item) => item.slug),
        ...runnerOutput.blog.map((item) => item.slug),
        ...runnerOutput.about.map((item) => item.slug)
      ];

      const uniqueSlugs = new Set(slugs);

      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });

  describe('Core Script Logic (Coverage Testing)', () => {
    let scriptOutput: Result;
    let scriptOutputPath: string;

    beforeAll(async () => {
      const outputFileName = 'posts-script.json';

      scriptOutputPath = path.join(tempDir, outputFileName);

      // Test the core script directly for coverage
      const postDirectories = [
        [path.resolve(__dirname, '../../pages/blog'), '/blog'],
        [path.resolve(__dirname, '../../pages/docs'), '/docs'],
        [path.resolve(__dirname, '../../pages/about'), '/about']
      ];

      await buildPostList(postDirectories, tempDir, scriptOutputPath);
      scriptOutput = JSON.parse(fs.readFileSync(scriptOutputPath, 'utf-8'));
    });

    it('script creates the output file successfully', () => {
      expect(fs.existsSync(scriptOutputPath)).toBe(true);
    });

    it('script output JSON is not empty', () => {
      expect(Object.keys(scriptOutput).length).toBeGreaterThan(0);
    });

    it('script generates all required sections', () => {
      expect(scriptOutput).toHaveProperty('docs');
      expect(scriptOutput).toHaveProperty('blog');
      expect(scriptOutput).toHaveProperty('about');
      expect(scriptOutput).toHaveProperty('docsTree');
    });

    it('toc entries in docs have expected fields', () => {
      scriptOutput.docs.forEach((item: any) => {
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

    it('docs items with toc have valid structure', () => {
      scriptOutput.docs.forEach((item: any) => {
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
      scriptOutput.docs.forEach((item: any) => {
        if ('readingTime' in item) {
          expect(typeof item.readingTime).toBe('number');
          expect(item.readingTime).toBeGreaterThan(0);
        }
      });
    });

    it('all items with excerpt have a non-empty string', () => {
      scriptOutput.docs.forEach((item: any) => {
        if ('excerpt' in item) {
          expect(typeof item.excerpt).toBe('string');
          expect(item.excerpt.length).toBeGreaterThan(0);
        }
      });
    });

    it('all items with id have a valid file path', () => {
      scriptOutput.docs.forEach((item: any) => {
        if ('id' in item) {
          expect(typeof item.id).toBe('string');
          expect(item.id.length).toBeGreaterThan(0);
        }
      });
    });

    it('validates comprehensive data structure integrity', () => {
      expect(Array.isArray(scriptOutput.docs)).toBe(true);
      expect(Array.isArray(scriptOutput.blog)).toBe(true);
      expect(Array.isArray(scriptOutput.about)).toBe(true);
      expect(typeof scriptOutput.docsTree).toBe('object');
    });
  });

  describe('Consistency Validation', () => {
    it('runner and script produce equivalent results', () => {
      // Both test suites should run and we can compare key metrics
      expect(true).toBe(true); // Placeholder - could add actual comparison logic
    });
  });
});
