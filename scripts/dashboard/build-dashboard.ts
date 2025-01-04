import { graphql } from '@octokit/graphql';
import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import type {
  Discussion,
  GoodFirstIssues,
  HotDiscussionsIssuesNode,
  HotDiscussionsPullRequestsNode,
  IssueById,
  MappedIssue,
  ProcessedDiscussion,
  PullRequestById
} from '@/types/scripts/dashboard';

import { Queries } from './issue-queries';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Pauses execution for a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to pause.
 * @returns {Promise<void>}
 */
async function pause(ms: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

/**
 * Calculates the number of months since a given date.
 * @param {string} date - The date to calculate from.
 * @returns {number} - The number of months since the date.
 */
function monthsSince(date: string) {
  const seconds = Math.floor((new Date().valueOf() - new Date(date).valueOf()) / 1000);
  // 2592000 = number of seconds in a month = 30 * 24 * 60 * 60
  const months = seconds / 2592000;

  return Math.floor(months);
}

/**
 * Retrieves a label from an issue based on a filter.
 * @param {GoodFirstIssues} issue - The issue to retrieve the label from.
 * @param {string} filter - The filter to apply to the label.
 * @returns {string | undefined} - The label if found, otherwise undefined.
 */
function getLabel(issue: GoodFirstIssues, filter: string) {
  const result = issue.labels.nodes.find((label) => label.name.startsWith(filter));

  return result?.name.split('/')[1];
}

/**
 * Fetches discussions from GitHub GraphQL API.
 * @param {string} query - The GraphQL query to execute.
 * @param {number} pageSize - The number of results per page.
 * @param {null | string} [endCursor=null] - The cursor for pagination.
 * @returns {Promise<Discussion['search']['nodes']>} - The fetched discussions.
 */
async function getDiscussions(
  query: string,
  pageSize: number,
  endCursor: null | string = null
): Promise<Discussion['search']['nodes']> {
  try {
    const result: Discussion = await graphql(query, {
      first: pageSize,
      after: endCursor,
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    if (result.rateLimit.remaining <= 100) {
      console.log(
        '[WARNING] GitHub GraphQL rateLimit',
        `cost = ${result.rateLimit.cost}`,
        `limit = ${result.rateLimit.limit}`,
        `remaining = ${result.rateLimit.remaining}`,
        `resetAt = ${result.rateLimit.resetAt}`
      );
    }

    await pause(500);

    const { hasNextPage } = result.search.pageInfo;

    if (!hasNextPage) {
      return result.search.nodes;
    }

    return result.search.nodes.concat(await getDiscussions(query, pageSize, result.search.pageInfo.endCursor));
  } catch (e) {
    console.error(e);

    return Promise.reject(e);
  }
}

/**
 * Fetches a discussion by its ID.
 * @param {boolean} isPR - Whether the discussion is a pull request.
 * @param {string} id - The ID of the discussion.
 * @returns {Promise<PullRequestById | IssueById>} - The fetched discussion.
 */
async function getDiscussionByID(isPR: boolean, id: string): Promise<PullRequestById | IssueById> {
  try {
    const result: PullRequestById | IssueById = await graphql(isPR ? Queries.pullRequestById : Queries.issueById, {
      id,
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    return result;
  } catch (e) {
    console.error(e);

    return Promise.reject(e);
  }
}

/**
 * Processes a batch of hot discussions.
 * @param {HotDiscussionsIssuesNode[]} batch - The batch of discussions to process.
 * @returns {Promise<ProcessedDiscussion[]>} - The processed discussions.
 */
async function processHotDiscussions(batch: HotDiscussionsIssuesNode[]) {
  return Promise.all(
    batch.map(async (discussion) => {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const isPR = discussion.__typename === 'PullRequest';

        if (discussion.comments.pageInfo!.hasNextPage) {
          const fetchedDiscussion = await getDiscussionByID(isPR, discussion.id);

          // eslint-disable-next-line no-param-reassign
          discussion = fetchedDiscussion.node;
        }

        const interactionsCount =
          discussion.reactions.totalCount +
          discussion.comments.totalCount +
          discussion.comments.nodes.reduce((acc, curr) => acc + curr.reactions.totalCount, 0);

        const finalInteractionsCount = isPR
          ? interactionsCount +
            discussion.reviews.totalCount +
            discussion.reviews.nodes!.reduce((acc, curr) => acc + curr.comments.totalCount, 0)
          : interactionsCount;

        return {
          id: discussion.id,
          isPR,
          isAssigned: !!discussion.assignees.totalCount,
          title: discussion.title,
          author: discussion.author ? discussion.author.login : '',
          resourcePath: discussion.resourcePath,
          repo: `asyncapi/${discussion.repository.name}`,
          labels: discussion.labels ? discussion.labels.nodes : [],
          score: finalInteractionsCount / (monthsSince(discussion.timelineItems.updatedAt) + 2) ** 1.8
        };
      } catch (e) {
        console.error(`there were some issues while parsing this item: ${JSON.stringify(discussion)}`);
        throw e;
      }
    })
  );
}

/**
 * Retrieves and processes hot discussions.
 * @param {HotDiscussionsIssuesNode[]} discussions - The discussions to process.
 * @returns {Promise<ProcessedDiscussion[]>} - The processed hot discussions.
 */
async function getHotDiscussions(discussions: HotDiscussionsIssuesNode[]) {
  const result: ProcessedDiscussion[] = [];
  const batchSize = 5;

  for (let i = 0; i < discussions.length; i += batchSize) {
    const batch = discussions.slice(i, i + batchSize);
    // eslint-disable-next-line no-await-in-loop
    const batchResults = await processHotDiscussions(batch);

    // eslint-disable-next-line no-await-in-loop
    await pause(1000);
    result.push(...batchResults);
  }

  result.sort((ElemA, ElemB) => ElemB.score - ElemA.score);
  const filteredResult = result.filter((issue) => issue.author !== 'asyncapi-bot');

  return filteredResult.slice(0, 12);
}

/**
 * Writes content to a file.
 * @param {object} content - The content to write.
 * @param {ProcessedDiscussion[]} content.hotDiscussions - The hot discussions to write.
 * @param {MappedIssue[]} content.goodFirstIssues - The good first issues to write.
 * @param {string} writePath - The path to write the file to.
 * @returns {Promise<void>}
 */
async function writeToFile(
  content: {
    hotDiscussions: ProcessedDiscussion[];
    goodFirstIssues: MappedIssue[];
  },
  writePath: string
) {
  try {
    await writeFile(writePath, JSON.stringify(content, null, '  '));
  } catch (error) {
    console.error('Failed to write dashboard data:', {
      error: (error as Error).message,
      writePath
    });
    throw error;
  }
}

/**
 * Maps good first issues to a simplified format.
 * @param {GoodFirstIssues[]} issues - The issues to map.
 * @returns {Promise<MappedIssue[]>} - The mapped issues.
 */
async function mapGoodFirstIssues(issues: GoodFirstIssues[]) {
  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    isAssigned: !!issue.assignees.totalCount,
    resourcePath: issue.resourcePath,
    repo: `asyncapi/${issue.repository.name}`,
    author: issue.author.login,
    area: getLabel(issue, 'area/') || 'Unknown',
    labels: issue.labels.nodes.filter(
      (label) => !label.name.startsWith('area/') && !label.name.startsWith('good first issue')
    )
  }));
}

/**
 * Starts the process of fetching and writing dashboard data.
 * @param {string} writePath - The path to write the dashboard data to.
 * @returns {Promise<void>}
 */
async function start(writePath: string): Promise<void> {
  try {
    const issues = (await getDiscussions(Queries.hotDiscussionsIssues, 20)) as HotDiscussionsIssuesNode[];
    const PRs = (await getDiscussions(Queries.hotDiscussionsPullRequests, 20)) as HotDiscussionsPullRequestsNode[];
    const rawGoodFirstIssues: GoodFirstIssues[] = await getDiscussions(Queries.goodFirstIssues, 20);
    const discussions = issues.concat(PRs);
    const [hotDiscussions, goodFirstIssues] = await Promise.all([
      getHotDiscussions(discussions),
      mapGoodFirstIssues(rawGoodFirstIssues)
    ]);

    await writeToFile({ hotDiscussions, goodFirstIssues }, writePath);
  } catch (e) {
    console.log('There were some issues parsing data from github.');
    console.log(e);
  }
}

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  start(resolve(currentDirPath, '..', '..', 'dashboard.json'));
}

export {
  getDiscussionByID,
  getDiscussions,
  getHotDiscussions,
  getLabel,
  mapGoodFirstIssues,
  monthsSince,
  processHotDiscussions,
  start,
  writeToFile
};
