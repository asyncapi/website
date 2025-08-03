import fs from 'fs';

import { extractKeys, readJSONFilesInDir, validateLocales } from '../scripts/helpers/check-locales';
import { logger } from '../scripts/helpers/logger';

jest.mock('../scripts/helpers/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
  }
}));

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
  statSync: jest.fn(),
  readFileSync: jest.fn()
}));

jest.mock('path', () => {
  const originalPath = jest.requireActual('path');

  return {
    ...originalPath,
    dirname: jest.fn().mockReturnValue('/mock/dir'),
    resolve: jest.fn().mockReturnValue('/mock/path/locales'),
    join: jest.fn().mockImplementation((...args: string[]) => args.join('/'))
  };
});

// Get the mocked fs module with proper typing
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('check-locales', () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    throw new Error('process.exit() was called');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should extract keys from a JSON object', () => {
    const obj = { a: { b: { c: 1 } }, d: 2 };
    const keys = extractKeys(obj);

    expect(keys).toEqual(['a.b.c', 'd']);
  });

  it('should read JSON files in a directory', () => {
    const dir = '/mock/dir';
    const files = ['file1.json', 'file2.json', 'not-json.txt'];

    mockedFs.readdirSync.mockReturnValue(files as any);
    mockedFs.readFileSync.mockImplementation((filePath: any) => {
      if (typeof filePath === 'string' && filePath.includes('file1.json')) return '{"key1":"value1"}';
      if (typeof filePath === 'string' && filePath.includes('file2.json')) return '{"key2":"value2"}';

      return '';
    });

    const result = readJSONFilesInDir(dir);

    expect(result).toEqual({
      'file1.json': { key1: 'value1' },
      'file2.json': { key2: 'value2' }
    });
  });

  it('should validate locales and find no errors', () => {
    const languages = ['en', 'de'];

    mockedFs.readdirSync.mockImplementationOnce(() => languages as any);

    mockedFs.statSync.mockImplementation(
      () =>
        ({
          isDirectory: () => true,
          isFile: () => false,
          isBlockDevice: () => false,
          isCharacterDevice: () => false,
          isSymbolicLink: () => false,
          isFIFO: () => false,
          isSocket: () => false
        }) as any
    );

    mockedFs.readdirSync.mockImplementationOnce(() => ['common.json'] as any);

    mockedFs.readFileSync.mockReturnValue('{"key1":"value1","key2":"value2"}');

    validateLocales();

    expect(logger.info).toHaveBeenCalledWith('✅ All locale files have the same keys across all languages!');
    expect(mockExit).not.toHaveBeenCalled();
  });

  it('should validate locales and find missing keys', () => {
    const languages = ['en', 'de'];

    jest.clearAllMocks();

    mockedFs.readdirSync
      .mockImplementationOnce(() => languages as any)
      .mockImplementationOnce(() => ['common.json'] as any)
      .mockImplementationOnce(() => ['common.json'] as any);

    mockedFs.statSync.mockImplementation(
      () =>
        ({
          isDirectory: () => true,
          isFile: () => false,
          isBlockDevice: () => false,
          isCharacterDevice: () => false,
          isSymbolicLink: () => false,
          isFIFO: () => false,
          isSocket: () => false
        }) as any
    );

    mockedFs.readFileSync.mockImplementation((filePath: any) => {
      if (typeof filePath === 'string' && filePath.includes('en')) {
        return '{"key1":"value1","key2":"value2"}';
      }

      return '{"key1":"value1"}';
    });

    expect(() => validateLocales()).toThrow('Some translation keys are missing');

    expect(logger.error).toHaveBeenCalledWith(
      "Translation keys missing in language 'de'",
      expect.objectContaining({
        operation: 'validateTranslationKeys',
        fileName: 'common.json',
        language: 'de',
        missingKeys: ['key2'],
        missingKeyCount: 1,
        totalKeysInFile: 2,
        errorType: 'MISSING_TRANSLATION_KEYS'
      })
    );
  });

  it('should handle errors during validation', () => {
    mockedFs.readdirSync.mockImplementationOnce(() => {
      throw new Error('Error validating locales');
    });

    expect(() => validateLocales()).toThrow('Error validating locales');

    expect(logger.error).toHaveBeenCalledWith(
      'Locale validation process failed',
      expect.objectContaining({
        error: expect.any(Error),
        operation: 'validateLocales',
        localesDir: expect.any(String),
        absoluteLocalesDir: expect.any(String),
        errorType: 'VALIDATION_PROCESS_ERROR',
        stage: 'main_validation_loop'
      })
    );
  });

  it('should log an error if no language directories are found', () => {
    mockedFs.readdirSync.mockReturnValueOnce([] as any);

    expect(() => validateLocales()).toThrow('No language directories found in');

    expect(logger.error).toHaveBeenCalledWith(
      'Locale validation failed: No language directories',
      expect.objectContaining({
        error: expect.any(Error),
        operation: 'validateLocales',
        localesDir: expect.any(String),
        absoluteLocalesDir: expect.any(String),
        errorType: 'NO_LANGUAGE_DIRECTORIES',
        expectedStructure: 'Expected subdirectories like en/, es/, fr/ containing JSON files'
      })
    );
  });

  it('should log an error if JSON file reading fails', () => {
    const dir = '/mock/dir';
    const files = ['file1.json'];

    mockedFs.readdirSync.mockReturnValue(files as any);
    mockedFs.readFileSync.mockImplementation(() => {
      throw new SyntaxError('Unexpected token');
    });

    const result = readJSONFilesInDir(dir);

    expect(logger.error).toHaveBeenCalledWith(
      'Failed to parse JSON locale file',
      expect.objectContaining({
        error: expect.any(Error),
        operation: 'parseJSON',
        filePath: '/mock/dir/file1.json',
        fileName: 'file1.json',
        directory: dir,
        fileExtension: '.json',
        errorType: 'JSON_SYNTAX_ERROR'
      })
    );
    expect(result).toEqual({ 'file1.json': {} });
  });

  it('should handle directory reading errors', () => {
    const dir = '/mock/dir';

    mockedFs.readdirSync.mockImplementationOnce(() => {
      throw new Error('ENOENT: no such file or directory');
    });

    const result = readJSONFilesInDir(dir);

    expect(logger.error).toHaveBeenCalledWith(
      'Failed to read locale directory',
      expect.objectContaining({
        error: expect.any(Error),
        operation: 'readDirectory',
        directory: dir,
        absolutePath: expect.any(String),
        errorType: 'DIRECTORY_ACCESS_ERROR'
      })
    );

    expect(result).toEqual({});
  });

  it('should handle non-Error exceptions during validation', () => {
    mockedFs.readdirSync.mockImplementationOnce(() => {
      throw new Error('String error');
    });

    expect(() => validateLocales()).toThrow('String error');
  });

  it('should handle JSON parsing errors with non-Error objects', () => {
    const dir = '/mock/dir';
    const files = ['file1.json'];

    mockedFs.readdirSync.mockReturnValue(files as any);
    mockedFs.readFileSync.mockReturnValue('invalid json');

    const originalJsonParse = JSON.parse;

    global.JSON.parse = jest.fn().mockImplementation(() => {
      throw new SyntaxError('Invalid JSON format');
    });

    try {
      const result = readJSONFilesInDir(dir);

      expect(result).toEqual({ 'file1.json': {} });

      expect(logger.error).toHaveBeenCalledWith(
        'Failed to parse JSON locale file',
        expect.objectContaining({
          error: expect.any(Error),
          operation: 'parseJSON',
          errorType: 'JSON_SYNTAX_ERROR'
        })
      );
    } finally {
      global.JSON.parse = originalJsonParse;
    }
  });

  it('should handle the case when a language has no file', () => {
    const languages = ['en', 'de'];

    mockedFs.readdirSync
      .mockImplementationOnce(() => languages as any)
      .mockImplementationOnce(() => ['unique.json'] as any)
      .mockImplementationOnce(() => [] as any);

    mockedFs.statSync.mockImplementation(
      () =>
        ({
          isDirectory: () => true,
          isFile: () => false,
          isBlockDevice: () => false,
          isCharacterDevice: () => false,
          isSymbolicLink: () => false,
          isFIFO: () => false,
          isSocket: () => false
        }) as any
    );

    mockedFs.readFileSync.mockReturnValue('{"key1":"value1"}');

    validateLocales();

    expect(logger.info).toHaveBeenCalledWith('✅ All locale files have the same keys across all languages!');
  });

  it('should handle files with no missing keys', () => {
    const languages = ['en', 'de'];

    mockedFs.readdirSync
      .mockImplementationOnce(() => languages as any)
      .mockImplementationOnce(() => ['common.json'] as any)
      .mockImplementationOnce(() => ['common.json'] as any);

    mockedFs.statSync.mockImplementation(
      () =>
        ({
          isDirectory: () => true,
          isFile: () => false,
          isBlockDevice: () => false,
          isCharacterDevice: () => false,
          isSymbolicLink: () => false,
          isFIFO: () => false,
          isSocket: () => false
        }) as any
    );

    // Both languages have the same keys
    mockedFs.readFileSync.mockReturnValue('{"key1":"value1","key2":"value2"}');

    validateLocales();

    expect(logger.info).toHaveBeenCalledWith('✅ All locale files have the same keys across all languages!');
  });

  it('should log when skipping files found in only one language', () => {
    const languages = ['en', 'de'];

    mockedFs.readdirSync
      .mockImplementationOnce(() => languages as any)
      .mockImplementationOnce(() => ['common.json', 'unique.json'] as any)
      .mockImplementationOnce(() => ['common.json'] as any);

    mockedFs.statSync.mockImplementation(
      () =>
        ({
          isDirectory: () => true,
          isFile: () => false,
          isBlockDevice: () => false,
          isCharacterDevice: () => false,
          isSymbolicLink: () => false,
          isFIFO: () => false,
          isSocket: () => false
        }) as any
    );

    mockedFs.readFileSync.mockReturnValue('{"key1":"value1"}');

    validateLocales();

    expect(logger.info).toHaveBeenCalledWith("Skipping 'unique.json' (only found in 1 language)");
  });
});
