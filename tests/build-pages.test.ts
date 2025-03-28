import fs from 'fs';
import path from 'path';

import { capitalizeJsxTags, copyAndRenameFiles, ensureDirectoryExists } from '../scripts/build-pages';

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

  test('should not rename files with extensions other than .md', () => {
    const fileContent = '<div>Hello</div>';
    const testFile = path.join(SRC_DIR, 'test.txt');
    const targetFile = path.join(TARGET_DIR, 'test.txt');

    fs.writeFileSync(testFile, fileContent, 'utf8');

    copyAndRenameFiles(SRC_DIR, TARGET_DIR);

    expect(fs.existsSync(targetFile)).toBe(true);
    expect(fs.readFileSync(targetFile, 'utf8')).toBe('<div>Hello</div>');
    fs.unlinkSync(targetFile);
  });

  test('should handle non-directory and non-file entries', () => {
    const nonDirectoryNonFile: fs.Dirent = {
      name: 'test',
      isDirectory: () => false,
      isFile: () => false,
      isBlockDevice: () => false,
      isCharacterDevice: () => false,
      isFIFO: () => false,
      isSocket: () => false,
      isSymbolicLink: () => false,
      parentPath: '',
      path: ''
    };
    const readdirSyncSpy = jest
      .spyOn(fs, 'readdirSync')
      .mockReturnValue([nonDirectoryNonFile] as unknown as fs.Dirent[]);

    copyAndRenameFiles(SRC_DIR, TARGET_DIR);

    readdirSyncSpy.mockRestore();
  });

  test('should create a directory if it does not exist', () => {
    const NEW_TEST_DIR = 'testDir';

    expect(fs.existsSync(NEW_TEST_DIR)).toBe(false);
    ensureDirectoryExists(NEW_TEST_DIR);
    expect(fs.existsSync(NEW_TEST_DIR)).toBe(true);
    // delete the test directory after the test
    fs.rmSync(NEW_TEST_DIR, { recursive: true, force: true });
  });
});
