const fs = require('fs');
const path = require('path');
const os = require('os');
const {
    isValidURL,
    validateBlogs,
    validateDocs,
    checkMarkdownFiles
} = require('../../scripts/markdown/check-markdown');

describe('Frontmatter Validator', () => {
    let tempDir;
    let mockConsoleError;

    beforeEach(done => {
        mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
        fs.mkdtemp(path.join(os.tmpdir(), 'frontmatter-test-'), (err, directory) => {
            if (err) throw err;
            tempDir = directory;
            done();
        });
    });

    afterEach(done => {
        mockConsoleError.mockRestore();
        fs.rm(tempDir, { recursive: true, force: true }, err => {
            if (err) throw err;
            done();
        });
    });

    it('should return true for valid URLs', () => {
        expect(isValidURL('https://example.com')).toBe(true);
        expect(isValidURL('http://localhost:3000')).toBe(true);
        expect(isValidURL('https://sub.domain.com/path?query=value')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
        expect(isValidURL('not-a-url')).toBe(false);
        expect(isValidURL('http://')).toBe(false);
        expect(isValidURL('')).toBe(false);
    });

    it('should return null for valid blog frontmatter', () => {
        const validFrontmatter = {
            title: 'Test Blog',
            date: '2024-01-01',
            type: 'blog',
            tags: ['test', 'validation'],
            cover: 'cover.jpg',
            authors: [
                {
                    name: 'John Doe',
                    link: 'https://example.com',
                    photo: 'john.jpg'
                }
            ]
        };

        expect(validateBlogs(validFrontmatter)).toBeNull();
    });

    it('should return errors for missing required attributes', () => {
        const invalidFrontmatter = {
            title: 'Test Blog'
        };

        const errors = validateBlogs(invalidFrontmatter);
        expect(errors).toContain('date is missing');
        expect(errors).toContain('type is missing');
        expect(errors).toContain('tags is missing');
        expect(errors).toContain('cover is missing');
        expect(errors).toContain('authors is missing');
    });

    it('should validate date format', () => {
        const frontmatter = {
            title: 'Test Blog',
            date: 'invalid-date',
            type: 'blog',
            tags: ['test'],
            cover: 'cover.jpg',
            authors: [{ name: 'John', photo: 'photo.jpg' }]
        };

        const errors = validateBlogs(frontmatter);
        expect(errors).toContain('Invalid date format: invalid-date');
    });

    it('should validate authors array format', () => {
        const frontmatter = {
            title: 'Test Blog',
            date: '2024-01-01',
            type: 'blog',
            tags: ['test'],
            cover: 'cover.jpg',
            authors: [
                { name: 'John' },
                { photo: 'jane.jpg' },
                { name: 'Bob', photo: 'bob.jpg', link: 'not-a-url' }
            ]
        };

        const errors = validateBlogs(frontmatter);
        expect(errors).toContain('Author at index 0 is missing a photo');
        expect(errors).toContain('Author at index 1 is missing a name');
        expect(errors).toContain('Invalid URL for author at index 2: not-a-url');
    });

    it('should return null for valid docs frontmatter', () => {
        const validFrontmatter = {
            title: 'Test Doc',
            weight: 1
        };

        expect(validateDocs(validFrontmatter)).toBeNull();
    });

    it('should return errors for invalid docs frontmatter', () => {
        const invalidFrontmatter = {
            title: 123,
            weight: 'not-a-number'
        };

        const errors = validateDocs(invalidFrontmatter);
        expect(errors).toContain('Title is missing or not a string');
        expect(errors).toContain('Weight is missing or not a number');
    });

    it('should validate markdown files in directory', done => {
        const validBlogContent = `---
title: Valid Blog
date: 2024-01-01
type: blog
tags: ['test']
cover: cover.jpg
authors:
  - name: John Doe
    photo: john.jpg
---
Content here
`;

        const invalidBlogContent = `---
title: Invalid Blog
---
Content here
`;
        fs.writeFile(path.join(tempDir, 'valid.md'), validBlogContent, err => {
            if (err) throw err;

            fs.writeFile(path.join(tempDir, 'invalid.md'), invalidBlogContent, err => {
                if (err) throw err;

                fs.mkdir(path.join(tempDir, 'subdir'), err => {
                    if (err) throw err;

                    fs.writeFile(path.join(tempDir, 'subdir', 'nested.md'), validBlogContent, err => {
                        if (err) throw err;

                        const mockConsole = jest.spyOn(console, 'log').mockImplementation();
                        const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation();

                        checkMarkdownFiles(tempDir, validateBlogs);

                        setTimeout(() => {
                            expect(mockConsole).toHaveBeenCalledWith(
                                expect.stringContaining('Errors in file invalid.md:')
                            );

                            mockConsole.mockRestore();
                            mockProcessExit.mockRestore();
                            done();
                        }, 1000);
                    });
                });
            });
        });
    });

    it('should skip specified directories', done => {
        fs.mkdir(path.join(tempDir, 'reference', 'specification'), { recursive: true }, err => {
            if (err) throw err;

            const invalidContent = `---
title: Invalid Content
---`;

            fs.writeFile(path.join(tempDir, 'reference', 'specification', 'skip.md'), invalidContent, err => {
                if (err) throw err;

                const mockConsole = jest.spyOn(console, 'log').mockImplementation();

                checkMarkdownFiles(tempDir, validateBlogs);

                setTimeout(() => {
                    expect(mockConsole).not.toHaveBeenCalled();

                    mockConsole.mockRestore();
                    done();
                }, 1000);
            });
        });
    });

    it('should push multiple validation errors for invalid blog frontmatter', () => {
        const invalidFrontmatter = {
            title: 123,
            date: 'invalid-date',
            type: 'blog',
            tags: 'not-an-array',
            cover: ['not-a-string'],
            authors: {
                name: 'John Doe'
            }
        };

        const errors = validateBlogs(invalidFrontmatter);

        expect(errors).toContain('Invalid date format: invalid-date');
        expect(errors).toContain('Tags should be an array');
        expect(errors).toContain('Cover must be a string');
        expect(errors).toContain('Authors should be an array');
        expect(errors.length).toBeGreaterThan(3);
    });


    it('should handle filesystem errors when reading directory and file stats', done => {
        const testFilePath = path.join(tempDir, 'test.md');
        fs.writeFileSync(testFilePath, '---\ntitle: Test\n---\nContent');

        const originalReaddir = fs.readdir;
        const mockReaddir = jest.spyOn(fs, 'readdir').mockImplementation((path, callback) => {
            if (path.includes('error')) {
                callback(new Error('Failed to read directory'));
            } else {
                originalReaddir(path, callback);
            }
        });

        const originalStat = fs.stat;
        const mockStat = jest.spyOn(fs, 'stat').mockImplementation((path, callback) => {
            if (path.includes('test.md')) {
                callback(new Error('Failed to read file stats'));
            } else {
                originalStat(path, callback);
            }
        });

        checkMarkdownFiles(path.join(tempDir, 'error'), validateBlogs);
        
        checkMarkdownFiles(tempDir, validateBlogs);

        setTimeout(() => {
            expect(mockConsoleError).toHaveBeenCalledWith(
                'Error reading directory:',
                expect.any(Error)
            );

            expect(mockConsoleError).toHaveBeenCalledWith(
                'Error reading file stats:',
                expect.any(Error)
            );
            
            mockReaddir.mockRestore();
            mockStat.mockRestore();
            done();
        }, 100);
    });
});
