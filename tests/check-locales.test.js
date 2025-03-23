const path = require('path');

const mockFs = {
  readdirSync: jest.fn(),
  statSync: jest.fn(),
  readFileSync: jest.fn()
};

jest.mock('fs', () => mockFs);

jest.mock('path', () => {
  const originalPath = jest.requireActual('path');
  return {
    ...originalPath,
    resolve: jest.fn().mockReturnValue('/mock/path/locales'),
    join: jest.fn().mockImplementation((...args) => args.join('/'))
  };
});

jest.mock('../scripts/utils/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
  }
}));

const { validateLocales, extractKeys, readJSONFilesInDir } = require('../scripts/utils/check-locales');
const { logger } = require('../scripts/utils/logger');

jest.mock('path', () => {
  const originalPath = jest.requireActual('path');
  return {
    ...originalPath,
    dirname: jest.fn().mockReturnValue('/mock/dir'),
    resolve: jest.fn().mockReturnValue('/mock/path/locales'),
    join: jest.fn().mockImplementation((...args) => args.join('/'))
  };
});

describe('check-locales', () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
  
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
    
    mockFs.readdirSync.mockReturnValue(files);
    mockFs.readFileSync.mockImplementation((filePath) => {
      if (filePath.includes('file1.json')) return '{"key1":"value1"}';
      if (filePath.includes('file2.json')) return '{"key2":"value2"}';
      return '';
    });
    
    const result = readJSONFilesInDir(dir);
    
    expect(result).toEqual({
      'file1.json': { key1: 'value1' },
      'file2.json': { key2: 'value2' },
    });
  });

  it('should validate locales and find no errors', () => {
    const localesDir = '/mock/path/locales';
    const languages = ['en', 'de'];
    
    mockFs.readdirSync.mockImplementationOnce(() => languages);
    
    mockFs.statSync.mockImplementation(() => ({
      isDirectory: () => true
    }));
    
    mockFs.readdirSync.mockImplementationOnce(() => ['common.json']);
    mockFs.readdirSync.mockImplementationOnce(() => ['common.json']);
    
    mockFs.readFileSync.mockReturnValue('{"key1":"value1","key2":"value2"}');
    
    validateLocales();
    
    expect(logger.info).toHaveBeenCalledWith('✅ All locale files have the same keys across all languages!');
    expect(mockExit).not.toHaveBeenCalled();
  });

  it('should validate locales and find missing keys', () => {
    const localesDir = '/mock/path/locales';
    const languages = ['en', 'de'];
    
    jest.clearAllMocks();
    
    mockFs.readdirSync.mockImplementationOnce(() => languages);
    
    mockFs.statSync.mockImplementation(() => ({
      isDirectory: () => true
    }));
    
    mockFs.readdirSync.mockImplementationOnce(() => ['common.json']);
    mockFs.readdirSync.mockImplementationOnce(() => ['common.json']);
    
    mockFs.readFileSync.mockImplementation((filePath) => {
      if (filePath.includes('en')) {
        return '{"key1":"value1","key2":"value2"}';
      } else {
        return '{"key1":"value1"}';
      }
    });
    
    validateLocales();
    
    expect(logger.error).toHaveBeenCalledWith(
      "❌ Language 'de' is missing these keys: key2"
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should handle errors during validation', () => {
    const testError = new Error('Test error');
    
    mockFs.readdirSync.mockImplementationOnce(() => {
      throw testError;
    });
    
    validateLocales();
    
    expect(logger.error).toHaveBeenCalledWith(
      'Error validating locales:',
      testError
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should log an error if no language directories are found', () => {
    mockFs.readdirSync.mockReturnValueOnce([]);
    
    validateLocales();
    
    expect(logger.error).toHaveBeenCalledWith(
      'No language directories found in',
      '/mock/path/locales'
    );
  });

  it('should log an error if JSON file reading fails', () => {
    const dir = '/mock/dir';
    const files = ['file1.json'];
    const testError = new Error('Test read error');
    
    mockFs.readdirSync.mockReturnValue(files);
    mockFs.readFileSync.mockImplementation(() => {
      throw testError;
    });
    
    const result = readJSONFilesInDir(dir);
    
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(`Error reading`),
      expect.any(String)
    );
    expect(result).toEqual({ 'file1.json': {} });
  });
  it('should handle directory reading errors', () => {
    const dir = '/mock/dir';
    const testError = new Error('Directory read error');
    
    mockFs.readdirSync.mockImplementationOnce(() => {
      throw testError;
    });
    
    const result = readJSONFilesInDir(dir);
    
    expect(logger.error).toHaveBeenCalledWith(
      'Error reading directory /mock/dir:',
      'Directory read error'
    );
    
    expect(result).toEqual({});
  });
  
  it('should handle non-Error exceptions during validation', () => {
    mockFs.readdirSync.mockImplementationOnce(() => {
      throw 'String error';
    });
    
    validateLocales();
    
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should handle JSON parsing errors with non-Error objects', () => {
    const dir = '/mock/dir';
    const files = ['file1.json'];
    
    mockFs.readdirSync.mockReturnValue(files);
    mockFs.readFileSync.mockReturnValue('invalid json');
    
    const originalJsonParse = JSON.parse;
    global.JSON.parse = jest.fn().mockImplementation(() => {
      throw 'Invalid JSON format';
    });
    
    try {
      const result = readJSONFilesInDir(dir);
      expect(result).toEqual({ 'file1.json': {} });
    } finally {
      global.JSON.parse = originalJsonParse;
    }
  });
  
  it('should handle the case when a language has no file', () => {
    const languages = ['en', 'de'];
    
    mockFs.readdirSync.mockImplementationOnce(() => languages);
    
    mockFs.statSync.mockImplementation(() => ({
      isDirectory: () => true
    }));
    
    mockFs.readdirSync.mockImplementationOnce(() => ['unique.json']);
    mockFs.readdirSync.mockImplementationOnce(() => []);
    
    mockFs.readFileSync.mockReturnValue('{"key1":"value1"}');
    
    validateLocales();
    
    expect(logger.info).toHaveBeenCalledWith('✅ All locale files have the same keys across all languages!');
  });
});