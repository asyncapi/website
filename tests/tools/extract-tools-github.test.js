const axios = require('axios');
const { getData } = require('../../scripts/tools/extract-tools-github.ts');
const { logger } = require('../../scripts/utils/logger.ts');

jest.mock('../../scripts/utils/logger', () => ({
  logger: { info: jest.fn() }
}));

jest.mock('axios');

describe('getData', () => {
  beforeAll(() => {
    process.env.GITHUB_TOKEN = 'mockToken';
  });
  it('should return data when API call is successful', async () => {
    const mockData = {
      data: {
        items: [
          {
            name: '.asyncapi-tool',
            path: 'asyncapi/.asyncapi-tool'
          }
        ],
        total_count: 1
      }
    };

    const apiBaseUrl = 'https://api.github.com/search/code?q=filename:.asyncapi-tool&per_page=50&page=1';
    const headers = {
      accept: 'application/vnd.github.text-match+json',
      authorization: `token ${process.env.GITHUB_TOKEN}`
    };

    axios.get.mockResolvedValue(mockData);

    const result = await getData();

    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(apiBaseUrl, { headers });
  });

  it('should return data when API call is successful, when items are more then one page', async () => {
    const mockInitialResponse = {
      data: {
        total_count: 100,
        items: Array.from({ length: 50 }, (_, index) => ({
          name: `.asyncapi-tool-${index + 1}`,
          path: `asyncapi/.asyncapi-tool-${index + 1}`
        }))
      }
    };

    const mockNextPageResponse = {
      data: {
        items: Array.from({ length: 50 }, (_, index) => ({
          name: `.asyncapi-tool-${index + 51}`,
          path: `asyncapi/.asyncapi-tool-${index + 51}`
        }))
      }
    };

    const apiBaseUrl = 'https://api.github.com/search/code?q=filename:.asyncapi-tool&per_page=50&page=';
    const headers = {
      accept: 'application/vnd.github.text-match+json',
      authorization: `token ${process.env.GITHUB_TOKEN}`
    };

    axios.get.mockResolvedValueOnce(mockInitialResponse).mockResolvedValueOnce(mockNextPageResponse);

    const result = await getData();

    // Check if the logger was called with the correct page numbers
    expect(logger.info).toHaveBeenCalledWith('Fetching page: 2');

    // Check if axios.get was called with the correct URLs
    expect(axios.get).toHaveBeenCalledWith(`${apiBaseUrl}1`, { headers });
    expect(axios.get).toHaveBeenCalledWith(`${apiBaseUrl}2`, { headers });

    // Check if the result contains all the items from both pages
    expect(result.items).toHaveLength(150);
  });

  it('should throw an error when API call fails', async () => {
    const mockError = new Error('Error');
    axios.get.mockRejectedValue(mockError);

    await expect(getData()).rejects.toThrow('Error');
  });
});
