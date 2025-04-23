import { convertToJson, pause, writeJSON } from '../scripts/utils.ts';


const { jsonString, yamlString, jsonObject, invalidString } = require('./fixtures/utilsData');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');

// Define constants for error messages
const ERROR_MESSAGES = {
  READ: 'Error while reading file',
  WRITE: 'Error while writing file',
  CONVERSION: 'Error while conversion',
  GENERIC: 'Error processing file'
};

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  mkdir: jest.fn()
}));

describe('Utils Tests', () => {
  let tempDir;
  let readPath;
  let writePath;

  beforeEach(async () => {
    jest.clearAllMocks();
    tempDir = path.join(os.tmpdir(), 'asyncapi-test-');
    readPath = path.join(tempDir, 'test-input.yaml');
    writePath = path.join(tempDir, 'test-output.json');

    // Ensure directory exists
    fs.mkdir.mockResolvedValue(undefined);

    // Ensure files exist with initial content
    fs.readFile.mockImplementation((path) => {
      if (path === readPath) {
        return Promise.resolve(yamlString);
      }
      return Promise.reject(new Error('File not found'));
    });

    fs.writeFile.mockResolvedValue(undefined);
  });

  describe('convertToJson', () => {
    it('should parse JSON string correctly', () => {
      const result = convertToJson(jsonString);
      expect(result).toEqual(jsonObject);
    });

    it('should parse YAML string correctly', () => {
      const result = convertToJson(yamlString);
      expect(result).toEqual(jsonObject);
    });

    it('should return object directly if input is not a string', () => {
      const result = convertToJson(jsonObject);
      expect(result).toBe(jsonObject);
    });

    it('should throw error for invalid input', () => {
      expect(() => convertToJson(invalidString)).toThrow('Invalid content format');
    });
  });

  describe('pause', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should pause execution for specified time', async () => {
      const promise = pause(100);
      jest.advanceTimersByTime(100);
      await promise;
    });

    it('should allow pending callbacks to execute after timeout', async () => {
      const mockFn = jest.fn();
      setTimeout(mockFn, 50);
      const promise = pause(100);
      jest.advanceTimersByTime(100);
      await promise;
      expect(mockFn).toHaveBeenCalled();
    });

    it('should handle zero milliseconds without error', async () => {
      const promise = pause(0);
      jest.advanceTimersByTime(0);
      await expect(promise).resolves.not.toThrow();
    });
  });

  describe('writeJSON', () => {
    const yamlContent = 'key: value';
    const expectedJson = { key: 'value' };

    // Helper function to set up error tests
    const setupErrorTest = (errorType, errorProps = {}) => {
      const error = new Error(errorProps.message || 'Test error');
      Object.assign(error, errorProps);

      if (errorType === 'read') {
        fs.readFile.mockRejectedValue(error);
      } else if (errorType === 'write') {
        fs.readFile.mockResolvedValue(yamlContent);
        fs.writeFile.mockRejectedValue(error);
      }

      return error;
    };

    it('should read YAML content, convert to JSON, and write to output file', async () => {
      fs.readFile.mockResolvedValue(yamlContent);
      fs.writeFile.mockResolvedValue(undefined);

      const result = await writeJSON(readPath, writePath);

      expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
      expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(expectedJson));
      expect(result).toEqual(expectedJson);
    });

    it('should throw specific error when file is not found (ENOENT error code)', async () => {
      setupErrorTest('read', { code: 'ENOENT', message: 'File not found' });

      await expect(writeJSON(readPath, writePath)).rejects.toThrow(ERROR_MESSAGES.READ);
      expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
    });

    it('should throw specific error for general read failures', async () => {
      setupErrorTest('read', { message: 'Failed to read file' });

      await expect(writeJSON(readPath, writePath)).rejects.toThrow(ERROR_MESSAGES.READ);
      expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
    });

    it('should throw specific error when writing file fails', async () => {
      setupErrorTest('write', { message: 'write error' });

      await expect(writeJSON(readPath, writePath)).rejects.toThrow(ERROR_MESSAGES.WRITE);
      expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(expectedJson));
    });

    it('should throw specific error when YAML/JSON conversion fails', async () => {
      const invalidYaml = '{ invalid: yaml: content }';
      fs.readFile.mockResolvedValue(invalidYaml);

      await expect(writeJSON(readPath, writePath)).rejects.toThrow(ERROR_MESSAGES.CONVERSION);
    });

    it('should throw generic error for unspecified error types', async () => {
      setupErrorTest('write', { message: 'unknown' });

      await expect(writeJSON(readPath, writePath)).rejects.toThrow(ERROR_MESSAGES.GENERIC);
    });
  });
});
