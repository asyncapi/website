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
  getDiscussions,
  start
} = require('../../scripts/dashboard/build-dashboard');

const {
  issues,
  mockDiscussion,
  discussionWithMoreComments,
  fullDiscussionDetails,
  mockRateLimitResponse
} = require("../fixtures/dashboardData")

jest.mock('@octokit/graphql');

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

  it('should fetch additional discussion details when comments have next page', async () => {
    graphql.mockResolvedValueOnce(fullDiscussionDetails);

    const result = await getHotDiscussions([discussionWithMoreComments]);

    expect(graphql).toHaveBeenCalledWith(
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
    graphql.mockResolvedValueOnce(mockRateLimitResponse);

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
    graphql.mockResolvedValue(mockRateLimitResponse);

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

  it('should handle parsing errors in processHotDiscussions', async () => {
    const localConsoleErrorSpy = jest.spyOn(console, 'error');

    await expect(getHotDiscussions([undefined])).rejects.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'there were some issues while parsing this item: undefined'
    );

    localConsoleErrorSpy.mockRestore();
  });

  it('should handle write failures gracefully', async () => {
    
    await expect(writeToFile()).rejects.toThrow();
  });  

});
