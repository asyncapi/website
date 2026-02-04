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

  test('should track stats correctly across recursive calls', () => {
    const stats = copyAndRenameFiles(SRC_DIR, TARGET_DIR);

    expect(stats.processedFiles).toBeGreaterThan(0);
    expect(stats.failedFiles).toEqual([]);
  });

  test('should continue processing other files when one file fails', () => {
    const ERROR_TEST_DIR = path.join(TEST_DIR, 'error-test');
    const ERROR_SRC_DIR = path.join(ERROR_TEST_DIR, 'src');
    const ERROR_TARGET_DIR = path.join(ERROR_TEST_DIR, 'target');

    // Setup test directories
    fs.mkdirSync(ERROR_SRC_DIR, { recursive: true });
    fs.mkdirSync(ERROR_TARGET_DIR, { recursive: true });

    // Create a good file and a subdirectory with files
    fs.writeFileSync(path.join(ERROR_SRC_DIR, 'good.md'), '<table></table>', 'utf8');
    fs.mkdirSync(path.join(ERROR_SRC_DIR, 'subdir'), { recursive: true });
    fs.writeFileSync(path.join(ERROR_SRC_DIR, 'subdir', 'nested-good.md'), '<table></table>', 'utf8');

    // Mock readFileSync to fail for a specific file
    const originalReadFileSync = fs.readFileSync;
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockImplementation((filePath: any, options: any) => {
      if (typeof filePath === 'string' && filePath.includes('good.md') && !filePath.includes('nested-good.md')) {
        throw new Error('Mock read error');
      }
      return originalReadFileSync(filePath, options);
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const stats = copyAndRenameFiles(ERROR_SRC_DIR, ERROR_TARGET_DIR);

    // Should have one failure and continue processing
    expect(stats.failedFiles.length).toBe(1);
    expect(stats.failedFiles[0]).toContain('good.md');
    expect(stats.processedFiles).toBeGreaterThanOrEqual(1); // nested-good.md should succeed
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Cleanup
    readFileSyncSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    fs.rmSync(ERROR_TEST_DIR, { recursive: true, force: true });
  });

  test('should handle directory read errors', () => {
    const NON_EXISTENT_DIR = 'non-existent-dir';
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      copyAndRenameFiles(NON_EXISTENT_DIR, TARGET_DIR);
    }).toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error reading source directory'),
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  test('should handle file write errors', () => {
    const WRITE_ERROR_TEST_DIR = path.join(TEST_DIR, 'write-error-test');
    const WRITE_ERROR_SRC_DIR = path.join(WRITE_ERROR_TEST_DIR, 'src');
    const WRITE_ERROR_TARGET_DIR = path.join(WRITE_ERROR_TEST_DIR, 'target');

    // Setup test directories
    fs.mkdirSync(WRITE_ERROR_SRC_DIR, { recursive: true });
    fs.mkdirSync(WRITE_ERROR_TARGET_DIR, { recursive: true });

    fs.writeFileSync(path.join(WRITE_ERROR_SRC_DIR, 'test.md'), '<table></table>', 'utf8');

    // Mock writeFileSync to fail
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('Mock write error');
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const stats = copyAndRenameFiles(WRITE_ERROR_SRC_DIR, WRITE_ERROR_TARGET_DIR);

    expect(stats.failedFiles.length).toBe(1);
    expect(stats.failedFiles[0]).toContain('test.md');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error writing file'),
      expect.any(Error)
    );

    // Cleanup
    writeFileSyncSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    fs.rmSync(WRITE_ERROR_TEST_DIR, { recursive: true, force: true });
  });

  test('should handle directory creation errors during recursion', () => {
    const DIR_ERROR_TEST_DIR = path.join(TEST_DIR, 'dir-error-test');
    const DIR_ERROR_SRC_DIR = path.join(DIR_ERROR_TEST_DIR, 'src');
    const DIR_ERROR_TARGET_DIR = path.join(DIR_ERROR_TEST_DIR, 'target');

    // Setup test directories
    fs.mkdirSync(DIR_ERROR_SRC_DIR, { recursive: true });
    fs.mkdirSync(path.join(DIR_ERROR_SRC_DIR, 'subdir'), { recursive: true });
    fs.mkdirSync(DIR_ERROR_TARGET_DIR, { recursive: true });

    // Mock mkdirSync to fail for subdirectory creation
    const originalMkdirSync = fs.mkdirSync;
    const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation((dirPath: any, options: any) => {
      if (typeof dirPath === 'string' && dirPath.includes('subdir')) {
        throw new Error('Mock mkdir error');
      }
      return originalMkdirSync(dirPath, options);
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    copyAndRenameFiles(DIR_ERROR_SRC_DIR, DIR_ERROR_TARGET_DIR);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error processing directory'),
      expect.any(Error)
    );

    // Cleanup
    mkdirSyncSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    fs.rmSync(DIR_ERROR_TEST_DIR, { recursive: true, force: true });
  });

  test('should handle file rename errors', () => {
    const RENAME_ERROR_TEST_DIR = path.join(TEST_DIR, 'rename-error-test');
    const RENAME_ERROR_SRC_DIR = path.join(RENAME_ERROR_TEST_DIR, 'src');
    const RENAME_ERROR_TARGET_DIR = path.join(RENAME_ERROR_TEST_DIR, 'target');

    // Setup test directories
    fs.mkdirSync(RENAME_ERROR_SRC_DIR, { recursive: true });
    fs.mkdirSync(RENAME_ERROR_TARGET_DIR, { recursive: true });

    fs.writeFileSync(path.join(RENAME_ERROR_SRC_DIR, 'test.md'), '<table></table>', 'utf8');

    // Mock renameSync to fail
    const renameSyncSpy = jest.spyOn(fs, 'renameSync').mockImplementation(() => {
      throw new Error('Mock rename error');
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const stats = copyAndRenameFiles(RENAME_ERROR_SRC_DIR, RENAME_ERROR_TARGET_DIR);

    expect(stats.failedFiles.length).toBe(1);
    expect(stats.failedFiles[0]).toContain('test.md');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error renaming file from .md to .mdx'),
      expect.any(Error)
    );

    // Cleanup
    renameSyncSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    fs.rmSync(RENAME_ERROR_TEST_DIR, { recursive: true, force: true });
  });

  test('should track failures in nested directories', () => {
    const NESTED_ERROR_TEST_DIR = path.join(TEST_DIR, 'nested-error-test');
    const NESTED_ERROR_SRC_DIR = path.join(NESTED_ERROR_TEST_DIR, 'src');
    const NESTED_ERROR_TARGET_DIR = path.join(NESTED_ERROR_TEST_DIR, 'target');

    // Setup test directories with nested structure
    fs.mkdirSync(NESTED_ERROR_SRC_DIR, { recursive: true });
    fs.mkdirSync(path.join(NESTED_ERROR_SRC_DIR, 'level1'), { recursive: true });
    fs.mkdirSync(path.join(NESTED_ERROR_SRC_DIR, 'level1', 'level2'), { recursive: true });
    fs.mkdirSync(NESTED_ERROR_TARGET_DIR, { recursive: true });

    // Create files at different levels
    fs.writeFileSync(path.join(NESTED_ERROR_SRC_DIR, 'root.md'), '<table></table>', 'utf8');
    fs.writeFileSync(path.join(NESTED_ERROR_SRC_DIR, 'level1', 'level1.md'), '<table></table>', 'utf8');
    fs.writeFileSync(path.join(NESTED_ERROR_SRC_DIR, 'level1', 'level2', 'level2.md'), '<table></table>', 'utf8');

    // Mock readFileSync to fail for nested file
    const originalReadFileSync = fs.readFileSync;
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockImplementation((filePath: any, options: any) => {
      if (typeof filePath === 'string' && filePath.includes('level2.md')) {
        throw new Error('Mock read error in nested directory');
      }
      return originalReadFileSync(filePath, options);
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const stats = copyAndRenameFiles(NESTED_ERROR_SRC_DIR, NESTED_ERROR_TARGET_DIR);

    // Should track the failure in nested directory
    expect(stats.failedFiles.length).toBe(1);
    expect(stats.failedFiles[0]).toContain('level2.md');
    expect(stats.processedFiles).toBe(2); // root.md and level1.md should succeed

    // Cleanup
    readFileSyncSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    fs.rmSync(NESTED_ERROR_TEST_DIR, { recursive: true, force: true });
  });
});

describe('ensureDirectoryExists', () => {
  test('should throw error when directory creation fails', () => {
    const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Mock mkdir error');
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      ensureDirectoryExists('test-fail-dir');
    }).toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error creating directory'),
      expect.any(Error)
    );

    mkdirSyncSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
