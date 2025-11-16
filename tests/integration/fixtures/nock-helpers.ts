import nock from 'nock';

import { emptyResponse, errorMocks, mockDashboardData, paginationMocks, pullRequestMocks } from './dashboard-fixtures';
import { mockToolsData } from './tools-fixtures';

// ============================================================================
// DASHBOARD SCRIPT - GitHub GraphQL API Nock Helpers
// ============================================================================
// Used by: scripts/dashboard/build-dashboard.ts
// Tests: tests/integration/build-dashboard.test.ts

/**
 * Sets up a nock interceptor for GitHub GraphQL API calls
 * @param data - The GraphQL response data
 * @param remaining - The remaining rate limit count
 * @returns The nock interceptor
 */
export function setupGraphQLMock(data: any, remaining: number = 4999) {
  return nock('https://api.github.com')
    .post('/graphql')
    .matchHeader('authorization', 'token test-token')
    .reply(200, {
      data: {
        ...data,
        rateLimit: {
          limit: 5000,
          remaining,
          resetAt: '2024-01-01T00:00:00Z',
          cost: 1
        }
      }
    });
}

/**
 * Sets up a nock interceptor for GitHub GraphQL API error responses
 * @param errorMessage - The error message to return
 * @returns The nock interceptor
 */
export function setupGraphQLErrorMock(errorMessage: string = 'API error') {
  return nock('https://api.github.com')
    .post('/graphql')
    .matchHeader('authorization', 'token test-token')
    .replyWithError(errorMessage);
}

/**
 * Sets up all nock interceptors for successful dashboard data fetching
 */
export function setupCompleteDashboardMocks() {
  setupGraphQLMock(mockDashboardData.hotDiscussionsIssues, 4999);
  setupGraphQLMock(mockDashboardData.hotDiscussionsPRs, 4998);
  setupGraphQLMock(mockDashboardData.goodFirstIssues, 4997);
}

/**
 * Sets up nock interceptors for rate limit warning scenarios
 */
export function setupRateLimitWarningMocks() {
  setupGraphQLMock(mockDashboardData.rateLimitWarning, 10);
  setupGraphQLMock(mockDashboardData.rateLimitWarning, 9);
  setupGraphQLMock(mockDashboardData.rateLimitWarning, 8);
}

/**
 * Sets up nock interceptors for dashboard GraphQL pagination with hasNextPage scenario
 * Uses request body matching to return appropriate responses based on query content
 */
export function setupDashboardPaginationMocks() {
  nock('https://api.github.com')
    .post('/graphql')
    .matchHeader('authorization', 'token test-token')
    .reply(200, (path: string, body: string | Buffer) => {
      // Nock callback: (path, body) where body is the request body
      let parsedBody: any;

      try {
        // Handle Buffer
        if (body instanceof Buffer) {
          parsedBody = JSON.parse(body.toString());
        }
        // Handle string - check if it's actually the path
        else if (typeof body === 'string') {
          // If body is the path, it means parameters are swapped or body is missing
          if (body === '/graphql' || body === path) {
            return { data: paginationMocks.firstPage };
          }
          parsedBody = JSON.parse(body);
        }
        // Already an object
        else {
          parsedBody = body;
        }
      } catch {
        return { data: paginationMocks.firstPage };
      }

      const query = parsedBody?.query || '';

      // getDiscussionByID uses node query
      if (query.includes('node(id:') || query.includes('IssueByID')) {
        return { data: paginationMocks.issueById };
      }
      // Second page has after cursor
      if (parsedBody?.variables?.after) {
        return { data: paginationMocks.secondPage };
      }
      // hotDiscussionsPRs
      if (query.includes('is:pull-request')) {
        return { data: emptyResponse };
      }
      // goodFirstIssues
      if (query.includes('good first issue')) {
        return { data: emptyResponse };
      }

      // First page of hotDiscussionsIssues (default)
      return { data: paginationMocks.firstPage };
    })
    .persist();
}

/**
 * Sets up nock interceptors for pull request getDiscussionByID scenario
 * Uses request body matching to return appropriate responses based on query content
 */
export function setupPullRequestMocks() {
  nock('https://api.github.com')
    .post('/graphql')
    .matchHeader('authorization', 'token test-token')
    .reply(200, (path: string, body: string | Buffer) => {
      // Nock callback: (path, body) where body is the request body
      let parsedBody: any;

      try {
        // Handle Buffer
        if (body instanceof Buffer) {
          parsedBody = JSON.parse(body.toString());
        }
        // Handle string - check if it's actually the path
        else if (typeof body === 'string') {
          // If body is the path, it means parameters are swapped or body is missing
          if (body === '/graphql' || body === path) {
            return { data: emptyResponse };
          }
          parsedBody = JSON.parse(body);
        }
        // Already an object
        else {
          parsedBody = body;
        }
      } catch {
        return { data: emptyResponse };
      }

      const query = parsedBody?.query || '';

      // getDiscussionByID uses node query
      if (query.includes('node(id:') || query.includes('IssueByID')) {
        return { data: pullRequestMocks.prById };
      }
      // hotDiscussionsPRs
      if (query.includes('is:pull-request')) {
        return { data: pullRequestMocks.prSearch };
      }
      // goodFirstIssues
      if (query.includes('good first issue')) {
        return { data: emptyResponse };
      }

      // hotDiscussionsIssues (default)
      return { data: emptyResponse };
    })
    .persist();
}

