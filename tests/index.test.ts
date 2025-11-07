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

  test('should filter out non-numeric files from finance directory', async () => {
    const mixedFiles = ['2024', '2023', 'readme.txt', '2022', '.gitkeep', 'notes.md'];
    const readdirSyncSpy = jest.spyOn(fs, 'readdirSync').mockReturnValue(mixedFiles as any);

    await start();

    // Should use the latest year (2024) after filtering
    expect(buildFinanceInfoList).toHaveBeenCalledWith(
      expect.objectContaining({
        year: '2024'
      })
    );

    readdirSyncSpy.mockRestore();
  });

  test('should sort years in descending order', async () => {
    const years = ['2020', '2022', '2021', '2024', '2023'];
    const readdirSyncSpy = jest.spyOn(fs, 'readdirSync').mockReturnValue(years as any);

    await start();

    // Should use the latest year (2024) after sorting
    expect(buildFinanceInfoList).toHaveBeenCalledWith(
      expect.objectContaining({
        year: '2024'
      })
    );

    readdirSyncSpy.mockRestore();
  });

  test('should handle decimal numbers in finance directory', async () => {
    const filesWithDecimals = ['2024.5', '2023.1', '2024'];
    const readdirSyncSpy = jest.spyOn(fs, 'readdirSync').mockReturnValue(filesWithDecimals as any);

    await start();

    // parseFloat should handle decimals, but they should be treated as numbers
    // The filter should keep them, and sorting should work correctly
    expect(buildFinanceInfoList).toHaveBeenCalled();

    readdirSyncSpy.mockRestore();
  });

  test('should handle only non-numeric files in finance directory', async () => {
    const nonNumericFiles = ['readme.txt', '.gitkeep', 'notes.md'];
    const readdirSyncSpy = jest.spyOn(fs, 'readdirSync').mockReturnValue(nonNumericFiles as any);

    await expect(start()).rejects.toThrow('No finance data found in the finance directory.');

    readdirSyncSpy.mockRestore();
  });
});
