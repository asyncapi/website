/* eslint-disable cypress/no-async-tests */
import { getLabel , monthsSince ,mapGoodFirstIssues,getDiscussionByID} from "../../../../scripts/dashboard/build-dashboard";
import Queries from '../../../../scripts/dashboard/issue-queries'
describe('getLabel function', () => {
  const mockIssue = {
    labels: {
      nodes: [
        { name: 'category/bug' },
        { name: 'status/in-progress' },
        { name: 'priority/high' }
      ]
    }
  };

  it('returns the correct label name when filter matches', () => {
    cy.wrap(mockIssue).then((issue) => {
      const filter = 'status/';
      const expectedResult = 'in-progress';
      const actual = getLabel(issue,filter);
      console.log(actual);
      cy.wrap(getLabel(issue, filter)).should('equal', expectedResult);
    });
  });
});

describe('monthsSince function', () => {
  // Define some sample dates and expected results
  const today = new Date();
  const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());

  // Write the test cases
  it('should return 0 for the same date', () => {
    expect(monthsSince(today)).to.equal(0);
  });

  it('should return 1 for one month ago', () => {
    expect(monthsSince(oneMonthAgo)).to.equal(1);
  });

  it('should return 2 for two months ago', () => {
    expect(monthsSince(twoMonthsAgo)).to.equal(2);
  });

  it('should return 3 for three months ago', () => {
    expect(monthsSince(threeMonthsAgo)).to.equal(3);
  });
});


// Mock some data
const mockIssues = [
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
const expectedOutput =[
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

describe('mapGoodFirstIssues', () => {
  it('should map the issues correctly', async () => {
    // Call the function with the mock data
    const result = await mapGoodFirstIssues(mockIssues);
    expect(result).to.deep.equal(expectedOutput);
  });
});

const mockData = {
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

describe('Discussion Fetching', () => {
  it('should fetch a discussion (pull request or issue)', async () => {
    // Stub the GraphQL request with mock data
    const isPR =true; 
    /**
      if IsPr == true then we get Pull request if false we get issue 
      for current situation we will be getting pull request 
    */
    cy.intercept('POST', 'https://api.github.com/graphql', (req) => {
      if (req.body.operationName === Queries.pullRequestById && isPR === true) {
        req.reply({ body: { data: { pullRequest: mockData.discussion.pullRequest  } } });
      } else if (req.body.operationName === Queries.issueById) {
        req.reply({ body: { data: { issue: mockData.discussion.issue } } });
      }
    }).as('graphqlRequest');
    await getDiscussionByID(mockData.isPr).then((result) => {
      expect(result).to.exist;
      console.log("hsuhus", result);
    });
  });
});
