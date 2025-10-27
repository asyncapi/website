import { resolve } from 'path';

import { buildAdoptersList } from '../../scripts/adopters/index';
import { writeJSON } from '../../scripts/helpers/readAndWriteJson';

jest.mock('../../scripts/helpers/readAndWriteJson.ts');

describe('buildAdoptersList', () => {
  test('should call writeJSON with correct arguments', async () => {
    const expectedReadPath = 'config/adopters.yml';
    const expectedWritePath = resolve(__dirname, '../../config', 'adopters.json');

    await buildAdoptersList();

    expect(writeJSON).toHaveBeenCalledWith(expectedReadPath, expectedWritePath);
  });

  test('should throw error when writeJSON fails', async () => {
    const mockError = new Error('Write failed');

    (writeJSON as jest.Mock).mockRejectedValue(mockError);

    await expect(buildAdoptersList()).rejects.toThrow('Write failed');

    // Reset mock for other tests
    (writeJSON as jest.Mock).mockResolvedValue(undefined);
  });
});
