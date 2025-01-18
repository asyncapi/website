const { resolve } = require('path');
const { writeJSON } = require('../../scripts/utils/readAndWriteJson.ts');
const { buildAdoptersList } = require('../../scripts/adopters/index.ts');

jest.mock('../../scripts/utils/readAndWriteJson.ts');

describe('buildAdoptersList', () => {

  test('should call writeJSON with correct arguments', async () => {
    const expectedReadPath = 'config/adopters.yml';
    const expectedWritePath = resolve(__dirname, '../../config', 'adopters.json');

    await buildAdoptersList();

    expect(writeJSON).toHaveBeenCalledWith(expectedReadPath, expectedWritePath);
  });

});
