const { promises: fs } = require('fs');
const { convertToJson } = require('../scripts/utils');
const writeJSON = require("../scripts/utils/readAndWriteJson");
const { yamlString, jsonObject } = require("./fixtures/utilsData");

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

jest.mock('../scripts/utils', () => ({
  convertToJson: jest.fn(),
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

    await writeJSON(readPath, writePath);

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
    expect(convertToJson).toHaveBeenCalledWith(yamlString);
    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });

  test('should throw an error if reading the file fails', async () => {
    fs.readFile.mockRejectedValue(error);

    try {
      await writeJSON(readPath, writePath);
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

    try {
      await writeJSON(readPath, writePath);
    } catch (err) {
      expect(err.message).toBe(`Error while conversion\nError: ${error}`);
    }

    expect(convertToJson).toHaveBeenCalledWith(yamlString);
  });

  test('should throw an error if writing the file fails', async () => {
    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockReturnValue(jsonObject);
    fs.writeFile.mockRejectedValue(error);

    try {
      await writeJSON(readPath, writePath);
    } catch (err) {
      expect(err.message).toBe(`Error while writing file\nError: ${error}`);
    }

    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });

});
