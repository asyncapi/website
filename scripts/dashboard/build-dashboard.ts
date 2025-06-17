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

import { logger } from '../helpers/logger';
import { pause } from '../helpers/utils';
import { Queries } from './issue-queries';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Calculates the number of full months elapsed since the provided date.
 *
 * This function computes the difference between the current date and the specified date, converting the elapsed time into full months using a fixed 30-day month approximation.
 *
 * @param date - A string representing the start date, in a format recognized by the Date constructor.
 * @returns The number of full months that have elapsed since the specified date.
 */
function monthsSince(date: string): number {
  const seconds = Math.floor((new Date().valueOf() - new Date(date).valueOf()) / 1000);
  // 2592000 = number of seconds in a month = 30 * 24 * 60 * 60
  const months = seconds / 2592000;

  return Math.floor(months);
}

/**
 * Extracts a processed label from an issue based on a given prefix.
 *
 * The function searches the labels attached to the issue for one whose name begins with the specified filter.
 * If a matching label is found, it splits the label name by "/" and returns the segment after the first delimiter.
 * If no matching label exists or the expected delimiter is missing, the function returns undefined.
 *
 * @param issue - The issue object containing label nodes.
 * @param filter - The prefix to match the label name against.
 * @returns The substring following "/" in the label name if a match is found; otherwise, undefined.
 */
function getLabel(issue: GoodFirstIssues, filter: string): string | undefined {
  const result = issue.labels?.nodes?.find((label) => label.name.startsWith(filter));

  return result?.name.split('/')[1];
}

/**
 * Recursively fetches discussion nodes from the GitHub GraphQL API.
 *
 * This function executes a provided GraphQL query to retrieve discussion nodes in paginated batches.
 * It automatically retrieves subsequent pages if available by recursively updating the pagination cursor.
 * A short pause between requests is included to help manage API rate limits, and a warning is logged when the remaining limit is low.
 *
 * @param query - The GraphQL query to execute.
 * @param pageSize - The number of discussion nodes to retrieve per page.
 * @param endCursor - (Optional) The pagination cursor; set to null to start from the first page.
 * @returns A promise that resolves with an array of discussion nodes.
 */
