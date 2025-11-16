import { resolve } from 'path';

import { buildAdoptersList } from '../../scripts/adopters/index';
import { writeJSON } from '../../scripts/helpers/readAndWriteJson';

jest.mock('../../scripts/helpers/readAndWriteJson.ts');

describe('buildAdoptersList', () => {
  test('should call writeJSON with correct arguments', async () => {
    const expectedReadPath = 'config/adopters.yml';
    const expectedWritePath = resolve(__dirname, '../../config', 'adopters.json');

    await buildAdoptersList(expectedReadPath, expectedWritePath);

    expect(writeJSON).toHaveBeenCalledWith(expectedReadPath, expectedWritePath);
  });

  test('should throw error when writeJSON fails', async () => {
    const mockError = new Error('Write failed');
    const sourcePath = 'config/adopters.yml';
    const targetPath = resolve(__dirname, '../../config', 'adopters.json');

    (writeJSON as jest.Mock).mockRejectedValue(mockError);

    await expect(buildAdoptersList(sourcePath, targetPath)).rejects.toThrow('Write failed');

    // Reset mock for other tests
    (writeJSON as jest.Mock).mockResolvedValue(undefined);
  });

  test('should throw error when sourcePath is missing', async () => {
    await expect(buildAdoptersList('', 'target.json')).rejects.toThrow('sourcePath is required');
  });

  test('should throw error when targetPath is missing', async () => {
    await expect(buildAdoptersList('source.yml', '')).rejects.toThrow('targetPath is required');
  });
});
