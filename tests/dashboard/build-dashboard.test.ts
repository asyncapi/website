import { graphql } from '@octokit/graphql';
import { mkdirSync, promises as fs, rmSync } from 'fs-extra';
import os from 'os';
import { resolve } from 'path';

import type { GoodFirstIssues, HotDiscussionsIssuesNode } from '@/types/scripts/dashboard';

import {
  getDiscussionByID,
  getDiscussions,
  getHotDiscussions,
  getLabel,
  mapGoodFirstIssues,
  start,
  writeToFile
} from '../../scripts/dashboard/build-dashboard';
import { logger } from '../../scripts/helpers/logger';
import {
  discussionWithMoreComments,
  fullDiscussionDetails,
  issues,
  mockDiscussion,
  mockRateLimitResponse
} from '../fixtures/dashboardData';

jest.mock('../../scripts/helpers/logger', () => ({
  logger: { error: jest.fn(), warn: jest.fn() }
}));

jest.mock('@octokit/graphql');
const mockedGraphql = graphql as unknown as jest.Mock; // Declare graphql as a mock type

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

  it('should handle rate limit warnings', async () => {
    mockedGraphql.mockResolvedValueOnce(mockRateLimitResponse);

    await getDiscussions('test-query', 10);

    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('GitHub GraphQL rateLimit \ncost = 1\nlimit = 5000\nremaining = 50')
    );
  });

  it('should handle pagination', async () => {
    const mockFirstResponse = {
      search: {
        nodes: [mockDiscussion],
        pageInfo: { hasNextPage: true, endCursor: 'cursor1' }
      },
      rateLimit: { remaining: 1000 }
    };

    const mockSecondResponse = {
      search: {
        nodes: [{ ...mockDiscussion, id: 'test-id-2' }],
        pageInfo: { hasNextPage: false }
      },
      rateLimit: { remaining: 1000 }
    };

    mockedGraphql.mockResolvedValueOnce(mockFirstResponse).mockResolvedValueOnce(mockSecondResponse);

    const result = await getDiscussions('test-query', 10);

    expect(result).toHaveLength(2);
  });

  it('should handle complete failure', async () => {
    mockedGraphql.mockRejectedValue(new Error('Complete API failure'));

    const filePath = resolve(tempDir, 'error-output.json');

    await start(filePath);
    expect(logger.error).toHaveBeenCalledWith('There were some issues parsing data from github.');
  });

  it('should successfully process and write data', async () => {
    mockedGraphql.mockResolvedValue(mockRateLimitResponse);

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
        nodes: undefined // This will trigger the ?? 0 part
      }
    };

    const result = await getHotDiscussions([prDiscussion]);

    expect(result[0].score).toBeGreaterThan(0);
  });

  it('should handle undefined labels gracefully', async () => {
    const prDiscussion = {
      ...mockDiscussion,
      __typename: 'PullRequest',
      labels: null // This will trigger the ?? [] part
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
    // @ts-ignore, ignore the type error for this test
    await expect(writeToFile()).rejects.toThrow();
  });

  it('should throw error when GITHUB_TOKEN is not set', async () => {
    delete process.env.GITHUB_TOKEN;

    // getDiscussionsById and getDiscussions
    // @ts-ignore, ignore the typescript error for this test
    await expect(getDiscussionByID()).rejects.toThrow('GitHub token is not set in environment variables');
    // @ts-ignore, ignore the typescript error for this test
    await expect(getDiscussions()).rejects.toThrow('GitHub token is not set in environment variables');

    process.env.GITHUB_TOKEN = 'test-token';
  });

  it('should correctly calculate score based on months since update', async () => {
    // Create two identical discussions but with different update timestamps
    const recentDiscussion = {
      ...mockDiscussion,
      timelineItems: { updatedAt: new Date().toISOString() }
    };

    const olderDiscussion = {
      ...mockDiscussion,
      id: 'older-discussion',
      timelineItems: { updatedAt: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString() } // 6 months ago
    };

    const result = await getHotDiscussions([recentDiscussion, olderDiscussion]);

    // The recent discussion should have a higher score than the older one
    const recentScore = result.find((d) => d.id === mockDiscussion.id)!.score;
    const olderScore = result.find((d) => d.id === 'older-discussion')!.score;

    expect(recentScore).toBeGreaterThan(olderScore);
  });
});
