import fs from 'fs';

import { buildAdoptersList } from '../scripts/adopters/index';
import { buildPostList } from '../scripts/build-post-list';
import { rssFeed } from '../scripts/build-rss';
import { buildCaseStudiesList } from '../scripts/casestudies/index';
import { buildFinanceInfoList } from '../scripts/finance/index';
import { start } from '../scripts/index';

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
    const readdirSyncSpy = jest.spyOn(fs, 'readdirSync').mockReturnValue([]);

    await expect(start()).rejects.toThrow('No finance data found in the finance directory.');
    expect(readdirSyncSpy).toHaveBeenCalledTimes(1);
    expect(buildFinanceInfoList).not.toHaveBeenCalled();

    readdirSyncSpy.mockRestore();
  });
});
