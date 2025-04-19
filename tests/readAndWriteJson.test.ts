import fs from 'fs/promises';

import { convertToJson } from '../scripts/utils';
import { writeJSON } from '../scripts/utils/readAndWriteJson';
import { jsonObject, yamlString } from './fixtures/utilsData';

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn()
}));

jest.mock('../scripts/utils', () => ({
  convertToJson: jest.fn()
}));

describe('writeJSON', () => {
  const readPath = 'config/testInput.yaml';
  const writePath = 'config/testOutput.json';
  const error = new Error('Test error');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should read a file, convert it to JSON, and write the JSON to another file', async () => {
    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockResolvedValue(yamlString);
    (convertToJson as jest.MockedFunction<typeof convertToJson>).mockReturnValue(jsonObject);

    await writeJSON(readPath, writePath);

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
    expect(convertToJson).toHaveBeenCalledWith(yamlString);
    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });

  test('should throw an error if reading the file fails', async () => {
    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockRejectedValue(error);

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(error);

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
  });

  test('should throw an error if converting the file content to JSON fails', async () => {
    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockResolvedValue(yamlString);
    (convertToJson as jest.MockedFunction<typeof convertToJson>).mockImplementation(() => {
      throw error;
    });

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(error);

    expect(convertToJson).toHaveBeenCalledWith(yamlString);
  });

  test('should throw an error if writing the file fails', async () => {
    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockResolvedValue(yamlString);
    (convertToJson as jest.MockedFunction<typeof convertToJson>).mockReturnValue(jsonObject);
    (fs.writeFile as jest.MockedFunction<typeof fs.writeFile>).mockRejectedValue(error);

    await expect(writeJSON(readPath, writePath)).rejects.toThrow(error);

    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });

  test('should throw an error with unknown error message if reading the file fails with non-Error type', async () => {
    const nonErrorType = 'String error message';

    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockRejectedValue(nonErrorType);

    await expect(writeJSON(readPath, writePath)).rejects.toThrow('Error while reading file\nError: Unknown error');

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
  });

  test('should throw an error with unknown error message if converting the file content fails with non-Error type', async () => {
    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockResolvedValue(yamlString);
    (convertToJson as jest.MockedFunction<typeof convertToJson>).mockImplementation(() => {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw 'Non-Error type exception';
    });

    await expect(writeJSON(readPath, writePath)).rejects.toThrow('Error while conversion\nError: Unknown error');

    expect(convertToJson).toHaveBeenCalledWith(yamlString);
  });

  test('should throw an error with unknown error message if writing the file fails with non-Error type', async () => {
    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockResolvedValue(yamlString);
    (convertToJson as jest.MockedFunction<typeof convertToJson>).mockReturnValue(jsonObject);
    (fs.writeFile as jest.MockedFunction<typeof fs.writeFile>).mockRejectedValue('Non-Error write exception');

    await expect(writeJSON(readPath, writePath)).rejects.toThrow('Error while writing file\nError: Unknown error');

    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });
});
