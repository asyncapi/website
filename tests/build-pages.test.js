const fs = require('fs');
const path = require('path');
const { capitalizeJsxTags, copyAndRenameFiles } = require('../scripts/build-pages');

describe('capitalizeJsxTags', () => {
  test('should capitalize JSX tags', () => {
    const input = '<table><tr><td>Hello</td></tr></table>';
    const output = '<Table><Tr><Td>Hello</Td></Tr></Table>';
    expect(capitalizeJsxTags(input)).toBe(output);
  });

  test('should not capitalize non-JSX tags', () => {
    const input = '<div>Hello</div>';
    const output = '<div>Hello</div>';
    expect(capitalizeJsxTags(input)).toBe(output);
  });
});

describe('copyAndRenameFiles', () => {
  const TEST_DIR = 'test';
  const SRC_DIR = path.join(TEST_DIR, 'src');
  const TARGET_DIR = path.join(TEST_DIR, 'target');

  beforeAll(() => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    fs.mkdirSync(SRC_DIR, { recursive: true });
    fs.mkdirSync(TARGET_DIR, { recursive: true });

    const fileContent = '<table><tr><td>Hello</td></tr></table>';
    fs.writeFileSync(path.join(SRC_DIR, 'test.md'), fileContent, 'utf8');
    fs.mkdirSync(path.join(SRC_DIR, 'nested'), { recursive: true });
    fs.writeFileSync(path.join(SRC_DIR, 'nested', 'nested.md'), fileContent, 'utf8');
  });

  afterAll(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  });

  test('should copy and rename files correctly', () => {
    copyAndRenameFiles(SRC_DIR, TARGET_DIR);

    const targetFile = fs.readFileSync(path.join(TARGET_DIR, 'test.mdx'), 'utf8');
    const nestedTargetFile = fs.readFileSync(path.join(TARGET_DIR, 'nested', 'nested.mdx'), 'utf8');

    expect(targetFile).toBe('<Table><Tr><Td>Hello</Td></Tr></Table>');
    expect(nestedTargetFile).toBe('<Table><Tr><Td>Hello</Td></Tr></Table>');
  });
});