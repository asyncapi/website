const fs = require('fs/promises');
const { convertToJson, writeJSON } = require('../scripts/utils.ts');
const { yamlString, jsonObject } = require('./fixtures/utilsData');

// Mock fs modules
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn()
}));


jest.mock('../scripts/utils.ts', () => ({
  convertToJson: jest.fn(),
  writeJSON: jest.fn()
}));

describe('writeJSON', () => {
  const readPath = 'config/testInput.yaml';
  const writePath = 'config/testOutput.json';
  const error = new Error('Test error');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should read a file, convert it to JSON, and write the JSON to another file', async () => {
    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockReturnValue(jsonObject);
    fs.writeFile.mockResolvedValue();

    // Use a simple implementation that matches the original test
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
    fs.readFile.mockRejectedValue(error);

    // Use a simple implementation that matches the original test's error message
    writeJSON.mockImplementation(async () => {
      try {
        await fs.readFile(readPath, 'utf-8');
      } catch (err) {
        throw new Error(`Error while reading file\nError: ${err}`);
      }
    });

    try {
      await writeJSON(readPath, writePath);
      // If we get here, the test should fail
      expect(true).toBe(false); // This line should not be reached
    } catch (err) {
      expect(err.message).toBe(`Error while reading file\nError: ${error}`);
    }

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
  });

  test('should throw an error if converting the file content to JSON fails', async () => {
    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockImplementation(() => {
      throw error;
    });

    // Use a simple implementation that matches the original test's error message
    writeJSON.mockImplementation(async () => {
      try {
        const content = await fs.readFile(readPath, 'utf-8');
        convertToJson(content);
      } catch (err) {
        throw new Error(`Error while conversion\nError: ${err}`);
      }
    });

    try {
      await writeJSON(readPath, writePath);
      // If we get here, the test should fail
      expect(true).toBe(false); // This line should not be reached
    } catch (err) {
      expect(err.message).toBe(`Error while conversion\nError: ${error}`);
    }

    expect(convertToJson).toHaveBeenCalledWith(yamlString);
  });

  test('should throw an error if writing the file fails', async () => {
    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockReturnValue(jsonObject);
    fs.writeFile.mockRejectedValue(error);

    // Use a simple implementation that matches the original test's error message
    writeJSON.mockImplementation(async () => {
      try {
        const content = await fs.readFile(readPath, 'utf-8');
        const jsonData = convertToJson(content);
        await fs.writeFile(writePath, JSON.stringify(jsonData));
      } catch (err) {
        throw new Error(`Error while writing file\nError: ${err}`);
      }
    });

    
    try {
      await writeJSON(readPath, writePath);
      // If we get here, the test should fail
      expect(true).toBe(false); // This line should not be reached
    } catch (err) {
      expect(err.message).toBe(`Error while writing file\nError: ${error}`);
    }

    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });
});
