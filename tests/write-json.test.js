const { promises: fs } = require('fs');
const { convertToJson } = require('../scripts/utils');
const writeJSON = require("../scripts/write-json")

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
    const fileContent = 'name: AsyncAPI\nage: 5';
    const jsonContent = { name: 'AsyncAPI', age: 5 };

    fs.readFile.mockResolvedValue(fileContent);
    convertToJson.mockReturnValue(jsonContent);

    await writeJSON(readPath, writePath);

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
    expect(convertToJson).toHaveBeenCalledWith(fileContent);
    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonContent));
  });

  test('should log an error if reading the file fails', async () => {
    const readPath = 'config/testInput.yaml';
    const writePath = 'config/testOutput.json';
    const error = new Error('File read error');

    fs.readFile.mockRejectedValue(error);
    console.log = jest.fn();

    await writeJSON(readPath, writePath);

    expect(console.log).toHaveBeenCalledWith(error);
  });

  test('should log an error if writing the file fails', async () => {
    const readPath = 'config/testInput.yml';
    const writePath = 'config/testOutput.json';
    const fileContent = 'name: AsyncAPI\nage: 5';
    const jsonContent = { name: 'AsyncAPI', age: 5 };
    const error = new Error('File write error');

    fs.readFile.mockResolvedValue(fileContent);
    convertToJson.mockReturnValue(jsonContent);
    fs.writeFile.mockRejectedValue(error);
    console.log = jest.fn();

    await writeJSON(readPath, writePath);

    expect(console.log).toHaveBeenCalledWith(error);
  });
});
