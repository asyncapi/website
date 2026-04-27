import { graphql } from '@octokit/graphql';
import { mkdirSync, promises as fs, rmSync } from 'fs-extra';
import os from 'os';
import { resolve } from 'path';

import type { GoodFirstIssues, HotDiscussionsIssuesNode } from '@/types/scripts/dashboard';

import {
  adaptiveDelay,
  getDiscussionByID,
  getDiscussions,
  getHotDiscussions,
  getHotDiscussionsCutoffDate,
  getLabel,
  isRetryableError,
  mapGoodFirstIssues,
  retryWithBackoff,
  start,
  writeToFile
} from '../../scripts/dashboard/build-dashboard';
import { logger } from '../../scripts/helpers/logger';
import {
  discussionWithMoreComments,
  fullDiscussionDetails,
  issues,
  mockDiscussion,
  mockHealthyRateLimitResponse,
  mockMediumRateLimitResponse,
  mockRateLimitResponse
} from '../fixtures/dashboardData';

jest.mock('../../scripts/helpers/logger', () => ({
  logger: { error: jest.fn(), warn: jest.fn(), info: jest.fn() }
}));

jest.mock('@octokit/graphql', () => ({
  graphql: jest.fn()
}));

jest.mock('../../scripts/helpers/utils', () => ({
  ...jest.requireActual('../../scripts/helpers/utils'),
  pause: jest.fn().mockResolvedValue(undefined)
}));

const mockedGraphql = graphql as unknown as jest.Mock;

