const { writeFile } = require('fs-extra');
const { resolve } = require('path');
const { graphql } = require('@octokit/graphql');
const { Queries } = require('./issue-queries');

/**
 * Introduces a delay in the execution flow.
 * @param {number} ms - The number of milliseconds to pause.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
async function pause(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

async function getDiscussions(query, pageSize, endCursor = null) {
  try {
    const result = await graphql(query, {
      first: pageSize,
      after: endCursor,
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    if (result.rateLimit.remaining <= 100) {
      console.log(
        `[WARNING] GitHub GraphQL rateLimit`,
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

async function getDiscussionByID(isPR, id) {
  try {
    const result = await graphql(isPR ? Queries.pullRequestById : Queries.issueById, {
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

async function processHotDiscussions(batch) {
  return Promise.all(
    batch.map(async (discussion) => {
      try {
        const isPR = discussion.__typename === 'PullRequest';
        if (discussion.comments.pageInfo.hasNextPage) {
          const fetchedDiscussion = await getDiscussionByID(isPR, discussion.id);
          discussion = fetchedDiscussion.node;
        }

        const interactionsCount =
          discussion.reactions.totalCount +
          discussion.comments.totalCount +
          discussion.comments.nodes.reduce((acc, curr) => acc + curr.reactions.totalCount, 0);

        const finalInteractionsCount = isPR
          ? interactionsCount +
          discussion.reviews.totalCount +
          discussion.reviews.nodes.reduce((acc, curr) => acc + curr.comments.totalCount, 0)
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

async function getHotDiscussions(discussions) {
  const result = [];
  const batchSize = 5;

  for (let i = 0; i < discussions.length; i += batchSize) {
    const batch = discussions.slice(i, i + batchSize);
    const batchResults = await processHotDiscussions(batch);
    await pause(1000);
    result.push(...batchResults);
  }

  result.sort((ElemA, ElemB) => ElemB.score - ElemA.score);
  const filteredResult = result.filter((issue) => issue.author !== 'asyncapi-bot');
  return filteredResult.slice(0, 12);
}

async function writeToFile(content, writePath) {
  try {
    await writeFile(writePath, JSON.stringify(content, null, '  '));
  } catch (error) {
    console.error('Failed to write dashboard data:', {
      error: error.message,
      writePath
    });
    throw error;
  }
}

async function mapGoodFirstIssues(issues) {
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

function getLabel(issue, filter) {
  const result = issue.labels.nodes.find((label) => label.name.startsWith(filter));
  return result?.name.split('/')[1];
}

function monthsSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  // 2592000 = number of seconds in a month = 30 * 24 * 60 * 60
  const months = seconds / 2592000;
  return Math.floor(months);
}

async function start(writePath) {
  try {
    const issues = await getDiscussions(Queries.hotDiscussionsIssues, 20);
    const PRs = await getDiscussions(Queries.hotDiscussionsPullRequests, 20);
    const rawGoodFirstIssues = await getDiscussions(Queries.goodFirstIssues, 20);
    const discussions = issues.concat(PRs);
    const [hotDiscussions, goodFirstIssues] = await Promise.all([
      getHotDiscussions(discussions),
      mapGoodFirstIssues(rawGoodFirstIssues)
    ]);
    return await writeToFile({ hotDiscussions, goodFirstIssues }, writePath);
  } catch (e) {
    console.log('There were some issues parsing data from github.');
    console.log(e);
  }
}

/* istanbul ignore next */
if (require.main === module) {
  start(resolve(__dirname, '..', '..', 'dashboard.json'));
}

module.exports = { getLabel, monthsSince, mapGoodFirstIssues, getHotDiscussions, getDiscussionByID, getDiscussions, writeToFile, start, processHotDiscussions };
