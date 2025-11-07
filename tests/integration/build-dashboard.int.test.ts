import { promises as fs } from 'fs';
import nock from 'nock';
import os from 'os';
import { resolve } from 'path';

import { runBuildDashboard } from '../../npm/runners/build-dashboard-runner';
import { CustomError } from '../../types/errors/CustomError';
import {
  setupCompleteDashboardMocks,
  setupDashboardPaginationMocks,
  setupGetDiscussionByIDErrorMocks,
  setupGraphQLErrorMock,
  setupPullRequestMocks,
  setupRateLimitWarningMocks
} from './fixtures/nock-helpers';

describe('Integration: build-dashboard Runner', () => {
  let tempDir: string;
  let outputPath: string;
  let output: any;

  beforeAll(async () => {
    // Mock the GITHUB_TOKEN environment variable
    process.env.GITHUB_TOKEN = 'test-token';
    // Create a unique temp directory for this test run
    tempDir = resolve(os.tmpdir(), `build-dashboard-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
    outputPath = resolve(tempDir, 'dashboard.json');

    // Setup nock interceptors for GitHub GraphQL API responses using helper function
    setupCompleteDashboardMocks();

    // Run the dashboard builder using the runner function directly
    await runBuildDashboard({ outputPath });

    // Read and parse the output
    const content = await fs.readFile(outputPath, 'utf-8');

    output = JSON.parse(content);
  });

  afterEach(() => {
    // Clean up nock interceptors after each test
    nock.cleanAll();
  });

  afterAll(async () => {
    // Clean up temp files and directory
    await fs.rm(tempDir, { recursive: true, force: true });
    // Clean up environment variable
    delete process.env.GITHUB_TOKEN;
    // Clean up nock interceptors
    nock.cleanAll();
  });

  it('creates the dashboard file at the specified path', async () => {
    const fileExists = await fs
      .access(outputPath)
      .then(() => true)
      .catch(() => false);

    expect(fileExists).toBe(true);
  });

  it('throws on API errors', async () => {
    const errorOutputPath = resolve(tempDir, 'error-output.json');

    // Setup nock to return an error using helper function
    setupGraphQLErrorMock('API error');

    try {
      await runBuildDashboard({ outputPath: errorOutputPath });
      throw new Error('Expected error to be thrown');
    } catch (error) {
      if (error instanceof Error && error.message === 'Expected error to be thrown') {
        throw error;
      }
      expect(error).toBeInstanceOf(CustomError);
      const customError = error as CustomError;

      expect(customError.context.category).toBe('script');
      expect(customError.context.operation).toBe('runBuildDashboard');
      expect(customError.message).toContain('API error');
      expect(customError.context.detail).toBeDefined();
      expect(customError.context.detail).toContain('output path');
    }
  });

  it('should successfully process and write data', () => {
    expect(output).toHaveProperty('hotDiscussions');
    expect(output).toHaveProperty('goodFirstIssues');
  });

  it('should handle rate limit warnings', async () => {
    const warningOutputPath = resolve(tempDir, 'warning-output.json');

    // Setup nock to return rate limit warning using helper function
    setupRateLimitWarningMocks();

    await runBuildDashboard({ outputPath: warningOutputPath });

    const fileExists = await fs
      .access(warningOutputPath)
      .then(() => true)
      .catch(() => false);

    expect(fileExists).toBe(true);
  });

  it('output JSON has hotDiscussions and goodFirstIssues arrays', () => {
    expect(output).toHaveProperty('hotDiscussions');
    expect(output).toHaveProperty('goodFirstIssues');
    expect(Array.isArray(output.hotDiscussions)).toBe(true);
    expect(Array.isArray(output.goodFirstIssues)).toBe(true);
  });

  it('each hotDiscussion has required fields and valid score', () => {
    output.hotDiscussions.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('isPR');
      expect(item).toHaveProperty('isAssigned');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('author');
      expect(item).toHaveProperty('resourcePath');
      expect(item).toHaveProperty('repo');
      expect(item).toHaveProperty('labels');
      expect(item).toHaveProperty('score');
      expect(typeof item.score).toBe('number');
      expect(item.score).toBeGreaterThanOrEqual(0);
    });
  });

  it('each goodFirstIssue has required fields', () => {
    output.goodFirstIssues.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('isAssigned');
      expect(item).toHaveProperty('resourcePath');
      expect(item).toHaveProperty('repo');
      expect(item).toHaveProperty('author');
      expect(item).toHaveProperty('area');
      expect(item).toHaveProperty('labels');
    });
  });

  it('no duplicate IDs in hotDiscussions and goodFirstIssues', () => {
    const hotIds = output.hotDiscussions.map((i: any) => i.id);
    const goodIds = output.goodFirstIssues.map((i: any) => i.id);
    const allIds = [...hotIds, ...goodIds];
    const uniqueIds = new Set(allIds);

    expect(uniqueIds.size).toBe(allIds.length);
  });

  it('labels have name and color', () => {
    const checkLabels = (items: any[]) => {
      items.forEach((item) => {
        if (Array.isArray(item.labels)) {
          item.labels.forEach((label: any) => {
            expect(label).toHaveProperty('name');
            expect(label).toHaveProperty('color');
          });
        }
      });
    };

    checkLabels(output.hotDiscussions);
    checkLabels(output.goodFirstIssues);
  });

  it('resourcePath starts with /asyncapi/', () => {
    const checkResourcePath = (items: any[]) => {
      items.forEach((item) => {
        expect(item.resourcePath.startsWith('/asyncapi/')).toBe(true);
      });
    };

    checkResourcePath(output.hotDiscussions);
    checkResourcePath(output.goodFirstIssues);
  });

  it('returns at least one hot discussion and one good first issue', () => {
    expect(output.hotDiscussions.length).toBeGreaterThan(0);
    expect(output.goodFirstIssues.length).toBeGreaterThan(0);
  });
  it('hotDiscussions and goodFirstIssues arrays do not contain null or undefined items', () => {
    output.hotDiscussions.forEach((item: any) => {
      expect(item).not.toBeNull();
      expect(item).not.toBeUndefined();
    });
    output.goodFirstIssues.forEach((item: any) => {
      expect(item).not.toBeNull();
      expect(item).not.toBeUndefined();
    });
  });

  it('all hotDiscussions have a valid score (not NaN or Infinity)', () => {
    output.hotDiscussions.forEach((item: any) => {
      expect(Number.isFinite(item.score)).toBe(true);
    });
  });

  it('all items in hotDiscussions and goodFirstIssues have a valid id (non-empty string)', () => {
    const checkId = (items: any[]) => {
      items.forEach((item) => {
        expect(typeof item.id).toBe('string');
        expect(item.id.length).toBeGreaterThan(0);
      });
    };

    checkId(output.hotDiscussions);
    checkId(output.goodFirstIssues);
  });

  it('output file is valid JSON and not empty', async () => {
    const fileContent = await fs.readFile(outputPath, 'utf-8');

    expect(() => JSON.parse(fileContent)).not.toThrow();
    expect(fileContent.length).toBeGreaterThan(2); // '{}' is 2 chars
  });

  it('hotDiscussions array is sorted in descending order by score', () => {
    const scores = output.hotDiscussions.map((item: any) => item.score);

    const isDescending = scores.every((score: number, i: number, arr: number[]) => i === 0 || arr[i - 1] >= score);

    expect(isDescending).toBe(true);
  });

  it('each item has a non-empty author string', () => {
    const checkAuthor = (items: any[]) => {
      items.forEach((item) => {
        expect(typeof item.author).toBe('string');
        expect(item.author.length).toBeGreaterThan(0);
      });
    };

    checkAuthor(output.hotDiscussions);
    checkAuthor(output.goodFirstIssues);
  });

  it('should handle missing GitHub token', async () => {
    const originalToken = process.env.GITHUB_TOKEN;

    delete process.env.GITHUB_TOKEN;

    const errorOutputPath = resolve(tempDir, 'no-token-output.json');

    await expect(runBuildDashboard({ outputPath: errorOutputPath })).rejects.toThrow('GitHub token is not set');

    // Restore token
    if (originalToken) {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });

  it('should handle pagination with hasNextPage', async () => {
    const paginationOutputPath = resolve(tempDir, 'pagination-output.json');

    setupDashboardPaginationMocks();

    await runBuildDashboard({ outputPath: paginationOutputPath });

    const fileExists = await fs
      .access(paginationOutputPath)
      .then(() => true)
      .catch(() => false);

    expect(fileExists).toBe(true);

    nock.cleanAll();
  });

  it('should handle getDiscussionByID for pull requests', async () => {
    const prOutputPath = resolve(tempDir, 'pr-output.json');

    setupPullRequestMocks();

    await runBuildDashboard({ outputPath: prOutputPath });

    const fileExists = await fs
      .access(prOutputPath)
      .then(() => true)
      .catch(() => false);

    expect(fileExists).toBe(true);

    nock.cleanAll();
  });

  it('should handle getDiscussionByID errors gracefully ', async () => {
    const errorOutputPath = resolve(tempDir, 'discussion-error-output.json');

    setupGetDiscussionByIDErrorMocks();

    await expect(runBuildDashboard({ outputPath: errorOutputPath })).rejects.toThrow();

    nock.cleanAll();
  });
});