describe('GitHub Discussions Processing', () => {
  let tempDir: string;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(() => {
    tempDir = resolve(os.tmpdir(), 'test-config');
    mkdirSync(tempDir);
    process.env.GITHUB_TOKEN = 'test-token';
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    // Re-apply pause mock after resetAllMocks
    const { pause } = require('../../scripts/helpers/utils');

    (pause as jest.Mock).mockResolvedValue(undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('should fetch additional discussion details when comments have next page', async () => {
    mockedGraphql.mockResolvedValueOnce(fullDiscussionDetails);

    const result = await getHotDiscussions([discussionWithMoreComments]);

    expect(mockedGraphql).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        id: 'paginated-discussion',
        headers: expect.any(Object)
      })
    );

    expect(result[0]).toMatchObject({
      id: 'paginated-discussion',
      isPR: false,
      title: 'Test with Pagination'
    });

    const firstResult = result[0];

    expect(firstResult.score).toBeGreaterThan(0);
  });

  it('should apply adaptive delay based on rate limit remaining', async () => {
    const { pause } = require('../../scripts/helpers/utils');

    await adaptiveDelay({ limit: 5000, cost: 1, remaining: 50, resetAt: new Date().toISOString() });
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Rate limit critically low'));
    expect(pause).toHaveBeenCalled();

    (pause as jest.Mock).mockClear();
    (logger.warn as jest.Mock).mockClear();

    await adaptiveDelay({ limit: 5000, cost: 1, remaining: 300, resetAt: new Date().toISOString() });
    expect(pause).toHaveBeenCalledWith(5000);

    (pause as jest.Mock).mockClear();

    await adaptiveDelay({ limit: 5000, cost: 1, remaining: 4000, resetAt: new Date().toISOString() });
    expect(pause).toHaveBeenCalledWith(2000);
  });

  it('should handle pagination', async () => {
    const mockFirstResponse = {
      search: {
        nodes: [mockDiscussion],
        pageInfo: { hasNextPage: true, endCursor: 'cursor1' }
      },
      rateLimit: { remaining: 1000, limit: 5000, cost: 1, resetAt: new Date().toISOString() }
    };

    const mockSecondResponse = {
      search: {
        nodes: [{ ...mockDiscussion, id: 'test-id-2' }],
        pageInfo: { hasNextPage: false }
      },
      rateLimit: { remaining: 999, limit: 5000, cost: 1, resetAt: new Date().toISOString() }
    };

    mockedGraphql.mockResolvedValueOnce(mockFirstResponse).mockResolvedValueOnce(mockSecondResponse);

    const result = await getDiscussions('test-query', 10);

    expect(result).toHaveLength(2);
  });

  it('should respect maxPages parameter', async () => {
    const makePageResponse = (page: number, hasNext: boolean) => ({
      search: {
        nodes: [{ ...mockDiscussion, id: `test-id-${page}` }],
        pageInfo: { hasNextPage: hasNext, endCursor: `cursor${page}` }
      },
      rateLimit: { remaining: 1000, limit: 5000, cost: 1, resetAt: new Date().toISOString() }
    });

    mockedGraphql
      .mockResolvedValueOnce(makePageResponse(1, true))
      .mockResolvedValueOnce(makePageResponse(2, true))
      .mockResolvedValueOnce(makePageResponse(3, true));

    const result = await getDiscussions('test-query', 10, null, 2);

    expect(result).toHaveLength(2);
    expect(mockedGraphql).toHaveBeenCalledTimes(2);
  });

  it('should not limit pages when maxPages is 0', async () => {
    const makePageResponse = (page: number, hasNext: boolean) => ({
      search: {
        nodes: [{ ...mockDiscussion, id: `test-id-${page}` }],
        pageInfo: { hasNextPage: hasNext, endCursor: `cursor${page}` }
      },
      rateLimit: { remaining: 1000, limit: 5000, cost: 1, resetAt: new Date().toISOString() }
    });

    mockedGraphql
      .mockResolvedValueOnce(makePageResponse(1, true))
      .mockResolvedValueOnce(makePageResponse(2, true))
      .mockResolvedValueOnce(makePageResponse(3, false));

    const result = await getDiscussions('test-query', 10, null, 0);

    expect(result).toHaveLength(3);
    expect(mockedGraphql).toHaveBeenCalledTimes(3);
  });

  it('should throw when both hot discussions and good first issues fail', async () => {
    mockedGraphql.mockRejectedValue(new Error('Complete API failure'));

    const filePath = resolve(tempDir, 'error-output.json');

    await expect(start(filePath)).rejects.toThrow('Dashboard generation failed');
    expect(logger.error).toHaveBeenCalledWith('Failed to fetch hot discussions:');
    expect(logger.error).toHaveBeenCalledWith('Failed to fetch good first issues:');
  });

  it('should write partial data when only hot discussions fail', async () => {
    let callCount = 0;

    mockedGraphql.mockImplementation(() => {
      callCount++;

      // First call is hot discussions issues — fail it (PRs fetch is never reached
      // because issues + PRs are in the same try/catch)
      if (callCount === 1) {
        return Promise.reject(new Error('Hot discussions API failure'));
      }

      // Second call is good first issues — succeed
      return Promise.resolve(mockHealthyRateLimitResponse);
    });

    const filePath = resolve(tempDir, 'partial-good-first.json');

    await start(filePath);

    const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    expect(content.hotDiscussions).toEqual([]);
    expect(content.goodFirstIssues).toHaveLength(1);
    expect(logger.warn).toHaveBeenCalledWith('Dashboard generated with partial data due to errors above.');
  });

  it('should write partial data when only good first issues fail', async () => {
    let callCount = 0;

    mockedGraphql.mockImplementation(() => {
      callCount++;

      // First two calls succeed (hot discussions issues + PRs)
      if (callCount <= 2) {
        return Promise.resolve(mockHealthyRateLimitResponse);
      }

      // Third call for good first issues — fail
      return Promise.reject(new Error('Good first issues API failure'));
    });

    const filePath = resolve(tempDir, 'partial-hot.json');

    await start(filePath);

    const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    expect(content.hotDiscussions).toBeDefined();
    expect(content.goodFirstIssues).toEqual([]);
    expect(logger.warn).toHaveBeenCalledWith('Dashboard generated with partial data due to errors above.');
  });

  it('should successfully process and write data', async () => {
    mockedGraphql.mockResolvedValue(mockHealthyRateLimitResponse);

    const filePath = resolve(tempDir, 'success-output.json');

    await start(filePath);

    const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    expect(content).toHaveProperty('hotDiscussions');
    expect(content).toHaveProperty('goodFirstIssues');
  });

  it('should get labels correctly', () => {
    const issue = {
      labels: { nodes: [{ name: 'area/bug' }, { name: 'good first issue' }] }
    } as GoodFirstIssues;

    expect(getLabel(issue, 'area/')).toBe('bug');
    expect(getLabel(issue, 'nonexistent/')).toBeUndefined();
  });

  it('should map good first issues', async () => {
    const result = await mapGoodFirstIssues(issues);

    expect(result[0]).toMatchObject({
      id: '1',
      area: 'docs'
    });
  });

  it('should map good first issues with complete data validation', async () => {
    const mockIssue = {
      __typename: 'Issue',
      id: 'test-123',
      title: 'Test Issue',
      assignees: { totalCount: 2 },
      resourcePath: '/asyncapi/test-repo/issues/123',
      repository: { name: 'test-repo' },
      author: { login: 'testuser' },
      labels: {
        nodes: [
          { name: 'area/documentation', color: '#0366d6' },
          { name: 'good first issue', color: '#7057ff' },
          { name: 'bug', color: '#d73a4a' }
        ]
      }
    };

    const result = await mapGoodFirstIssues([mockIssue]);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 'test-123',
      title: 'Test Issue',
      isAssigned: true,
      resourcePath: '/asyncapi/test-repo/issues/123',
      repo: 'asyncapi/test-repo',
      author: 'testuser',
      area: 'documentation',
      labels: [{ name: 'bug', color: '#d73a4a' }]
    });
  });

  it('should handle discussion retrieval', async () => {
    mockedGraphql.mockResolvedValueOnce({ node: mockDiscussion });
    const result = await getDiscussionByID(false, 'test-id');

    expect(result.node).toBeDefined();

    mockedGraphql.mockRejectedValueOnce(new Error('API error'));
    await expect(getDiscussionByID(true, 'test-id')).rejects.toThrow();
  });

  it('should process hot discussions', async () => {
    const prDiscussion = {
      ...mockDiscussion,
      __typename: 'PullRequest',
      reviews: {
        totalCount: 1,
        nodes: [{ lastEditedAt: new Date().toISOString(), comments: { totalCount: 1 } }]
      }
    } as HotDiscussionsIssuesNode;

    const result = await getHotDiscussions([mockDiscussion, prDiscussion]);

    expect(result.length).toBeLessThanOrEqual(12);
  });

  it('should handle undefined reviews.nodes gracefully', async () => {
    const prDiscussion = {
      ...mockDiscussion,
      __typename: 'PullRequest',
      reviews: {
        totalCount: 1,
        nodes: undefined
      }
    };

    const result = await getHotDiscussions([prDiscussion]);

    expect(result[0].score).toBeGreaterThan(0);
  });

  it('should handle undefined labels gracefully', async () => {
    const prDiscussion = {
      ...mockDiscussion,
      __typename: 'PullRequest',
      labels: null
    };

    const result = await getHotDiscussions([prDiscussion]);

    expect(result[0].score).toBeGreaterThan(0);
  });

  it('should write to file', async () => {
    const filePath = resolve(tempDir, 'test.json');

    await writeToFile({ test: true } as any, filePath);
    const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    expect(content).toEqual({ test: true });
  });

  it('should handle parsing errors in processHotDiscussions', async () => {
    const localConsoleErrorSpy = jest.spyOn(console, 'error');

    await expect(getHotDiscussions([undefined] as any)).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith('there were some issues while parsing this item: undefined');

    localConsoleErrorSpy.mockRestore();
  });

  it('should handle write failures gracefully', async () => {
    // @ts-expect-error - Intentionally calling without arguments to test error handling
    await expect(writeToFile()).rejects.toThrow();
  });

  it('should throw error when GITHUB_TOKEN is not set', async () => {
    delete process.env.GITHUB_TOKEN;

    // @ts-expect-error - Intentionally calling without arguments to test missing token error
    await expect(getDiscussionByID()).rejects.toThrow('GitHub token is not set in environment variables');
    // @ts-expect-error - Intentionally calling without arguments to test missing token error
    await expect(getDiscussions()).rejects.toThrow('GitHub token is not set in environment variables');

    process.env.GITHUB_TOKEN = 'test-token';
  });

  it('should correctly calculate score based on months since update', async () => {
    const recentDiscussion = {
      ...mockDiscussion,
      timelineItems: { updatedAt: new Date().toISOString() }
    };

    const olderDiscussion = {
      ...mockDiscussion,
      id: 'older-discussion',
      timelineItems: { updatedAt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString() }
    };

    const result = await getHotDiscussions([recentDiscussion, olderDiscussion]);

    const recentScore = result.find((d) => d.id === mockDiscussion.id)!.score;
    const olderScore = result.find((d) => d.id === 'older-discussion')!.score;

    expect(recentScore).toBeGreaterThan(olderScore);
  });
});

