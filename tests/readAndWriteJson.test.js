const { promises: fs } = require('fs');
const { convertToJson } = require('../scripts/utils');
const writeJSON = require("../scripts/utils/readAndWriteJson");
const {yamlString, jsonObject} = require("./fixtures/utilsData");

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should read a file, convert it to JSON, and write the JSON to another file', async () => {
    const readPath = 'config/testInput.yaml';
    const writePath = 'config/testOutput.json';

    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockReturnValue(jsonObject);

    await writeJSON(readPath, writePath);

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
    expect(convertToJson).toHaveBeenCalledWith(yamlString);
    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });

  test('should log an error and throw if reading the file fails', async () => {
    const readPath = 'config/testInput.yaml';
    const writePath = 'config/testOutput.json';
    const error = new Error('File read error');

    fs.readFile.mockRejectedValue(error);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error reading file from path ${readPath}:`,
      error
    );
    consoleErrorSpy.mockRestore();
  });

  test('should log an error and throw if converting the file content to JSON fails', async () => {
    const readPath = 'config/testInput.yaml';
    const writePath = 'config/testOutput.json';
    const error = new Error('Conversion error');

    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockImplementation(() => {
      throw error;
    });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error converting content to JSON:',
      error
    );
    consoleErrorSpy.mockRestore();
  });

  test('should log an error and throw if writing the file fails', async () => {
    const readPath = 'config/testInput.yaml';
    const writePath = 'config/testOutput.json';
    const error = new Error('File write error');

    fs.readFile.mockResolvedValue(yamlString);
    convertToJson.mockReturnValue(jsonObject);
    fs.writeFile.mockRejectedValue(error);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error writing JSON to path ${writePath}:`,
      error
    );
    consoleErrorSpy.mockRestore();
  });
});