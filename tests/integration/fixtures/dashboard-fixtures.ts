export const mockDashboardData = {
  hotDiscussionsIssues: {
    search: {
      nodes: [
        {
          __typename: 'Issue',
          id: 'test-issue-1',
          title: 'Test Issue 1',
          assignees: { totalCount: 0 },
          resourcePath: '/asyncapi/test-repo/issues/1',
          repository: { name: 'test-repo' },
          author: { login: 'testuser1' },
          labels: {
            nodes: [
              { name: 'area/documentation', color: '#0366d6' },
              { name: 'bug', color: '#d73a4a' }
            ]
          },
          reactions: { totalCount: 5 },
          comments: {
            totalCount: 3,
            pageInfo: { hasNextPage: false },
            nodes: [
              {
                reactions: { totalCount: 1 }
              },
              {
                reactions: { totalCount: 2 }
              }
            ]
          },
          timelineItems: { updatedAt: new Date().toISOString() }
        },
        {
          __typename: 'Issue',
          id: 'test-issue-2',
          title: 'Test Issue 2',
          assignees: { totalCount: 1 },
          resourcePath: '/asyncapi/test-repo/issues/2',
          repository: { name: 'test-repo' },
          author: { login: 'testuser2' },
          labels: {
            nodes: [
              { name: 'area/website', color: '#0366d6' },
              { name: 'enhancement', color: '#a2eeef' }
            ]
          },
          reactions: { totalCount: 8 },
          comments: {
            totalCount: 5,
            pageInfo: { hasNextPage: false },
            nodes: [
              {
                reactions: { totalCount: 0 }
              }
            ]
          },
          timelineItems: {
            updatedAt: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      ],
      pageInfo: { hasNextPage: false }
    },
    rateLimit: {
      remaining: 5000,
      cost: 1,
      limit: 5000,
      resetAt: new Date(Date.now() + 3600000).toISOString()
    }
  },

  hotDiscussionsPRs: {
    search: {
      nodes: [
        {
          __typename: 'PullRequest',
          id: 'test-pr-1',
          title: 'Test PR 1',
          assignees: { totalCount: 0 },
          resourcePath: '/asyncapi/test-repo/pull/1',
          repository: { name: 'test-repo' },
          author: { login: 'testuser3' },
          labels: {
            nodes: [
              { name: 'area/core', color: '#0366d6' },
              { name: 'feature', color: '#a2eeef' }
            ]
          },
          reactions: { totalCount: 12 },
          comments: {
            totalCount: 7,
            pageInfo: { hasNextPage: false },
            nodes: [
              {
                reactions: { totalCount: 3 }
              }
            ]
          },
          reviews: {
            totalCount: 2,
            nodes: [
              {
                comments: { totalCount: 1 }
              },
              {
                comments: { totalCount: 2 }
              }
            ]
          },
          timelineItems: {
            updatedAt: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      ],
      pageInfo: { hasNextPage: false }
    },
    rateLimit: {
      remaining: 4999,
      cost: 1,
      limit: 5000,
      resetAt: new Date(Date.now() + 3600000).toISOString()
    }
  },

  goodFirstIssues: {
    search: {
      nodes: [
        {
          __typename: 'Issue',
          id: 'good-first-1',
          title: 'Good First Issue 1',
          assignees: { totalCount: 0 },
          resourcePath: '/asyncapi/test-repo/issues/10',
          repository: { name: 'test-repo' },
          author: { login: 'maintainer' },
          labels: {
            nodes: [
              { name: 'area/documentation', color: '#0366d6' },
              { name: 'good first issue', color: '#7057ff' },
              { name: 'help wanted', color: '#008672' }
            ]
          },
          reactions: { totalCount: 2 },
          comments: {
            totalCount: 1,
            pageInfo: { hasNextPage: false },
            nodes: [
              {
                reactions: { totalCount: 0 }
              }
            ]
          },
          timelineItems: { updatedAt: new Date().toISOString() }
        },
        {
          __typename: 'Issue',
          id: 'good-first-2',
          title: 'Good First Issue 2',
          assignees: { totalCount: 1 },
          resourcePath: '/asyncapi/test-repo/issues/11',
          repository: { name: 'test-repo' },
          author: { login: 'maintainer' },
          labels: {
            nodes: [
              { name: 'area/website', color: '#0366d6' },
              { name: 'good first issue', color: '#7057ff' },
              { name: 'bug', color: '#d73a4a' }
            ]
          },
          reactions: { totalCount: 4 },
          comments: {
            totalCount: 2,
            pageInfo: { hasNextPage: false },
            nodes: [
              {
                reactions: { totalCount: 1 }
              }
            ]
          },
          timelineItems: {
            updatedAt: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      ],
      pageInfo: { hasNextPage: false }
    },
    rateLimit: {
      remaining: 4998,
      cost: 1,
      limit: 5000,
      resetAt: new Date(Date.now() + 3600000).toISOString()
    }
  },

  // Mock data for individual discussion by ID (when pagination is needed)
  discussionById: {
    node: {
      __typename: 'Issue',
      id: 'paginated-discussion',
      title: 'Test with Pagination',
      assignees: { totalCount: 0 },
      resourcePath: '/asyncapi/test-repo/issues/20',
      repository: { name: 'test-repo' },
      author: { login: 'testuser4' },
      labels: {
        nodes: [
          { name: 'area/core', color: '#0366d6' },
          { name: 'bug', color: '#d73a4a' }
        ]
      },
      reactions: { totalCount: 15 },
      comments: {
        totalCount: 10,
        pageInfo: { hasNextPage: false },
        nodes: [
          {
            reactions: { totalCount: 2 }
          },
          {
            reactions: { totalCount: 1 }
          },
          {
            reactions: { totalCount: 3 }
          }
        ]
      },
      timelineItems: { updatedAt: new Date().toISOString() }
    }
  },

  // Error responses
  errorResponse: {
    errors: [
      {
        message: 'API rate limit exceeded',
        type: 'RATE_LIMITED'
      }
    ]
  },

  // Rate limit warning response
  rateLimitWarning: {
    search: {
      nodes: [],
      pageInfo: { hasNextPage: false }
    },
    rateLimit: {
      remaining: 50,
      cost: 1,
      limit: 5000,
      resetAt: new Date(Date.now() + 3600000).toISOString()
    }
  }
};

// Mock data for pagination tests
export const paginationMocks = {
  // First page with hasNextPage = true
  firstPage: {
    search: {
      nodes: [
        {
          id: 'test-node-1',
          __typename: 'Issue',
          title: 'Test Issue',
          assignees: { totalCount: 0 },
          author: { login: 'testuser' },
          resourcePath: '/asyncapi/test-repo/issues/1',
          repository: { name: 'test-repo' },
          labels: {
            nodes: [{ name: 'test', color: '000000' }]
          },
          reactions: { totalCount: 2 },
          comments: {
            totalCount: 5,
            pageInfo: { hasNextPage: true, endCursor: 'cursor1' },
            nodes: [{ reactions: { totalCount: 1 } }]
          },
          timelineItems: {
            updatedAt: new Date().toISOString()
          }
        }
      ],
      pageInfo: {
        hasNextPage: true,
        endCursor: 'cursor1'
      }
    },
    rateLimit: {
      limit: 5000,
      remaining: 4999,
      resetAt: '2024-01-01T00:00:00Z',
      cost: 1
    }
  },

  // Second page with hasNextPage = false
  secondPage: {
    search: {
      nodes: [
        {
          id: 'test-node-2',
          __typename: 'Issue',
          title: 'Test Issue 2',
          assignees: { totalCount: 0 },
          author: { login: 'testuser2' },
          resourcePath: '/asyncapi/test-repo/issues/2',
          repository: { name: 'test-repo' },
          labels: {
            nodes: [{ name: 'test', color: '000000' }]
          },
          reactions: { totalCount: 1 },
          comments: {
            totalCount: 3,
            pageInfo: { hasNextPage: false, endCursor: null },
            nodes: [{ reactions: { totalCount: 0 } }]
          },
          timelineItems: {
            updatedAt: new Date().toISOString()
          }
        }
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: null
      }
    },
    rateLimit: {
      limit: 5000,
      remaining: 4998,
      resetAt: '2024-01-01T00:00:00Z',
      cost: 1
    }
  },

  // Issue by ID response (for getDiscussionByID)
  issueById: {
    node: {
      id: 'test-node-1',
      __typename: 'Issue',
      title: 'Test Issue',
      assignees: { totalCount: 0 },
      author: { login: 'testuser' },
      resourcePath: '/asyncapi/test-repo/issues/1',
      repository: { name: 'test-repo' },
      labels: {
        nodes: [{ name: 'test', color: '000000' }]
      },
      reactions: { totalCount: 2 },
      comments: {
        totalCount: 10,
        pageInfo: { hasNextPage: false },
        nodes: [{ reactions: { totalCount: 1 } }]
      },
      timelineItems: {
        updatedAt: new Date().toISOString()
      }
    },
    rateLimit: {
      limit: 5000,
      remaining: 4997,
      resetAt: '2024-01-01T00:00:00Z',
      cost: 1
    }
  }
};

// Mock data for pull request tests
export const pullRequestMocks = {
  // PR search response
  prSearch: {
    search: {
      nodes: [
        {
          id: 'PR_test',
          __typename: 'PullRequest',
          title: 'Test PR',
          assignees: { totalCount: 0 },
          author: { login: 'testuser' },
          resourcePath: '/asyncapi/test-repo/pull/1',
          repository: { name: 'test-repo' },
          labels: {
            nodes: [{ name: 'test', color: '000000' }]
          },
          reactions: { totalCount: 3 },
          comments: {
            totalCount: 5,
            pageInfo: { hasNextPage: true, endCursor: 'cursor1' },
            nodes: [{ reactions: { totalCount: 1 } }]
          },
          reviews: { totalCount: 2 },
          timelineItems: {
            updatedAt: new Date().toISOString()
          }
        }
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: null
      }
    },
    rateLimit: {
      limit: 5000,
      remaining: 4999,
      resetAt: '2024-01-01T00:00:00Z',
      cost: 1
    }
  },

  // PR by ID response (for getDiscussionByID)
  prById: {
    node: {
      id: 'PR_test',
      __typename: 'PullRequest',
      title: 'Test PR',
      assignees: { totalCount: 0 },
      author: { login: 'testuser' },
      resourcePath: '/asyncapi/test-repo/pull/1',
      repository: { name: 'test-repo' },
      labels: {
        nodes: [{ name: 'test', color: '000000' }]
      },
      reactions: { totalCount: 3 },
      comments: {
        totalCount: 10,
        pageInfo: { hasNextPage: false },
        nodes: [{ reactions: { totalCount: 1 } }]
      },
      reviews: {
        totalCount: 3,
        nodes: [{ comments: { totalCount: 1 } }]
      },
      timelineItems: {
        updatedAt: new Date().toISOString()
      }
    },
    rateLimit: {
      limit: 5000,
      remaining: 4998,
      resetAt: '2024-01-01T00:00:00Z',
      cost: 1
    }
  }
};

// Empty response for tests
export const emptyResponse = {
  search: {
    nodes: [],
    pageInfo: { hasNextPage: false, endCursor: null }
  },
  rateLimit: {
    limit: 5000,
    remaining: 4999,
    resetAt: '2024-01-01T00:00:00Z',
    cost: 1
  }
};

// Mock data for error handling tests
export const errorMocks = {
  issueWithPagination: {
    search: {
      nodes: [
        {
          id: 'test-node',
          __typename: 'Issue',
          assignees: { totalCount: 0 },
          title: 'Test Issue',
          author: { login: 'testuser' },
          resourcePath: '/asyncapi/test-repo/issues/1',
          repository: { name: 'test-repo' },
          labels: {
            nodes: [{ name: 'test', color: '000000' }]
          },
          reactions: { totalCount: 2 },
          comments: {
            totalCount: 5,
            pageInfo: { hasNextPage: true, endCursor: 'cursor1' },
            nodes: [{ reactions: { totalCount: 1 } }]
          },
          timelineItems: {
            updatedAt: new Date().toISOString()
          }
        }
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: null
      }
    },
    rateLimit: {
      limit: 5000,
      remaining: 4999,
      resetAt: '2024-01-01T00:00:00Z',
      cost: 1
    }
  }
};
