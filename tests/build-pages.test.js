const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

const SRC_DIR = 'markdown';
const TARGET_DIR = 'pages';

const capitalizeTags = ['table', 'tr', 'td', 'th', 'thead', 'tbody'];

const {
  copyAndRenameFiles,
  capitalizeJsxTags,
} = require('../scripts/build-pages');

// Sample data for tests
const sampleMarkdownContent = `
# Sample Markdown
<!-- This is a comment -->
<table>
  <tr>
    <td>Cell 1</td>
  </tr>
</table>
`;

const expectedMdxContent = `
# Sample Markdown
{/* This is a comment */}
<Table>
  <Tr>
    <Td>Cell 1</Td>
  </Tr>
</Table>
`;

describe('capitalizeJsxTags', () => {
  it('should capitalize JSX tags', () => {
    const input = '<table><tr><td>Content</td></tr></table>';
    const output = '<Table><Tr><Td>Content</Td></Tr></Table>';
    expect(capitalizeJsxTags(input)).toBe(output);
  });
});

describe('copyAndRenameFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create target directory if it does not exist', () => {
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(() => {});

    copyAndRenameFiles(SRC_DIR, TARGET_DIR);

    expect(fs.existsSync).toHaveBeenCalledWith(TARGET_DIR);
    expect(fs.mkdirSync).toHaveBeenCalledWith(TARGET_DIR, { recursive: true });
  });

  it('should read all files and directories from source directory', () => {
    const entries = [{ name: 'test.md', isFile: () => true, isDirectory: () => false }];
    fs.readdirSync.mockReturnValue(entries);
    fs.readFileSync.mockReturnValue(sampleMarkdownContent);
    fs.writeFileSync.mockImplementation(() => {});

    copyAndRenameFiles(SRC_DIR, TARGET_DIR);

    expect(fs.readdirSync).toHaveBeenCalledWith(SRC_DIR, { withFileTypes: true });
    expect(fs.readFileSync).toHaveBeenCalledWith(path.join(SRC_DIR, 'test.md'), 'utf8');
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(TARGET_DIR, 'test.md'),
      expectedMdxContent,
      'utf8'
    );
  });

  it('should rename .md files to .mdx', () => {
    const entries = [{ name: 'test.md', isFile: () => true, isDirectory: () => false }];
    fs.readdirSync.mockReturnValue(entries);
    fs.readFileSync.mockReturnValue(sampleMarkdownContent);
    fs.writeFileSync.mockImplementation(() => {});
    fs.renameSync.mockImplementation(() => {});

    copyAndRenameFiles(SRC_DIR, TARGET_DIR);

    expect(fs.renameSync).toHaveBeenCalledWith(
      path.join(TARGET_DIR, 'test.md'),
      path.join(TARGET_DIR, 'test.mdx')
    );
  });

  it('should handle nested directories', () => {
    const entries = [
      { name: 'nested', isFile: () => false, isDirectory: () => true },
      { name: 'nested/test.md', isFile: () => true, isDirectory: () => false },
    ];

    fs.readdirSync.mockImplementation((dir) => {
      if (dir === SRC_DIR) return [entries[0]];
      if (dir === path.join(SRC_DIR, 'nested')) return [entries[1]];
      return [];
    });

    fs.existsSync.mockImplementation((dir) => {
      return dir !== path.join(TARGET_DIR, 'nested');
    });

    fs.mkdirSync.mockImplementation(() => {});
    fs.readFileSync.mockReturnValue(sampleMarkdownContent);
    fs.writeFileSync.mockImplementation(() => {});

    copyAndRenameFiles(SRC_DIR, TARGET_DIR);

    expect(fs.readdirSync).toHaveBeenCalledWith(SRC_DIR, { withFileTypes: true });
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(TARGET_DIR, 'nested'));
    expect(fs.readdirSync).toHaveBeenCalledWith(path.join(SRC_DIR, 'nested'), { withFileTypes: true });
    expect(fs.readFileSync).toHaveBeenCalledWith(path.join(SRC_DIR, 'nested', 'test.md'), 'utf8');
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(TARGET_DIR, 'nested', 'test.md'),
      expectedMdxContent,
      'utf8'
    );
  });
});
