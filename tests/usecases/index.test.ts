import { resolve } from 'path';

import { buildUsecasesList } from '../../scripts/usecases/index';
import { writeJSON } from '../../scripts/helpers/readAndWriteJson';

jest.mock('../../scripts/helpers/readAndWriteJson.ts');

describe('buildAdoptersList', () => {
  test('should call writeJSON with correct arguments', async () => {
    const expectedReadPath = 'config/usecases.yaml';
    const expectedWritePath = resolve(__dirname, '../../config', 'usecases.json');

    await buildUsecasesList();

    expect(writeJSON).toHaveBeenCalledWith(expectedReadPath, expectedWritePath, true);
  });
});
