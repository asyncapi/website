const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const {
    validateBlogs,
    validateDocs,
    checkMarkdownFiles
} = require('../../scripts/markdown/check-markdown');

describe('Frontmatter Validator', () => {
    let tempDir;
    let mockConsoleError;

    beforeEach(async () => {
        mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-config'));
    });

    afterEach(async () => {
        mockConsoleError.mockRestore();
        await fs.rm(tempDir, { recursive: true, force: true });
    });

    it('validates authors array and returns specific errors', async () => {
        const frontmatter = {
            title: 'Test Blog',
            date: '2024-01-01',
            type: 'blog',
            tags: ['test'],
            cover: 'cover.jpg',
            authors: [{ name: 'John' }, { photo: 'jane.jpg' }, { name: 'Bob', photo: 'bob.jpg', link: 'not-a-url' }]
        };

        const errors = validateBlogs(frontmatter);
        expect(errors).toEqual(expect.arrayContaining([
            'Author at index 0 is missing a photo',
            'Author at index 1 is missing a name',
            'Invalid URL for author at index 2: not-a-url'
        ]));
    });

    it('validates docs frontmatter for required fields', async () => {
        const frontmatter = { title: 123, weight: 'not-a-number' };
        const errors = validateDocs(frontmatter);
        expect(errors).toEqual(expect.arrayContaining([
            'Title is missing or not a string',
            'Weight is missing or not a number'
        ]));
    });

    it('checks for errors in markdown files in a directory', async () => {
        await fs.writeFile(path.join(tempDir, 'invalid.md'), `---\ntitle: Invalid Blog\n---`);
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

        await checkMarkdownFiles(tempDir, validateBlogs);

        expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Errors in file invalid.md:'));
        mockConsoleLog.mockRestore();
    });

    it('returns multiple validation errors for invalid blog frontmatter', async () => {
        const frontmatter = {
            title: 123,
            date: 'invalid-date',
            type: 'blog',
            tags: 'not-an-array',
            cover: ['not-a-string'],
            authors: { name: 'John Doe' }
        };
        const errors = validateBlogs(frontmatter);

        expect(errors.length).toBeGreaterThan(3);
    });

    it('logs error to console when an error occurs in checkMarkdownFiles', async () => {
        const invalidFolderPath = path.join(tempDir, 'non-existent-folder');
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    
        await checkMarkdownFiles(invalidFolderPath, validateBlogs);
    
        expect(mockConsoleError.mock.calls[0][0]).toContain('Error processing files:');
        mockConsoleError.mockRestore();
    });     
});
