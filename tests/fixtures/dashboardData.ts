import type {
  Discussion,
  FullDiscussionDetails,
  MockRateLimitResponse,
  Issue
} from '../../types/tests/fixtures/dashboardDataTypes';

const mockDiscussion: Discussion = {
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

const discussionWithMoreComments: Discussion = {
  id: 'paginated-discussion',
  __typename: 'Issue',
  title: 'Test with Pagination',
  author: { login: 'author' },
  resourcePath: '/path',
  repository: { name: 'repo' },
  assignees: { totalCount: 0 },
  reactions: { totalCount: 5 },
  comments: {
    totalCount: 5,
    nodes: [{ reactions: { totalCount: 1 } }],
    pageInfo: { hasNextPage: true }
  },
  labels: { nodes: [] },
  timelineItems: { updatedAt: new Date().toISOString() }
};

const fullDiscussionDetails: FullDiscussionDetails = {
  node: {
    ...discussionWithMoreComments,
    comments: {
      totalCount: 5,
      nodes: [{ reactions: { totalCount: 1 } }, { reactions: { totalCount: 2 } }, { reactions: { totalCount: 3 } }],
      pageInfo: { hasNextPage: false }
    }
  }
};

const mockRateLimitResponse: MockRateLimitResponse = {
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

const issues: Issue[] = [
  {
    id: '1',
    title: 'Test',
    assignees: { totalCount: 1 },
    resourcePath: '/path',
    repository: { name: 'repo' },
    author: { login: 'author' },
    labels: { nodes: [{ name: 'area/docs' }] }
  }
];

export {
  issues,
  mockDiscussion,
  discussionWithMoreComments,
  fullDiscussionDetails,
  mockRateLimitResponse
};
