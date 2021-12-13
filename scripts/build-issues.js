const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { graphql } = require('@octokit/graphql');
const { Promise } = require('node-fetch');
const { Queries } = require('./issue-queries');
require('dotenv').config({
  path: resolve(process.cwd(), '.env.local'),
});

//TODO remove count
let count = 0;
async function getHotDiscussions(discussions) {
  const result = await Promise.all(
    discussions.map(async (discussion) => {
      try {
        const isPR = discussion.__typename === 'PullRequest';
        if (discussion.comments.pageInfo.hasNextPage) {
          fetchedDiscussion = await getDiscussionByID(isPR, discussion.id);
          discussion = fetchedDiscussion.node;
          count++;
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
        return {
          id: discussion.id,
          isPR,
          isAssigned: !!discussion.assignees.totalCount,
          title: discussion.title,
          lastActivity: timeSince(new Date(discussion.timelineItems.updatedAt)),
          author: discussion.author?.login,
          resourcePath: discussion.resourcePath,
          repo: 'asyncapi/' + discussion.repository.name,
          score:
            finalInteractionsCount /
            Math.pow(monthsSince(discussion.timelineItems.updatedAt) + 2, 1.8),
        };
      } catch (e) {
        console.error(
          `there was some issues while parsing this item: ${JSON.stringify(
            discussion
          )}`
        );
        throw e;
      }
    })
  );
  result.sort((ElemA, ElemB) => ElemB.score - ElemA.score);
  return result.slice(0, 9);
}
async function writeToFile(content) {
  writeFileSync(
    resolve(__dirname, '..', 'issues.json'),
    JSON.stringify(content, null, '  ')
  );
}
async function mapGoodFirstIssues(issues) {
  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    isAssigned: !!issue.assignees.totalCount,
    resourcePath: issue.resourcePath,
    repo: issue.repository.name,
    author: issue.author.login,
    area: getLabel(issue, 'area/') || 'Unknown',
    complexity: getLabel(issue, 'complexity/') || 'Unknown',
  }));
}
function getLabel(issue, filter) {
  const result = issue.labels.nodes.find((label) =>
    label.name.startsWith(filter)
  );
  return result && result.name.split('/')[1];
}
module.exports = async function start() {
  try {
    const [issues, PRs, rawGoodFirstIssues] = await Promise.all([
      getDiscussions(Queries.hotDiscussionsIssues, 100),
      getDiscussions(Queries.hotDiscussionsPullRequests, 50),
      getDiscussions(Queries.goodFirstIssues, 50),
    ]);
    const discussions = issues.concat(PRs);
    const [hotDiscussions, goodFirstIssues] = await Promise.all([
      getHotDiscussions(discussions),
      mapGoodFirstIssues(rawGoodFirstIssues),
    ]);
    writeToFile({ hotDiscussions, goodFirstIssues });

    console.log(count);
  } catch (e) {
    console.error(e);
  }
};

function monthsSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const months = seconds / 2592000;
  return Math.floor(months);
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  if (seconds <= 0) {
    return 'Just Now';
  }
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
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
    return await graphql(isPR ? Queries.pullRequestById : Queries.issueById, {
      id,
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
}
