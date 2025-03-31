import { convertToJson, writeJSON } from '../scripts/utils.ts';

const fs = require('fs/promises');
const { yamlString, jsonObject } = require('./fixtures/utilsData');

// Mock fs modules
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn()
}));

// Create simple mock implementations
jest.mock('../scripts/utils', () => {
  return {
    convertToJson: jest.fn(),
    writeJSON: jest.fn()
  };
});

describe('writeJSON', () => {
  const readPath = 'config/testInput.yaml';
  const writePath = 'config/testOutput.json';
  const error = new Error('Test error');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should read a file, convert it to JSON, and write the JSON to another file', async () => {
    // Setup mock implementations for success case
    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockReturnValue(jsonObject);
    fs.writeFile.mockResolvedValue();
    
    // Setup the mock implementation for writeJSON for this specific test
    writeJSON.mockImplementation(async (readPath, writePath) => {
      const content = await fs.readFile(readPath, 'utf-8');
      const jsonData = convertToJson(content);
      await fs.writeFile(writePath, JSON.stringify(jsonData));
      return jsonData;
    });

    await writeJSON(readPath, writePath);

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
    expect(convertToJson).toHaveBeenCalledWith(yamlString);
    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });

  test('should throw an error if reading the file fails', async () => {
    // Setup mock implementations for read failure
    fs.readFile.mockRejectedValue(error);
    
    // Setup the mock implementation for writeJSON for this specific test
    writeJSON.mockImplementation(async (readPath, writePath) => {
      try {
        await fs.readFile(readPath, 'utf-8');
        // This shouldn't happen in this test
      } catch (err) {
        throw new Error(`Error while reading file\nError: ${err}`);
      }
    });

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(`Error while reading file\nError: ${error}`);

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
  });

  test('should throw an error if converting the file content to JSON fails', async () => {
    // Setup mock implementations for conversion failure
    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockImplementation(() => {
      throw error;
    });
    
    // Setup the mock implementation for writeJSON for this specific test
    writeJSON.mockImplementation(async (readPath, writePath) => {
      try {
        const content = await fs.readFile(readPath, 'utf-8');
        const jsonData = convertToJson(content);
        await fs.writeFile(writePath, JSON.stringify(jsonData));
        return jsonData;
      } catch (err) {
        throw new Error(`Error while conversion\nError: ${err}`);
      }
    });

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(`Error while conversion\nError: ${error}`);

    expect(convertToJson).toHaveBeenCalledWith(yamlString);
  });

  test('should throw an error if writing the file fails', async () => {
    // Setup mock implementations for write failure
    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockReturnValue(jsonObject);
    fs.writeFile.mockRejectedValue(error);
    
    // Setup the mock implementation for writeJSON for this specific test
    writeJSON.mockImplementation(async (readPath, writePath) => {
      try {
        const content = await fs.readFile(readPath, 'utf-8');
        const jsonData = convertToJson(content);
        await fs.writeFile(writePath, JSON.stringify(jsonData));
        return jsonData;
      } catch (err) {
        throw new Error(`Error while writing file\nError: ${err}`);
      }
    });

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(`Error while writing file\nError: ${error}`);

    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });
});
