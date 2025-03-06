const fs = require('fs');
const { rssFeed } = require('../scripts/build-rss.ts');
const { buildPostList } = require('../scripts/build-post-list.ts');
const { buildCaseStudiesList } = require('../scripts/casestudies/index.ts');
const { buildAdoptersList } = require('../scripts/adopters/index.ts');
const { buildFinanceInfoList } = require('../scripts/finance/index.ts');
const { start } = require('../scripts/index.ts');

jest.mock('../scripts/build-rss');
jest.mock('../scripts/build-post-list');
jest.mock('../scripts/casestudies');
jest.mock('../scripts/adopters');
jest.mock('../scripts/finance');

describe('start function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call all functions in the correct order', async () => {
    await start();

    expect(buildPostList).toHaveBeenCalled();

    expect(rssFeed).toHaveBeenCalledWith(
      'blog',
      'AsyncAPI Initiative Blog RSS Feed',
      'AsyncAPI Initiative Blog',
      'rss.xml'
    );

    expect(buildCaseStudiesList).toHaveBeenCalled();
    expect(buildAdoptersList).toHaveBeenCalled();
    expect(buildFinanceInfoList).toHaveBeenCalled();
  });

  test('should throw an error if no finance data is found', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([]);

    await expect(start()).rejects.toThrow('No finance data found in the finance directory.');

    expect(buildFinanceInfoList).not.toHaveBeenCalled();

    fs.readdirSync.mockRestore();
  });
});
