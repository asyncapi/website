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

describe('copyAndRenameFiles error handling', () => {
  const TEST_DIR = 'test-error-handling';
  const SRC_DIR = path.join(TEST_DIR, 'src');
  const TARGET_DIR = path.join(TEST_DIR, 'target');

  beforeEach(() => {
    fs.mkdirSync(SRC_DIR, { recursive: true });
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  test('processes remaining files when one source file is unreadable', () => {
    const fileContent = '<table><tr><td>Hello</td></tr></table>';

    fs.writeFileSync(path.join(SRC_DIR, 'readable.md'), fileContent, 'utf8');
    fs.writeFileSync(path.join(SRC_DIR, 'unreadable.md'), 'irrelevant', 'utf8');

    const realReadFileSync = fs.readFileSync;
    const readSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(((
      filePath: fs.PathOrFileDescriptor,
      options?: any
    ) => {
      if (String(filePath).endsWith('unreadable.md')) {
        throw new Error('EACCES: permission denied');
      }

      return realReadFileSync(filePath, options);
    }) as typeof fs.readFileSync);

    const previousExitCode = process.exitCode;

    try {
      copyAndRenameFiles(SRC_DIR, TARGET_DIR);

      // the failing file is reported through the exit code...
      expect(process.exitCode).toBe(1);
      // ...while every other file is still processed correctly
      expect(fs.readFileSync(path.join(TARGET_DIR, 'readable.mdx'), 'utf8')).toBe(
        '<Table><Tr><Td>Hello</Td></Tr></Table>'
      );
    } finally {
      process.exitCode = previousExitCode;
      readSpy.mockRestore();
    }
  });

  test('reports an unreadable directory and continues with sibling entries', () => {
    const fileContent = '<div>Hello</div>';

    fs.writeFileSync(path.join(SRC_DIR, 'sibling.md'), fileContent, 'utf8');
    fs.mkdirSync(path.join(SRC_DIR, 'brokenDir'), { recursive: true });

    const realReaddirSync = fs.readdirSync;
    const readdirSpy = jest.spyOn(fs, 'readdirSync').mockImplementation(((dirPath: fs.PathLike, options?: any) => {
      if (String(dirPath).endsWith('brokenDir')) {
        throw new Error('EACCES: permission denied');
      }

      return realReaddirSync(dirPath, options);
    }) as unknown as typeof fs.readdirSync);

    const previousExitCode = process.exitCode;

    try {
      copyAndRenameFiles(SRC_DIR, TARGET_DIR);

      expect(process.exitCode).toBe(1);
      // the sibling file of the broken directory is still processed
      expect(fs.readFileSync(path.join(TARGET_DIR, 'sibling.mdx'), 'utf8')).toBe('<div>Hello</div>');
    } finally {
      process.exitCode = previousExitCode;
      readdirSpy.mockRestore();
    }
  });

  test('logs a file-specific error message instead of a bare stack trace', () => {
    const stderrSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);

    fs.writeFileSync(path.join(SRC_DIR, 'bad.md'), 'irrelevant', 'utf8');
    const realReadFileSync = fs.readFileSync;

    jest.spyOn(fs, 'readFileSync').mockImplementation(((filePath: fs.PathOrFileDescriptor, options?: any) => {
      if (String(filePath).endsWith('bad.md')) {
        throw new Error('boom');
      }

      return realReadFileSync(filePath, options);
    }) as typeof fs.readFileSync);

    const previousExitCode = process.exitCode;

    try {
      copyAndRenameFiles(SRC_DIR, TARGET_DIR);

      const logged = stderrSpy.mock.calls.map((call) => String(call[0])).join('\n');

      expect(logged).toContain('bad.md');
    } finally {
      process.exitCode = previousExitCode;
      stderrSpy.mockRestore();
    }
  });
});
