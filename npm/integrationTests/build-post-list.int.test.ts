import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { buildPostList } from '../../scripts/build-post-list';

// Define interfaces for the expected output structure
interface TocItem {
  content: string;
  slug: string;
  lvl: number;
  i: number;
  seen: number;
}

interface PostItem {
  title: string;
  slug: string;
  toc?: TocItem[];
}

interface Output {
  docs: PostItem[];
  blog: PostItem[];
  about: PostItem[];
  docsTree: Record<string, any>;
}

describe('Integration: buildPostList with real content', () => {
    let tempDir: string;
    let outputPath: string;
    let output: Output;
    const realPagesDir = path.resolve(__dirname, '../../pages');

    beforeAll(async () => {
        try {
            tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-post-list-real-'));
            outputPath = path.join(tempDir, 'posts.json');
    
            const postDirectories = [
                [path.join(realPagesDir, 'blog'), '/blog'],
                [path.join(realPagesDir, 'docs'), '/docs'],
                [path.join(realPagesDir, 'about'), '/about']
            ];
            const basePath = realPagesDir;
    
            await buildPostList(postDirectories, basePath, outputPath);
    
            output = JSON.parse(await fs.readFile(outputPath, 'utf-8')) as Output;
        } catch (error) {
            console.error('Error in beforeAll:', error);
            throw error;
        }
    });

    afterAll(() => {
        fs.removeSync(tempDir);
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
        ['docs', 'blog', 'about'].forEach(section => {
            expect(Array.isArray(output[section as keyof Output])).toBe(true);
            (output[section as keyof Output] as PostItem[]).forEach((item: PostItem) => {
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
        output.docs.forEach((item: PostItem) => {
            if (Array.isArray(item.toc)) {
                item.toc.forEach((tocItem: TocItem) => {
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
        output.docs.forEach((item: PostItem) => {
            expect(item.slug.startsWith('/docs')).toBe(true);
        });
        output.about.forEach((item: PostItem) => {
            expect(item.slug.startsWith('/about')).toBe(true);
        });
        output.blog.forEach((item: PostItem) => {
            expect(item.slug.startsWith('/blog')).toBe(true);
        });
    });
});