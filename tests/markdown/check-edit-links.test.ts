import fs from 'fs/promises';
import fetch from 'node-fetch-2';
import path from 'path';

import editOptions from '../../config/edit-page-config.json';
import { logger } from '../../scripts/helpers/logger';
import {
  checkUrls,
  determineEditLink,
  generatePaths,
  main,
  processBatch
} from '../../scripts/markdown/check-edit-links';
import { determineEditLinkData, processBatchData, testPaths } from '../fixtures/markdown/check-edit-links-data';

jest.mock('../../scripts/helpers/logger.ts', () => ({
  logger: { info: jest.fn() }
}));
jest.mock('node-fetch-2', () => jest.fn());
function dirent(name: string, isFile = true, isDirectory = false) {
  return { name, isFile: () => isFile, isDirectory: () => isDirectory };
}

describe('URL Checker Tests', () => {
  const mockFetch = fetch as jest.Mock;
  const testDir = path.resolve(__dirname, '../../markdown/docs');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('determineEditLink', () => {
    it('should generate correct edit link for docs with /docs prefix', () => {
      const result = determineEditLink(
        determineEditLinkData[0].urlPath,
        determineEditLinkData[0].filePath,
        editOptions
      );

      expect(result).toBe(determineEditLinkData[0].editLink);
    });

    it('should generate correct edit link for docs without /docs prefix', () => {
      const result = determineEditLink(
        determineEditLinkData[1].urlPath,
        determineEditLinkData[1].filePath,
        editOptions
      );

      expect(result).toBe(determineEditLinkData[1].editLink);
    });
    it('should generate correct edit link for docs with a config', () => {
      const result = determineEditLink(
        determineEditLinkData[2].urlPath,
        determineEditLinkData[2].filePath,
        editOptions
      );

      expect(result).toBe(determineEditLinkData[2].editLink);
    });

    it('should return null when no matching target is found', () => {
      const result = determineEditLink(
        'some/nonexistent/path',
        'some/nonexistent/file.md',
        [] // Empty edit options to ensure no match
      );

      expect(result).toBe(null);
    });

    it('returns fallback link if editOption.value is empty', () => {
      const fallbackOption = [{ value: '', href: 'https://github.com/org/repo/edit/main' }];
      expect(
        determineEditLink('docs/anything', 'docs/anything.md', fallbackOption),
  ).toBe('https://github.com/org/repo/edit/main/docs/docs/anything.md');
    });

    it('returns correct link for specific match', () => {
      const options = [{ value: 'special', href: 'https://github.com/org/repo/edit/main' }];
      expect(
        determineEditLink('docs/special', 'docs/special.md', options),
  ).toBe('https://github.com/org/repo/edit/main/special.md');
    });
  });

  describe('generatePaths', () => {
    it('should generate correct paths for markdown files', async () => {
      const paths = await generatePaths(testDir, editOptions);
      expect(Array.isArray(paths)).toBe(true);
      paths.forEach((pathObj) => {
        expect(pathObj).toHaveProperty('filePath');
        expect(pathObj).toHaveProperty('urlPath');
        expect(pathObj).toHaveProperty('editLink');
      });
    });

    it('should skip _section.md files', async () => {
      const paths = await generatePaths(testDir, editOptions);
      const sectionFiles = paths.filter((p) => p.filePath.endsWith('_section.md'));
      expect(sectionFiles.length).toBe(0);
    });

    it('should skip non-markdown files', async () => {
      const mockReaddir = jest.spyOn(fs, 'readdir').mockImplementation(async (dir, opts) => [dirent('test.js', true, false),dirent('test.md', true, false)]);
      const result = await generatePaths(testDir, editOptions);

      // Only the markdown file should be included, not the js file
      expect(result.length).toBe(1);
      expect(result[0].filePath.endsWith('.md')).toBe(true);
      mockReaddir.mockRestore();
      mockStat.mockRestore();
    });

    it('should handle errors gracefully', async () => {
      const invalidDir = path.join(__dirname, 'nonexistent');
      await expect(generatePaths(invalidDir, editOptions)).rejects.toThrow();
    });

  
    it('throws TypeError for invalid folderPath', async () => {
  // @ts-expect-error
      await expect(generatePaths(undefined, editOptions)).rejects.toThrow(TypeError);
      await expect(generatePaths('', editOptions)).rejects.toThrow(TypeError);
    });

    it('throws error if readdir fails', async () => {
      jest.spyOn(fs, 'readdir').mockImplementationOnce(() => {throw new Error('FS error')});
      await expect(generatePaths(testDir, editOptions)).rejects.toThrow('FS error');
    });

    it('handles subdirectory traversal', async () => {
      jest.spyOn(fs, 'readdir').mockImplementationOnce(async () => [dirent('subdir', false, true),dirent('main.md', true, false)])
        .mockImplementationOnce(async () => [dirent('subfile.md', true, false)]);
      const result = await generatePaths(testDir, editOptions);

      expect(result.some((f) => f.filePath.endsWith('main.md'))).toBe(true);
      expect(result.some((f) => f.filePath.endsWith('subfile.md'))).toBe(true);
    });
  });

  describe('processBatch', () => {
    const testBatch = processBatchData;

    it('should process valid URLs correctly', async () => {
      mockFetch.mockImplementation(() => Promise.resolve({ status: 200 }));
      const results = await processBatch(testBatch);
      expect(results.filter((r) => r !== null).length).toBe(0);
    });

    it('should detect 404 URLs', async () => {
      mockFetch.mockImplementation(() => Promise.resolve({ status: 404 }));
      const results = await processBatch(testBatch);
      const validResults = results.filter((r) => r !== null);

      expect(validResults.length).toBe(2);
      expect(validResults[0].editLink).toBe(testBatch[0].editLink);
    });

    it('should handle network errors', async () => {
      mockFetch.mockImplementation(() => Promise.reject(new Error('Network error')));
      await expect(processBatch(testBatch)).rejects.toThrow();
    });

    it('should ignore files in ignoreFiles list', async () => {
      const batchWithIgnored = [
        ...testBatch,
        {
          filePath: 'reference/specification/v2.x.md',
          urlPath: 'docs/reference/specification/v2.x',
          editLink: 'https://github.com/org/repo/edit/main/v2.x.md'
        }
      ];
      mockFetch.mockImplementation(() => Promise.resolve({ status: 404 }));
      const results = await processBatch(batchWithIgnored);
      const validResults = results.filter((r) => r !== null);
      expect(validResults.length).toBe(2);
    });

    it('should handle request timeouts', async () => {
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(resolve, 10000);
          })
      );
      await expect(processBatch(testBatch)).rejects.toThrow();
    }, 20000);

    const batch = [
      {filePath: 'file1.md',urlPath: 'docs/file1',editLink: 'https://github.com/org/repo/edit/main/file1.md'},
      {filePath: 'reference/specification/v2.x.md',urlPath: 'docs/reference/specification/v2.x',editLink: 'https://github.com/org/repo/edit/main/v2.x.md'},
      { filePath: 'file2.md', urlPath: 'docs/file2', editLink: null } // no editLink
    ];

    it('skips files with no editLink or in ignoreFiles', async () => {
      mockFetch.mockImplementation(() => Promise.resolve({ status: 200 }));
      const result = await processBatch(batch);
      expect(result).toEqual([null, null, null]);
    });

    it('returns file if editLink is 404', async () => {
      mockFetch.mockImplementation(() => Promise.resolve({ status: 404 }));
      const result = await processBatch([{filePath: 'file.md', urlPath: 'docs/file',editLink: 'https://github.com/org/repo/edit/main/file.md'}]);
      expect(result[0]?.editLink).toContain('file.md');
    });

    it('rejects on network error', async () => {
      mockFetch.mockImplementation(() =>Promise.reject(new Error('Network error')));
      await expect(processBatch([{filePath: 'file.md',urlPath: 'docs/file',editLink: 'https://github.com/org/repo/edit/main/file.md'}])).rejects.toThrow('Network error');
    });
  });

  // ----------- checkUrls tests -----------
  describe('checkUrls', () => {
    it('should process all URLs in batches', async () => {
      mockFetch.mockImplementation(() => Promise.resolve({ status: 200 }));
      const results = await checkUrls(testPaths);
      expect(results.length).toBe(0);
      expect(mockFetch).toHaveBeenCalledTimes(10);
    });

    it('should handle mixed responses correctly', async () => {
      mockFetch.mockImplementation((url) => {
        return Promise.resolve({status: url.includes('migration') ? 404 : 200});
      });
      const results = await checkUrls(testPaths);
      expect(results.length).toBe(2);
    });

    it('returns only 404s from batch', async () => {
      mockFetch.mockImplementation((url) =>Promise.resolve({ status: url.includes('bad') ? 404 : 200 }));
      const paths = [{filePath: 'good.md',urlPath: 'docs/good',editLink: 'https://github.com/org/repo/edit/main/good.md'},{filePath: 'bad.md',urlPath: 'docs/bad',editLink: 'https://github.com/org/repo/edit/main/bad.md'}];
      const result = await checkUrls(paths);
      expect(result.length).toBe(1);
      expect(result[0].filePath).toBe('bad.md');
    });
  });

  describe('main', () => {
    it('should run successfully when all URLs are valid', async () => {
      mockFetch.mockImplementation(() => Promise.resolve({ status: 200 }));

      await main();

      expect(logger.info).toHaveBeenCalledWith('All URLs are valid.');
    });

    it('should report invalid URLs when found', async () => {
      mockFetch.mockImplementation(() => Promise.resolve({ status: 404 }));
      await main();
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('URLs returning 404:'));
    });

    it('should handle errors gracefully', async () => {
      mockFetch.mockImplementation(() => Promise.reject(new Error('Network error')));

      await expect(main()).rejects.toThrow();
    });
  });
});
