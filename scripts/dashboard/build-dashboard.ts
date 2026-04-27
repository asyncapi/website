import { graphql } from '@octokit/graphql';
import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import type {
  Discussion,
  GoodFirstIssues,
  HotDiscussionsIssuesNode,
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

const HOT_DISCUSSIONS_MONTHS_BACK = 6;

const PAGE_SIZE = 30;

const MAX_PAGES_HOT_DISCUSSIONS = 5;

const MAX_PAGES_GOOD_FIRST_ISSUES = 5;

const BASE_DELAY_MS = 2000;

const MAX_RETRIES = 3;

const RETRY_BASE_DELAY_MS = 60000;

function getHotDiscussionsCutoffDate(): string {
  const date = new Date();

  date.setMonth(date.getMonth() - HOT_DISCUSSIONS_MONTHS_BACK);

  return date.toISOString().split('T')[0];
}

function isRetryableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  const lowerMessage = message.toLowerCase();

  return (
    lowerMessage.includes('secondary rate limit') ||
    lowerMessage.includes('502 bad gateway') ||
    lowerMessage.includes('unicorn') ||
    lowerMessage.includes('server error') ||
    lowerMessage.includes('econnreset') ||
    lowerMessage.includes('etimedout')
  );
}

async function retryWithBackoff<T>(fn: () => Promise<T>, context: string): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error)) {
        throw error;
      }

      if (attempt === MAX_RETRIES) {
        break;
      }

      const delayMs = RETRY_BASE_DELAY_MS * 2 ** attempt;

      logger.warn(
        `Retryable error during ${context} (attempt ${attempt + 1}/${MAX_RETRIES}). ` +
          `Retrying in ${delayMs / 1000}s...`
      );
      await pause(delayMs);
    }
  }

  const originalMessage = lastError instanceof Error ? lastError.message : String(lastError);

  throw new Error(`Exhausted ${MAX_RETRIES} retries for ${context}: ${originalMessage}`);
}

async function adaptiveDelay(rateLimit: Discussion['rateLimit']): Promise<void> {
  if (rateLimit.remaining <= 100) {
    const resetTime = new Date(rateLimit.resetAt).getTime();
    const waitMs = Math.max(resetTime - Date.now(), 0) + 1000;

    logger.warn(
      `Rate limit critically low (${rateLimit.remaining} remaining). Waiting ${Math.round(waitMs / 1000)}s until reset.`
    );
    await pause(waitMs);
  } else if (rateLimit.remaining <= 500) {
    await pause(5000);
  } else {
    await pause(BASE_DELAY_MS);
  }
}

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
 * Fetches discussion nodes from the GitHub GraphQL API with pagination, adaptive throttling, and retry logic.
 *
 * @param query - The GraphQL query to execute.
 * @param pageSize - The number of discussion nodes to retrieve per page.
 * @param endCursor - The pagination cursor; null to start from the first page.
 * @param maxPages - Maximum number of pages to fetch. 0 means unlimited.
 * @param currentPage - Current page counter (used internally for recursion).
 * @returns A promise that resolves with an array of discussion nodes.
 */
async function getDiscussions(
  query: string,
  pageSize: number,
  endCursor: null | string = null,
  maxPages: number = 0,
  currentPage: number = 1
): Promise<Discussion['search']['nodes']> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GitHub token is not set in environment variables');
  }

  const result: Discussion = await retryWithBackoff(
    () =>
      graphql(query, {
        first: pageSize,
        after: endCursor,
        headers: {
          authorization: `token ${token}`
        }
      }),
    `getDiscussions page ${currentPage}`
  );

  await adaptiveDelay(result.rateLimit);

  const { hasNextPage } = result.search.pageInfo;

  if (!hasNextPage || (maxPages > 0 && currentPage >= maxPages)) {
    return result.search.nodes;
  }

  return result.search.nodes.concat(
    await getDiscussions(query, pageSize, result.search.pageInfo.endCursor, maxPages, currentPage + 1)
  );
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

  return retryWithBackoff(
    () =>
      graphql(isPR ? Queries.pullRequestById : Queries.issueById, {
        id,
        headers: {
          authorization: `token ${token}`
        }
      }),
    `getDiscussionByID ${id}`
  );
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
      } catch (error) {
        logger.error(`there were some issues while parsing this item: ${JSON.stringify(discussion)}`);
        throw error;
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
 * Collects data incrementally -- if one section fails, whatever was successfully collected is still written.
 *
 * @param writePath - The file path where the dashboard data will be saved.
 * @returns A promise that resolves once the data has been successfully written.
 * @throws {Error} If both hot discussions and good first issues fail to fetch.
 */
async function start(writePath: string): Promise<void> {
  const cutoffDate = getHotDiscussionsCutoffDate();

  logger.info(`Fetching hot discussions updated since ${cutoffDate} (${HOT_DISCUSSIONS_MONTHS_BACK} months back)`);

  let hotDiscussions: ProcessedDiscussion[] = [];
  let goodFirstIssues: MappedIssue[] = [];
  let hotDiscussionsFailed = false;
  let goodFirstIssuesFailed = false;

  try {
    const issues = await getDiscussions(
      Queries.hotDiscussionsIssues(cutoffDate),
      PAGE_SIZE,
      null,
      MAX_PAGES_HOT_DISCUSSIONS
    );
    const PRs = await getDiscussions(
      Queries.hotDiscussionsPullRequests(cutoffDate),
      PAGE_SIZE,
      null,
      MAX_PAGES_HOT_DISCUSSIONS
    );
    const discussions = issues.concat(PRs);

    hotDiscussions = await getHotDiscussions(discussions);
    logger.info(`Collected ${hotDiscussions.length} hot discussions`);
  } catch (error) {
    hotDiscussionsFailed = true;
    logger.error('Failed to fetch hot discussions:');
    logger.error(error);
  }

  try {
    const rawGoodFirstIssues: GoodFirstIssues[] = await getDiscussions(
      Queries.goodFirstIssues,
      PAGE_SIZE,
      null,
      MAX_PAGES_GOOD_FIRST_ISSUES
    );

    goodFirstIssues = await mapGoodFirstIssues(rawGoodFirstIssues);
    logger.info(`Collected ${goodFirstIssues.length} good first issues`);
  } catch (error) {
    goodFirstIssuesFailed = true;
    logger.error('Failed to fetch good first issues:');
    logger.error(error);
  }

  if (hotDiscussionsFailed && goodFirstIssuesFailed) {
    throw new Error('Dashboard generation failed: unable to fetch any data from GitHub.');
  }

  if (hotDiscussionsFailed || goodFirstIssuesFailed) {
    logger.warn('Dashboard generated with partial data due to errors above.');
  }

  await writeToFile({ hotDiscussions, goodFirstIssues }, writePath);
}

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  start(resolve(currentDirPath, '..', '..', 'dashboard.json'));
}

export {
  adaptiveDelay,
  getDiscussionByID,
  getDiscussions,
  getHotDiscussions,
  getHotDiscussionsCutoffDate,
  getLabel,
  isRetryableError,
  mapGoodFirstIssues,
  processHotDiscussions,
  retryWithBackoff,
  start,
  writeToFile
};
