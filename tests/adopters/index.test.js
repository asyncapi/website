const { resolve } = require('path');
const writeJSON = require('../../scripts/utils/readAndWriteJson.js');
const buildAdoptersList = require('../../scripts/adopters/index');

jest.mock('../../scripts/utils/readAndWriteJson.js');

describe('buildAdoptersList', () => {

  test('should call writeJSON with correct arguments', async () => {
    const expectedReadPath = 'config/adopters.yml';
    const expectedWritePath = resolve(__dirname, '../../config', 'adopters.json');

    await buildAdoptersList();

    expect(writeJSON).toHaveBeenCalledWith(expectedReadPath, expectedWritePath);
  });

});
