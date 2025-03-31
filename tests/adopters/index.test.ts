import { resolve } from 'path';
import { writeJSON } from '../../scripts/utils/readAndWriteJson';
import { buildAdoptersList } from '../../scripts/adopters/index';

jest.mock('../../scripts/utils/readAndWriteJson', () => ({
  writeJSON: jest.fn() as jest.MockedFunction<typeof writeJSON>,
}));

describe('buildAdoptersList', () => {
  test('should call writeJSON with correct arguments', async () => {
    const expectedReadPath: string = 'config/adopters.yml';
    const expectedWritePath: string = resolve(__dirname, '../../config', 'adopters.json');

    await buildAdoptersList();

    expect(writeJSON).toHaveBeenCalledWith(expectedReadPath, expectedWritePath);
  });
});
