import { convertToJson, pause, writeJSON } from '../scripts/utils.ts';
const { jsonString, yamlString, jsonObject, invalidString } = require('./fixtures/utilsData');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');

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
    it('should pause execution for specified time', async () => {
      const start = Date.now();
      await pause(100);
      const duration = Date.now() - start;
      expect(duration).toBeGreaterThanOrEqual(90); // Allow small margin of error
    });

    it('should resolve after timeout', async () => {
      const mockFn = jest.fn();
      setTimeout(mockFn, 50);
      await pause(100);
      expect(mockFn).toHaveBeenCalled();
    });

    // Test with timeout cleanup to prevent hanging tests
    it('should handle zero or negative timeout values', async () => {
      const mockSetTimeout = jest.spyOn(global, 'setTimeout');
      await pause(0);
      expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
      mockSetTimeout.mockRestore();
    });
  });

  describe('writeJSON', () => {
    const yamlContent = 'key: value';
    const jsonObject = { key: 'value' };

    it('should read, convert and write successfully', async () => {
      fs.readFile.mockResolvedValue(yamlContent);
      fs.writeFile.mockResolvedValue(undefined);

      const result = await writeJSON(readPath, writePath);
      
      expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
      expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
      expect(result).toEqual(jsonObject);
    });

    // Test ENOENT error handling
    it('should throw specific error for file not found (ENOENT)', async () => {
      const error = new Error('File not found');
      error.code = 'ENOENT';
      fs.readFile.mockRejectedValue(error);

      await expect(writeJSON(readPath, writePath))
        .rejects.toThrow('Error while reading file');
    });

    // Test read error handling
    it('should throw specific error for read errors', async () => {
      const error = new Error('Failed to read file');
      fs.readFile.mockRejectedValue(error);

      await expect(writeJSON(readPath, writePath))
        .rejects.toThrow('Error while reading file');
    });

    // Test write error handling
    it('should throw specific error for write errors', async () => {
      fs.readFile.mockResolvedValue(yamlContent);
      const error = new Error('Failed to write file');
      error.message = 'write error';
      fs.writeFile.mockRejectedValue(error);

      await expect(writeJSON(readPath, writePath))
        .rejects.toThrow('Error while writing file');
    });

    // Test conversion error handling
    it('should throw specific error for conversion errors', async () => {
      const invalidYaml = '{ invalid: yaml: content }';
      fs.readFile.mockResolvedValue(invalidYaml);

      await expect(writeJSON(readPath, writePath))
        .rejects.toThrow('Error while conversion');
    });

    // Test generic error handling
    it('should throw generic error for other errors', async () => {
      fs.readFile.mockResolvedValue(yamlContent);
      const error = new Error('Unknown error');
      error.message = 'unknown';
      fs.writeFile.mockRejectedValue(error);

      await expect(writeJSON(readPath, writePath))
        .rejects.toThrow('Error processing file');
    });
  });
});
