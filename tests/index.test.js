const rssFeed = require('../scripts/build-rss');
const {buildPostList} = require('../scripts/build-post-list');
const buildCaseStudiesList = require('../scripts/casestudies');
const buildAdoptersList = require('../scripts/adopters');
const buildFinanceInfoList = require('../scripts/finance');
const start = require('../scripts/index');

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
});