async function getDiscussions(
  query: string,
  pageSize: number,
  endCursor: null | string = null
): Promise<Discussion['search']['nodes']> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GitHub token is not set in environment variables');
  }
  try {
    const result: Discussion = await graphql(query, {
      first: pageSize,
      after: endCursor,
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    if (result.rateLimit.remaining <= 100) {
      logger.warn(
        'GitHub GraphQL rateLimit \n' +
          `cost = ${result.rateLimit.cost}\n` +
          `limit = ${result.rateLimit.limit}\n` +
          `remaining = ${result.rateLimit.remaining}\n` +
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
    logger.error(e);

    return Promise.reject(e);
  }
}

/**
 * Retrieves a discussion from GitHub by its unique ID.
 *
 * Uses the appropriate GraphQL query to fetch either a pull request (if `isPR` is true) or an issue.
 *
 * @param isPR - Indicates whether to fetch a pull request (true) or an issue (false).
 * @param id - The unique identifier of the discussion.
 * @returns A promise that resolves with the discussion details.
 *
 * @throws {Error} If the GraphQL request fails.
 */
async function getDiscussionByID(isPR: boolean, id: string): Promise<PullRequestById | IssueById> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GitHub token is not set in environment variables');
  }

  try {
    const result: PullRequestById | IssueById = await graphql(isPR ? Queries.pullRequestById : Queries.issueById, {
      id,
      headers: {
        authorization: `token ${token}`
      }
    });

    return result;
  } catch (e) {
    logger.error(e);

    return Promise.reject(e);
  }
}

/**
 * Processes a batch of hot discussions by updating discussion details when more comment pages are available,
 * calculating an interaction-based score, and formatting each discussion for further processing.
 *
 * For pull requests, review counts are added to the overall interaction tally. The score is normalized using
 * the number of months since the discussion's last update.
 *
 * @param batch - A batch of hot discussions to process.
 * @returns A promise that resolves to an array of processed discussions with computed scores.
 *
 * @throws {Error} When processing a discussion fails.
 */
async function processHotDiscussions(batch: HotDiscussionsIssuesNode[]): Promise<ProcessedDiscussion[]> {
  return Promise.all(
    batch.map(async (discussion) => {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const isPR = discussion.__typename === 'PullRequest';

        if (discussion.comments.pageInfo?.hasNextPage) {
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
            (discussion.reviews.nodes?.reduce((acc, curr) => acc + curr.comments.totalCount, 0) ?? 0)
          : interactionsCount;

        return {
          id: discussion.id,
          isPR,
          isAssigned: !!discussion.assignees.totalCount,
          title: discussion.title,
          author: discussion.author.login,
          resourcePath: discussion.resourcePath,
          repo: `asyncapi/${discussion.repository.name}`,
          labels: discussion.labels ? discussion.labels.nodes : [],
          score: finalInteractionsCount / (monthsSince(discussion.timelineItems.updatedAt) + 2) ** 1.8
        };
      } catch (e) {
        logger.error(`there were some issues while parsing this item: ${JSON.stringify(discussion)}`);
        throw e;
      }
    })
  );
}

/**
 * Processes discussions in batches to retrieve hot discussions.
 *
 * The function processes the given discussion nodes in batches of 5, pausing for 1 second between
 * batches to manage rate limits. It then sorts the processed discussions by score in descending order
 * and filters out any discussion authored by "asyncapi-bot". Finally, it returns the top 12 hot discussions.
 *
 * @param discussions - The array of discussion nodes to process.
 * @returns A promise that resolves to an array of up to 12 processed hot discussions.
 */
async function getHotDiscussions(discussions: HotDiscussionsIssuesNode[]): Promise<ProcessedDiscussion[]> {
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
 * Writes dashboard data as formatted JSON to a file.
 *
 * This function serializes the provided data—containing processed hot discussions and mapped good first issues—and writes it to the specified file path. If the file write operation fails, it logs the error and rethrows it.
 *
 * @param content - An object containing hot discussions and good first issues.
 * @param writePath - The file path where the data should be saved.
 *
 * @throws {Error} If writing the file fails.
 */
async function writeToFile(
  content: {
    hotDiscussions: ProcessedDiscussion[];
    goodFirstIssues: MappedIssue[];
  },
  writePath: string
): Promise<void> {
  try {
    await writeFile(writePath, JSON.stringify(content, null, '  '));
  } catch (error) {
    logger.error('Failed to write dashboard data:', {
      error: (error as Error).message,
      writePath
    });
    throw error;
  }
}

/**
 * Transforms an array of good first issues into a simplified format for further processing.
 *
 * Each issue is mapped to an object containing its unique identifier, title, assignment status, resource path,
 * repository name (prefixed with "asyncapi/"), author's login, a primary area label (extracted using a filter and defaulting to "Unknown"),
 * and a list of labels cleaned to exclude area identifiers and the "good first issue" tag.
 *
 * @param issues - The list of good first issues to transform.
 * @returns A promise that resolves to an array of simplified issue objects.
 */
async function mapGoodFirstIssues(issues: GoodFirstIssues[]): Promise<MappedIssue[]> {
  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    isAssigned: !!issue.assignees.totalCount,
    resourcePath: issue.resourcePath,
    repo: `asyncapi/${issue.repository.name}`,
    author: issue.author.login,
    area: getLabel(issue, 'area/') || 'Unknown',
    labels: issue.labels!.nodes.filter(
      (label) => !label.name.startsWith('area/') && !label.name.startsWith('good first issue')
    )
  }));
}

/**
 * Initiates the dashboard generation process by fetching, processing, and writing discussion data.
 *
 * This function orchestrates the retrieval of hot discussions (including issues and pull requests) and good first issues
 * from GitHub via GraphQL queries. It combines and concurrently processes the fetched data—calculating interaction scores
 * for hot discussions and mapping good first issues into a simplified format—and then writes the resulting JSON data to the
 * specified file path. Errors encountered during any stage of the process are logged.
 *
 * @param writePath - The file path where the dashboard data will be saved.
 * @returns A promise that resolves once the data has been successfully written.
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
    logger.error('There were some issues parsing data from github.');
    logger.error(e);
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
  processHotDiscussions,
  start,
  writeToFile
};
