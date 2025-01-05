const axios = require('axios');
const { getData } = require('../../scripts/tools/extract-tools-github');

jest.mock('axios');

describe('getData', () => {
  it('should return data when API call is successful', async () => {

    const mockData = {
      data: {
				items:[
					{
						name: '.asyncapi-tool',
						path: 'asyncapi/.asyncapi-tool',
					}
				],
				total_count: 1,
      },
    };

    const apiBaseUrl = 'https://api.github.com/search/code?q=filename:.asyncapi-tool&per_page=50&page=1';
    const headers = {
      accept: 'application/vnd.github.text-match+json',
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    };

    axios.get.mockResolvedValue(mockData);

    const result = await getData();

    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(
      apiBaseUrl, { headers }
    );
  });


  it('should throw an error when API call fails', async () => {
    const mockError = new Error('Error');
    axios.get.mockRejectedValue(mockError);

    await expect(getData()).rejects.toThrow('Error');
  });
});
