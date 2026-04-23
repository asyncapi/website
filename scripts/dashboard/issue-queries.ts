export const Queries = Object.freeze({
  pullRequestById: ` 
query IssueByID($id: ID!) {
  node(id: $id) {
    __typename
    ... on PullRequest {
      assignees(first:1){
        totalCount
      }
      timelineItems(first: 1){
        updatedAt
      }
      author {
        login
      }
      id
      title
      resourcePath
      repository {
        name
      }
      reactions(last: 1) {
        totalCount
      }
      reviews(first: 1) { # Reduced from 'first: 10' to 'first: 1' to reduce API cost
        totalCount
        nodes {
          lastEditedAt
          comments(first: 1) {
            totalCount
          }
        }
      }
      comments(first: 1) { # Reduced from 'first: 10' to 'first: 1' to reduce API cost
        totalCount
        pageInfo {
          hasNextPage
        }
        nodes {
          reactions(last: 1) {
            totalCount
          }
        }
      }
    }
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}`,
  issueById: ` 
query IssueByID($id: ID!) {
  node(id: $id) {
    __typename
    ... on Issue {
      assignees(first:1){
        totalCount
      }
      timelineItems(first: 1){
        updatedAt
      }
      author {
        login
      }
      id
      repository {
        name
      }
      labels(first: 10){
        nodes {
          name
          color
        }
      }
      title
      resourcePath
      reactions(last: 1) {
        totalCount
      }
      comments(last: 1) { # Reduced from 'last: 100' to 'last: 1' to significantly reduce API cost
        totalCount
        pageInfo {
          hasNextPage
        }
        nodes {
          reactions(last: 1) {
            totalCount
          }
        }
      }
    }
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}`,
  goodFirstIssues: `
query($first: Int!, $after: String) {
  search(
    first: $first
    after: $after
    type: ISSUE
    query: "org:asyncapi state:open is:issue label:\\"good first issue\\""
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      __typename
      ... on Issue {
        assignees(first:1){
          totalCount
        }
        author {
          login
        }
        id
        title
        resourcePath
        repository {
          name
        }
        labels(first: 10){
          nodes {
            name
            color
          }
        }
      }
    }
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}
`,
  hotDiscussionsIssues: `
query($first: Int!, $after: String) {
  search(
    first: $first
    after: $after
    type: ISSUE
    query: "org:asyncapi state:open is:issue"
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      __typename
      ... on Issue {
        assignees(first:1){
          totalCount
        }
        timelineItems(first: 1){
          updatedAt
        }
        author {
          login
        }
        id
        title
        resourcePath
        repository {
          name
        }
        labels(first: 10){
          nodes {
            name
            color
          }
        }
        reactions(last: 1) {
          totalCount
        }
        comments { # Removed 'first: 20' and nested 'nodes' to only fetch 'totalCount' and reduce API cost
          totalCount
        }
      }
    }
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}
`,
  hotDiscussionsPullRequests: `
query($first: Int!, $after: String) {
  search(
    first: $first
    after: $after
    type: ISSUE
    query: "org:asyncapi state:open is:pull-request"
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      __typename
      ... on PullRequest {
        assignees(first:1){
          totalCount
        }
        timelineItems(first: 1){
          updatedAt
        }
        author {
          login
        }
        id
        title
        resourcePath
        repository {
          name
        }
        labels(first: 10){
          nodes {
            name
            color
          }
        }
        reactions(last: 1) {
          totalCount
        }
        reviews { # Removed 'first: 10' and nested 'nodes' to only fetch 'totalCount' and reduce API cost
          totalCount
        }
        comments { # Removed 'first: 10' and nested 'nodes' to only fetch 'totalCount' and reduce API cost
          totalCount
        }
      }
    }
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}
`
});