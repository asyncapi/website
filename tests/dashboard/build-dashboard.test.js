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

  beforeAll(() => {
    tempDir = resolve(os.tmpdir(), 'test-config');
    mkdirSync(tempDir);
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    jest.clearAllMocks();
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

  it('should process and write hot discussions and good first issues to a file', async () => {
    const mockIssue = {
      id: 'issue1',
      __typename: 'Issue',
      title: 'Test Issue',
      author: { login: 'author1' },
      resourcePath: '/path/to/issue',
      repository: { name: 'repo' },
      assignees: { totalCount: 1 },
      reactions: { totalCount: 5 },
      comments: {
        totalCount: 2,
        nodes: [{ reactions: { totalCount: 1 } }],
        pageInfo: { hasNextPage: false }
      },
      labels: { nodes: [{ name: 'area/docs' }] },
      timelineItems: { updatedAt: new Date().toISOString() }
    };

    const mockPR = {
      id: 'pr1',
      __typename: 'PullRequest',
      title: 'Test PR',
      author: { login: 'author2' },
      resourcePath: '/path/to/pr',
      repository: { name: 'repo' },
      assignees: { totalCount: 0 },
      reactions: { totalCount: 3 },
      comments: {
        totalCount: 1,
        nodes: [{ reactions: { totalCount: 1 } }],
        pageInfo: { hasNextPage: false }
      },
      reviews: {
        totalCount: 1,
        nodes: [{ comments: { totalCount: 1 } }]
      },
      labels: { nodes: [{ name: 'good first issue' }] },
      timelineItems: { updatedAt: new Date().toISOString() }
    };

    const tempFilePath = resolve(tempDir, 'dashboard.json');

    graphql.mockResolvedValueOnce({ search: { nodes: [mockIssue], pageInfo: { hasNextPage: false } } });
    graphql.mockResolvedValueOnce({ search: { nodes: [mockPR], pageInfo: { hasNextPage: false } } });
    graphql.mockResolvedValueOnce({ search: { nodes: [mockIssue], pageInfo: { hasNextPage: false } } });

    await start(tempFilePath);

    const content = JSON.parse(await fs.readFile(tempFilePath, 'utf-8'));
    expect(content.hotDiscussions).toBeDefined();
    expect(content.goodFirstIssues).toBeDefined();
    expect(content.hotDiscussions).toHaveLength(1);
    expect(content.goodFirstIssues).toHaveLength(1);
    expect(content.hotDiscussions[0]).toMatchObject({
      id: 'issue1',
      title: 'Test Issue',
      author: 'author1',
      repo: 'asyncapi/repo'
    });
    expect(content.goodFirstIssues[0]).toMatchObject({
      id: 'issue1',
      title: 'Test Issue',
      area: 'docs',
      author: 'author1'
    });
  });
});
