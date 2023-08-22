export const mockIssue = {
  labels: {
    nodes: [
      { name: 'category/bug' },
      { name: 'status/in-progress' },
      { name: 'priority/high' }
    ]
  }
};

export const mockIssues = [
  {
    "id": 1,
    "title": "Sample Issue 1",
    "assignees": { "totalCount": 1 },
    "resourcePath": "/sample/issue/1",
    "repository": { "name": "sample-repo" },
    "author": { "login": "user1" },
    "labels": {
      "nodes": [
        { "name": "bug" }
      ]
    }
  },
  {
    "id": 2,
    "title": "Sample Issue 2",
    "assignees": { "totalCount": 0 },
    "resourcePath": "/sample/issue/2",
    "repository": { "name": "sample-repo" },
    "author": { "login": "user2" },
    "labels": {
      "nodes": [
        { "name": "good first issue" },
        { "name": "enhancement" }
      ]
    }
  }
  // Add more sample issues as needed
]


// expected output
export const expectedOutput = [
  {
    "area": "Unknown",
    "author": "user1",
    "id": 1,
    "isAssigned": true,
    "labels": [
      {
        "name": "bug"
      }
    ],
    "repo": "asyncapi/sample-repo",
    "resourcePath": "/sample/issue/1",
    "title": "Sample Issue 1"
  },
  {
    "area": "Unknown",
    "author": "user2",
    "id": 2,
    "isAssigned": false,
    "labels": [
      {
        "name": "enhancement"
      }
    ],
    "repo": "asyncapi/sample-repo",
    "resourcePath": "/sample/issue/2",
    "title": "Sample Issue 2"
  }
]

export const mockData = {
  isPr: true,
  discussion: {
    pullRequest: {
      "id": "PR_kwDOBW5R_c5TUuUu",
      "isPR": true,
      "isAssigned": false,
      "title": "chore(blog): adding 3 New Articles as Blog Posts",
      "author": "ivangsa",
      "resourcePath": "/asyncapi/website/pull/1805",
      "repo": "asyncapi/website",
      "labels": [],
      "score": 20.67657038994663
    },
    issue: {
      "id": "MDU6SXNzdWU5OTMxODc5ODM=",
      "isPR": false,
      "isAssigned": false,
      "title": "Proposal to allow defining schema format other than default one (AsyncAPI Schema)",
      "author": "magicmatatjahu",
      "resourcePath": "/asyncapi/spec/issues/622",
      "repo": "asyncapi/spec",
      "labels": [
        {
          "name": "💭 Strawman (RFC 0)",
          "color": "C2E0C6"
        }
      ],
      "score": 22.68679251119144
    }
  }
};