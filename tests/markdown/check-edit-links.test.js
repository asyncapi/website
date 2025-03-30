const path = require('path');
const fetch = require('node-fetch-2');
const editOptions = require('../../config/edit-page-config.json');
const {
  generatePaths,
  processBatch,
  checkUrls,
  determineEditLink,
  main
} = require('../../scripts/markdown/check-edit-links.ts');
const { determineEditLinkData, processBatchData, testPaths } = require('../fixtures/markdown/check-edit-links-data');
import { logger } from '../../scripts/utils.ts';

jest.mock('../../scripts/utils', () => ({
  logger: { info: jest.fn() },
  pause: jest.fn().mockResolvedValue(undefined)
}));
jest.mock('node-fetch-2', () => jest.fn());

describe('URL Checker Tests', () => {
  // Define ignoreFiles to match the implementation
  const ignoreFiles = [
    'reference/specification/v2.x.md',
    'reference/specification/v3.0.0-explorer.md',
    'reference/specification/v3.0.0.md'
  ];

  const testPaths = [
    {
      filePath: 'docs/tutorials/getting-started.md',
      urlPath: 'docs/tutorials/getting-started',
      editLink: 'https://github.com/org/repo/edit/main/getting-started.md'
    },
    {
      filePath: 'docs/reference/api/v2.0.0.md', // Changed from v2.x.md to avoid ignoreFiles
      urlPath: 'docs/reference/api/v2.0.0',
      editLink: 'https://github.com/org/repo/edit/main/api/v2.0.0.md'
    },
    {
      filePath: 'docs/concepts/asyncapi.md',
      urlPath: 'docs/concepts/asyncapi',
      editLink: 'https://github.com/org/repo/edit/main/asyncapi.md'
    },
    {
      filePath: 'docs/tools/generator.md',
      urlPath: 'docs/tools/generator',
      editLink: 'https://github.com/org/repo/edit/main/generator.md'
    },
    {
      filePath: 'docs/migration/1.0-2.0.md',
      urlPath: 'docs/migration/1.0-2.0',
      editLink: 'https://github.com/org/repo/edit/main/migration/1.0-2.0.md'
    }
  ];

  // Verify no test paths are in the ignoreFiles list
  const noIgnoredFiles = testPaths.every(path => !ignoreFiles.some(ignorePath => path.filePath.endsWith(ignorePath)));

  const testBatch = [testPaths[0], testPaths[1]];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Ensure all timers are cleared
    jest.clearAllTimers();
    // Restore all mocks
    jest.restoreAllMocks();
    // Reset fetch mock implementation
    fetch.mockReset();
  });

  it('should have no test paths in the ignoreFiles list', () => {
    expect(noIgnoredFiles).toBe(true);
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
      // Mock AbortController
      const mockAbort = jest.fn();
      const mockAbortController = {
        signal: 'mock-signal',
        abort: mockAbort
      };
      
      global.AbortController = jest.fn(() => mockAbortController);
      
      // Mock fetch to reject with an AbortError when using the abort signal
      fetch.mockImplementation(() => {
        const error = new Error('The operation was aborted');
        error.name = 'AbortError';
        return Promise.reject(error);
      });
      
      // Use fake timers to control setTimeout
      jest.useFakeTimers();
      
      // Start the process but don't await it yet
      const processBatchPromise = processBatch(testBatch);
      
      // Trigger all timers to fire immediately
      jest.runAllTimers();
      
      // Restore real timers before assertions
      jest.useRealTimers();
      
      // Now the test should expect a rejection
      await expect(processBatchPromise).rejects.toThrow('The operation was aborted');
    });
  });

  describe('checkUrls', () => {
    it('should process all URLs in batches', async () => {
      // Make sure all test paths have editLinks
      const allPathsHaveEditLinks = testPaths.every(path => path.editLink);
      expect(allPathsHaveEditLinks).toBe(true);
      
      // Verify that none of the test paths are in the ignoreFiles list
      expect(noIgnoredFiles).toBe(true);
      
      fetch.mockImplementation(() => Promise.resolve({ status: 200 }));
      const results = await checkUrls(testPaths);
      expect(results.length).toBe(0);
      
      // With our test setup, fetch should be called for each test path
      // since all have editLinks and none are in the ignoreFiles list
      expect(fetch).toHaveBeenCalledTimes(testPaths.length);
    });

    it('should handle mixed responses correctly', async () => {
      fetch.mockImplementation((url) => {
        return Promise.resolve({
          status: url.includes('migration') ? 404 : 200
        });
      });
      const results = await checkUrls(testPaths);
      expect(results.length).toBe(1);
      expect(results[0].urlPath).toContain('migration');
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
