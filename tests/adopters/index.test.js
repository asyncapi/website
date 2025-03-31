import { writeJSON } from '../../scripts/utils.ts';
import { buildAdoptersList } from '../../scripts/adopters/index.ts';

const { resolve } = require('path');


jest.mock('../../scripts/utils.ts', () => ({
  writeJSON: jest.fn()
}));

describe('buildAdoptersList', () => {
  test('should call writeJSON with correct arguments', async () => {
    const expectedReadPath = 'config/adopters.yml';
    const expectedWritePath = resolve(__dirname, '../../config', 'adopters.json');

    await buildAdoptersList();

    expect(writeJSON).toHaveBeenCalledWith(expectedReadPath, expectedWritePath);
  });
});
