const { resolve } = require('path');
const writeJSON = require('../../scripts/utils/write-json');
const buildAdoptersList = require('../../scripts/adopters/index');

jest.mock('../../scripts/utils/write-json');

describe('buildAdoptersList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call writeJSON with correct arguments', async () => {
    const expectedReadPath = 'config/adopters.yml';
    const expectedWritePath = resolve(__dirname, '../../config', 'adopters.json');

    await buildAdoptersList();

    expect(writeJSON).toHaveBeenCalledWith(expectedReadPath, expectedWritePath);
  });

});
