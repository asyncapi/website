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

    try {
      await writeJSON(readPath, writePath);
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toBe(`Error while reading file\nError: ${err.message}`);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }

    expect(fs.readFile).toHaveBeenCalledWith(readPath, 'utf-8');
  });

  test('should throw an error if converting the file content to JSON fails', async () => {
    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockResolvedValue(yamlString);
    (convertToJson as jest.MockedFunction<typeof convertToJson>).mockImplementation(() => {
      throw error;
    });

    try {
      await writeJSON(readPath, writePath);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toBe(`Error while conversion\nError: ${err.message}`);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }

    expect(convertToJson).toHaveBeenCalledWith(yamlString);
  });

  test('should throw an error if writing the file fails', async () => {
    (fs.readFile as jest.MockedFunction<typeof fs.readFile>).mockResolvedValue(yamlString);
    (convertToJson as jest.MockedFunction<typeof convertToJson>).mockReturnValue(jsonObject);
    (fs.writeFile as jest.MockedFunction<typeof fs.writeFile>).mockRejectedValue(error);

    try {
      await writeJSON(readPath, writePath);
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toBe(`Error while writing file\nError: ${err.message}`);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }

    expect(fs.writeFile).toHaveBeenCalledWith(writePath, JSON.stringify(jsonObject));
  });
});
