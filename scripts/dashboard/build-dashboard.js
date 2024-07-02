const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { graphql } = require('@octokit/graphql');
const { Promise } = require('node-fetch');
const { Queries } = require('./issue-queries');
const { cookies } = require('next/headers');

async function getHotDiscussions(discussions) {
  console.log("Received discussions:", discussions);
  const result = await Promise.all(
    discussions.map(async (discussion) => {
      try {
        const isPR = discussion.__typename === 'PullRequest';
        if (discussion.comments.pageInfo.hasNextPage) {
          let fetchedDiscussion = await getDiscussionByID(isPR, discussion.id);
          discussion = fetchedDiscussion.node;
        }

        const interactionsCount =
          discussion.reactions.totalCount +
          discussion.comments.totalCount +
          discussion.comments.nodes.reduce(
            (acc, curr) => acc + curr.reactions.totalCount,
            0
          );

        const finalInteractionsCount = isPR
          ? interactionsCount +
          discussion.reviews.totalCount +
          discussion.reviews.nodes.reduce(
            (acc, curr) => acc + curr.comments.totalCount,
            0
          )
          : interactionsCount;

        console.log("Processed discussion:", {
          id: discussion.id,
          isPR,
          isAssigned: !!discussion.assignees.totalCount,
          title: discussion.title,
          author: discussion.author ? discussion.author.login : '',
          resourcePath: discussion.resourcePath,
          repo: 'asyncapi/' + discussion.repository.name,
          labels: discussion.labels ? discussion.labels.nodes : [],
          score:
            finalInteractionsCount /
            Math.pow(monthsSince(discussion.timelineItems.updatedAt) + 2, 1.8),
        });

        return {
          id: discussion.id,
          isPR,
          isAssigned: !!discussion.assignees.totalCount,
          title: discussion.title,
          author: discussion.author ? discussion.author.login : '',
          resourcePath: discussion.resourcePath,
          repo: 'asyncapi/' + discussion.repository.name,
          labels: discussion.labels ? discussion.labels.nodes : [],
          score:
            finalInteractionsCount /
            Math.pow(monthsSince(discussion.timelineItems.updatedAt) + 2, 1.8),
        };
      } catch (e) {
        console.error(
          `There were some issues while parsing this item: ${JSON.stringify(
            discussion
          )}`
        );
        throw e;
      }
    })
  );
  result.sort((ElemA, ElemB) => ElemB.score - ElemA.score);
  const filteredResult = result.filter(issue => issue.author !== 'asyncapi-bot');
  return filteredResult.slice(0, 12);
}

async function writeToFile(content) {
  console.log("Writing to file:", content);
  writeFileSync(
    resolve(__dirname, '..', '..', 'dashboard.json'),
    JSON.stringify(content, null, '  ')
  );
}

async function mapGoodFirstIssues(issues) {
  console.log("Mapping good first issues:", issues);
  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    isAssigned: !!issue.assignees.totalCount,
    resourcePath: issue.resourcePath,
    repo: 'asyncapi/' + issue.repository.name,
    author: issue.author.login,
    area: getLabel(issue, 'area/') || 'Unknown',
    labels: issue.labels.nodes.filter(
      (label) =>
        !label.name.startsWith('area/') &&
        !label.name.startsWith('good first issue')
    ),
  }));
}

function getLabel(issue, filter) {
  const result = issue.labels.nodes.find((label) =>
    label.name.startsWith(filter)
  );
  return result && result.name.split('/')[1];
}

function monthsSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const months = seconds / 2592000;
  return Math.floor(months);
}

async function getDiscussions(query, pageSize, endCursor = null) {
  try {
    let result = await graphql(query, {
      first: pageSize,
      after: endCursor,
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    console.log("Received discussions data:", result);

    if (result.rateLimit.remaining <= 100) {
      console.log(
        `[WARNING] GitHub GraphQL rateLimit`,
        `cost = ${result.rateLimit.cost}`,
        `limit = ${result.rateLimit.limit}`,
        `remaining = ${result.rateLimit.remaining}`,
        `resetAt = ${result.rateLimit.resetAt}`
      );
    }

    const hasNextPage = result.search.pageInfo.hasNextPage;

    if (!hasNextPage) {
      return result.search.nodes;
    } else {
      return result.search.nodes.concat(
        await getDiscussions(query, pageSize, result.search.pageInfo.endCursor)
      );
    }
  } catch (e) {
    console.error(e);
  }
}

async function getDiscussionByID(isPR, id) {
  try {
    let result = await graphql(isPR ? Queries.pullRequestById : Queries.issueById, {
      id,
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    console.log("Fetched discussion by ID:", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function start() {
  try {
    const [issues, PRs, rawGoodFirstIssues] = await Promise.all([
      getDiscussions(Queries.hotDiscussionsIssues, 20),
      getDiscussions(Queries.hotDiscussionsPullRequests, 20),
      getDiscussions(Queries.goodFirstIssues, 20),
    ]);
    console.log("Fetched issues:", issues);
    console.log("Fetched PRs:", PRs);
    console.log("Fetched good first issues:", rawGoodFirstIssues);

    const discussions = issues.concat(PRs);
    const [hotDiscussions, goodFirstIssues] = await Promise.all([
      getHotDiscussions(discussions),
      mapGoodFirstIssues(rawGoodFirstIssues),
    ]);

    console.log("Hot discussions:", hotDiscussions);
    console.log("Good first issues:", goodFirstIssues);

    writeToFile({ hotDiscussions, goodFirstIssues });
  } catch (e) {
    console.log('There were some issues parsing data from GitHub.');
    console.log(e);
  }
}

start();

module.exports = { getLabel, monthsSince, mapGoodFirstIssues, getHotDiscussions, getDiscussionByID };
