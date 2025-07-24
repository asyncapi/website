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
});