describe('isRetryableError', () => {
  it('should detect secondary rate limit errors', () => {
    expect(isRetryableError(new Error('You have exceeded a secondary rate limit.'))).toBe(true);
    expect(isRetryableError(new Error('SECONDARY RATE LIMIT exceeded'))).toBe(true);
  });

  it('should detect server errors (502, Unicorn)', () => {
    expect(isRetryableError(new Error('502 Bad Gateway'))).toBe(true);
    expect(isRetryableError(new Error('Unicorn! Something went wrong'))).toBe(true);
  });

  it('should detect network errors', () => {
    expect(isRetryableError(new Error('ECONNRESET'))).toBe(true);
    expect(isRetryableError(new Error('ETIMEDOUT'))).toBe(true);
  });

  it('should not retry non-retryable errors', () => {
    expect(isRetryableError(new Error('Some other error'))).toBe(false);
    expect(isRetryableError(null)).toBe(false);
  });
});

describe('getHotDiscussionsCutoffDate', () => {
  it('should return a date string in YYYY-MM-DD format', () => {
    const cutoff = getHotDiscussionsCutoffDate();

    expect(cutoff).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should return a date in the past', () => {
    const cutoff = getHotDiscussionsCutoffDate();
    const cutoffDate = new Date(cutoff);

    expect(cutoffDate.getTime()).toBeLessThan(Date.now());
  });
});

describe('retryWithBackoff', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const { pause } = require('../../scripts/helpers/utils');

    (pause as jest.Mock).mockResolvedValue(undefined);
  });

  it('should return result on first successful attempt', async () => {
    const fn = jest.fn().mockResolvedValue('success');

    const result = await retryWithBackoff(fn, 'test');

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on secondary rate limit error and succeed', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('You have exceeded a secondary rate limit.'))
      .mockResolvedValueOnce('success');

    const result = await retryWithBackoff(fn, 'test');

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Retryable error during test'));
  });

  it('should throw after exhausting retries', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('You have exceeded a secondary rate limit.'));

    await expect(retryWithBackoff(fn, 'test')).rejects.toThrow('secondary rate limit');
    expect(fn).toHaveBeenCalledTimes(4); // 1 initial + 3 retries
  });

  it('should not retry non-rate-limit errors', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('Network timeout'));

    await expect(retryWithBackoff(fn, 'test')).rejects.toThrow('Network timeout');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