/**
 * Sets up nock interceptors for getDiscussionByID error handling scenario
 * First call succeeds, second call (getDiscussionByID) fails
 */
export function setupGetDiscussionByIDErrorMocks() {
  nock('https://api.github.com')
    .post('/graphql')
    .matchHeader('authorization', 'token test-token')
    .reply(200, { data: errorMocks.issueWithPagination })
    .post('/graphql')
    .matchHeader('authorization', 'token test-token')
    .reply(200, {
      data: {
        search: {
          nodes: [],
          pageInfo: { hasNextPage: false, endCursor: null }
        },
        rateLimit: errorMocks.issueWithPagination.rateLimit
      }
    })
    .post('/graphql')
    .matchHeader('authorization', 'token test-token')
    .replyWithError('Failed to get discussion by ID');
}

// ============================================================================
// TOOLS SCRIPT - GitHub Code Search API Nock Helpers
// ============================================================================
// Used by: scripts/tools/extract-tools-github.ts
// Tests: tests/integration/build-tools.test.ts

/**
 * Sets up a nock interceptor for GitHub Code Search API calls
 * @param page - The page number for pagination
 * @param response - The mock response data
 * @returns The nock interceptor
 */
export function setupGitHubSearchMock(page: number = 1, response: any = mockToolsData.githubSearchResponse) {
  return nock('https://api.github.com')
    .get('/search/code')
    .query({ q: 'filename:.asyncapi-tool', per_page: 50, page })
    .matchHeader('accept', 'application/vnd.github.text-match+json')
    .matchHeader('authorization', 'token test-token')
    .reply(200, response);
}

/**
 * Sets up a nock interceptor for GitHub Raw Content API calls
 * @param toolPath - The path to the tool file
 * @param content - The mock content to return
 * @returns The nock interceptor
 */
export function setupRawContentMock(toolPath: string, content: string) {
  return nock('https://raw.githubusercontent.com').get(toolPath).reply(200, content);
}

/**
 * Sets up all nock interceptors for successful tools data fetching
 */
export function setupCompleteMocks() {
  setupGitHubSearchMock(1, mockToolsData.githubSearchResponse);
  setupGitHubSearchMock(2, mockToolsData.githubSearchResponsePage2);
  setupRawContentMock('/asyncapi/tool1/abcdef/.asyncapi-tool', mockToolsData.githubContentResponses.tool1);
  setupRawContentMock('/asyncapi/tool2/ghijkl/.asyncapi-tool', mockToolsData.githubContentResponses.tool2);
  setupRawContentMock('/asyncapi/tool3/mnopqr/.asyncapi-tool', mockToolsData.githubContentResponses.tool3);
  setupRawContentMock('/asyncapi/tool4/stuvwx/.asyncapi-tool', mockToolsData.githubContentResponses.tool4);
}

/**
 * Sets up a nock interceptor for GitHub API error responses
 * @param errorMessage - The error message to return
 * @returns The nock interceptor
 */
export function setupErrorMock(errorMessage: string = 'GitHub API error') {
  return nock('https://api.github.com')
    .get('/search/code')
    .query({ q: 'filename:.asyncapi-tool', per_page: 50, page: 1 })
    .matchHeader('accept', 'application/vnd.github.text-match+json')
    .matchHeader('authorization', 'token test-token')
    .replyWithError(errorMessage);
}

/**
 * Sets up a nock interceptor for empty GitHub API responses
 * @returns The nock interceptor
 */
export function setupEmptyResponseMock() {
  return setupGitHubSearchMock(1, mockToolsData.emptyResponse);
}

/**
 * Sets up nock interceptors for GitHub Code Search API pagination scenarios
 */
export function setupToolsPaginationMocks() {
  setupGitHubSearchMock(1, {
    items: [],
    total_count: 0,
    incomplete_results: true // Indicates more pages
  });
  setupGitHubSearchMock(2, {
    items: [],
    total_count: 0,
    incomplete_results: false // No more pages
  });
}

/**
 * Sets up nock interceptors for malformed YAML content scenarios
 */
export function setupMalformedYamlMock() {
  setupGitHubSearchMock(1, mockToolsData.githubSearchResponse);
  setupRawContentMock('/asyncapi/tool1/abcdef/.asyncapi-tool', 'invalid: yaml: content: ['); // Malformed YAML
}

// ============================================================================
// NEWSROOM VIDEOS SCRIPT - YouTube API Nock Helpers
// ============================================================================
// Used by: scripts/build-newsroom-videos.ts
// Tests: tests/integration/build-newsroom-videos-runner.int.test.ts

/**
 * Helper function to set up YouTube API mock
 * @param data - The mock response data
 * @param status - The HTTP status code to return
 * @returns The nock interceptor
 */
export function setupYouTubeAPIMock(data: any, status: number = 200) {
  return nock('https://youtube.googleapis.com').get('/youtube/v3/search').query(true).reply(status, data);
}

/**
 * Helper function to set up YouTube API error mock
 * @param errorMessage - The error message to return
 * @returns The nock interceptor
 */
export function setupYouTubeAPIErrorMock(errorMessage: string = 'Network error') {
  // Use replyWithError to throw an error during fetch, which will be caught
  // and wrapped by the script's catch block as "Failed to build newsroom videos: [error]"
  // The error will be formatted as "request to ... failed, reason: [errorMessage]"
  const scope = nock('https://youtube.googleapis.com')
    .get('/youtube/v3/search')
    .query(true)
    .replyWithError(new Error(errorMessage));

  // Ensure this interceptor is active
  return scope;
}
