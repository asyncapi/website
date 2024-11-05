const { graphql } = require('@octokit/graphql');
const { promises: fs, mkdirSync, rmSync } = require('fs-extra');
const { resolve } = require('path');
const os = require('os');
const {
  getLabel,
  monthsSince,
  mapGoodFirstIssues,
  getHotDiscussions,
  getDiscussionByID,
  writeToFile,
  start
} = require('../../scripts/dashboard/build-dashboard');

jest.mock('@octokit/graphql');

const mockDiscussion = {
  id: 'test-id',
  __typename: 'Issue',
  title: 'Test',
  author: { login: 'author' },
  resourcePath: '/path',
  repository: { name: 'repo' },
  assignees: { totalCount: 0 },
  reactions: { totalCount: 5 },
  comments: {
    totalCount: 2,
    nodes: [{ reactions: { totalCount: 1 } }],
    pageInfo: { hasNextPage: false }
  },
  labels: { nodes: [] },
  timelineItems: { updatedAt: new Date().toISOString() }
};

describe('GitHub Discussions Processing', () => {
  let tempDir;
  let consoleErrorSpy;
  let consoleLogSpy;

  beforeAll(() => {
    tempDir = resolve(os.tmpdir(), 'test-config');
    mkdirSync(tempDir);
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('should handle rate limit warnings', async () => {
    const mockResponse = {
      search: {
        nodes: [mockDiscussion],
        pageInfo: { hasNextPage: false }
      },
      rateLimit: {
        cost: 1,
        limit: 5000,
        remaining: 50,
        resetAt: new Date().toISOString()
      }
    };

    graphql.mockResolvedValueOnce(mockResponse);

    await getDiscussions('test-query', 10);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      '[WARNING] GitHub GraphQL rateLimit',
      'cost = 1',
      'limit = 5000',
      'remaining = 50',
      expect.any(String)
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

    graphql
      .mockResolvedValueOnce(mockFirstResponse)
      .mockResolvedValueOnce(mockSecondResponse);

    const result = await getDiscussions('test-query', 10);
    expect(result).toHaveLength(2);
  });

  it('should handle complete failure', async () => {
    graphql.mockRejectedValue(new Error('Complete API failure'));

    const filePath = resolve(tempDir, 'error-output.json');
    await start(filePath);

    expect(consoleLogSpy).toHaveBeenCalledWith('There were some issues parsing data from github.');
  });

  it('should successfully process and write data', async () => {
    const mockResponse = {
      search: {
        nodes: [mockDiscussion],
        pageInfo: { hasNextPage: false }
      },
      rateLimit: { remaining: 1000 }
    };

    graphql.mockResolvedValue(mockResponse);

    const filePath = resolve(tempDir, 'success-output.json');
    await start(filePath);

    const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    expect(content).toHaveProperty('hotDiscussions');
    expect(content).toHaveProperty('goodFirstIssues');
  });

  it('should get labels correctly', () => {
    const issue = {
      labels: { nodes: [{ name: 'area/bug' }, { name: 'good first issue' }] }
    };
    expect(getLabel(issue, 'area/')).toBe('bug');
    expect(getLabel(issue, 'nonexistent/')).toBeUndefined();
  });

  it('should calculate months since date', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 2);
    expect(monthsSince(date)).toBe(2);
  });

  it('should map good first issues', async () => {
    const issues = [{
      id: '1',
      title: 'Test',
      assignees: { totalCount: 1 },
      resourcePath: '/path',
      repository: { name: 'repo' },
      author: { login: 'author' },
      labels: { nodes: [{ name: 'area/docs' }] }
    }];

    const result = await mapGoodFirstIssues(issues);
    expect(result[0]).toMatchObject({
      id: '1',
      area: 'docs'
    });
  });

  it('should handle discussion retrieval', async () => {
    graphql.mockResolvedValueOnce({ node: mockDiscussion });
    const result = await getDiscussionByID(false, 'test-id');
    expect(result.node).toBeDefined();

    graphql.mockRejectedValueOnce(new Error('API error'));
    await expect(getDiscussionByID(true, 'test-id')).rejects.toThrow();
  });

  it('should process hot discussions', async () => {
    const prDiscussion = {
      ...mockDiscussion,
      __typename: 'PullRequest',
      reviews: {
        totalCount: 1,
        nodes: [{ comments: { totalCount: 1 } }]
      }
    };

    const result = await getHotDiscussions([mockDiscussion, prDiscussion]);
    expect(result.length).toBeLessThanOrEqual(12);
  });

  it('should write to file', async () => {
    const filePath = resolve(tempDir, 'test.json');
    await writeToFile({ test: true }, filePath);
    const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    expect(content).toEqual({ test: true });
  });
});
