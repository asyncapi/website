import { graphql } from '@octokit/graphql';
import assert from 'assert';
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

async function pause(ms: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

function monthsSince(date: string) {
  const seconds = Math.floor((new Date().valueOf() - new Date(date).valueOf()) / 1000);
  // 2592000 = number of seconds in a month = 30 * 24 * 60 * 60
  const months = seconds / 2592000;

  return Math.floor(months);
}

function getLabel(issue: GoodFirstIssues, filter: string) {
  const result = issue.labels.nodes.find((label) => label.name.startsWith(filter));

  return result?.name.split('/')[1];
}

async function getDiscussions(
  query: string,
  pageSize: number,
  endCursor = null
): Promise<Discussion['data']['search']['nodes']> {
  try {
    const result: any = await graphql(query, {
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
    assert(error instanceof Error);
    console.error('Failed to write dashboard data:', {
      error: error.message,
      writePath
    });
    throw error;
  }
}

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
