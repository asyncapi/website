import path from 'path';
import fetch from 'node-fetch-2';
import editOptions from '../../config/edit-page-config.json';
import {
  generatePaths,
  processBatch,
  checkUrls,
  determineEditLink,
  main
} from '../../scripts/markdown/check-edit-links.ts';
import { determineEditLinkData, processBatchData, testPaths } from '../fixtures/markdown/check-edit-links-data';
import { logger } from '../../scripts/utils/logger.ts';

jest.mock('../../scripts/utils/logger', () => ({
  logger: { info: jest.fn() }
}));
jest.mock('node-fetch-2', () => jest.fn());

describe('URL Checker Tests', () => {
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
  });

  describe('generatePaths', () => {
    const testDir = path.resolve(__dirname, '../../markdown/docs');

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

    it('should handle errors gracefully', async () => {
      const invalidDir = path.join(__dirname, 'nonexistent');
      await expect(generatePaths(invalidDir, editOptions)).rejects.toThrow();
    });
  });

  describe('processBatch', () => {
    const testBatch = processBatchData;

    it('should process valid URLs correctly', async () => {
      fetch.mockImplementation(() => Promise.resolve({ status: 200 }));
      const results = await processBatch(testBatch);
      expect(results.filter((r) => r !== null).length).toBe(0);
    });

    it('should detect 404 URLs', async () => {
      fetch.mockImplementation(() => Promise.resolve({ status: 404 }));
      const results = await processBatch(testBatch);
      const validResults = results.filter((r) => r !== null);
      expect(validResults.length).toBe(2);
      expect(validResults[0].editLink).toBe(testBatch[0].editLink);
    });

    it('should handle network errors', async () => {
      fetch.mockImplementation(() => Promise.reject(new Error('Network error')));
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
      fetch.mockImplementation(() => Promise.resolve({ status: 404 }));
      const results = await processBatch(batchWithIgnored);
      const validResults = results.filter((r) => r !== null);
      expect(validResults.length).toBe(2);
    });

    it('should handle request timeouts', async () => {
      fetch.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(resolve, 10000);
          })
      );
      await expect(processBatch(testBatch)).rejects.toThrow();
    }, 20000);
  });

  describe('checkUrls', () => {
    it('should process all URLs in batches', async () => {
      fetch.mockImplementation(() => Promise.resolve({ status: 200 }));
      const results = await checkUrls(testPaths);
      expect(results.length).toBe(0);
      expect(fetch).toHaveBeenCalledTimes(10);
    });

    it('should handle mixed responses correctly', async () => {
      fetch.mockImplementation((url) => {
        return Promise.resolve({
          status: url.includes('migration') ? 404 : 200
        });
      });
      const results = await checkUrls(testPaths);
      expect(results.length).toBe(2);
    });
  });

  describe('main', () => {
    it('should run successfully when all URLs are valid', async () => {
      fetch.mockImplementation(() => Promise.resolve({ status: 200 }));

      await main();

      expect(logger.info).toHaveBeenCalledWith('All URLs are valid.');
    });

    it('should report invalid URLs when found', async () => {
      fetch.mockImplementation(() => Promise.resolve({ status: 404 }));

      await main();

      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('URLs returning 404:'));
    });

    it('should handle errors gracefully', async () => {
      fetch.mockImplementation(() => Promise.reject(new Error('Network error')));

      await expect(main()).rejects.toThrow();
    });
  });
});
