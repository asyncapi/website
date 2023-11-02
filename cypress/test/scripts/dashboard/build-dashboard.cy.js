/* eslint-disable cypress/no-async-tests */
import { getLabel, monthsSince, mapGoodFirstIssues, getDiscussionByID } from "../../../../scripts/dashboard/build-dashboard";
import Queries from '../../../../scripts/dashboard/issue-queries'
import { mockIssue, mockIssues, expectedOutput, mockData } from "../../../fixtures/scripts-dashboard";
describe('getLabel function', () => {

  it('returns the correct label name when filter matches', () => {
    cy.wrap(mockIssue).then((issue) => {
      const filter = 'status/';
      const expectedResult = 'in-progress';
      const actual = getLabel(issue, filter);
      cy.wrap(actual).should('equal', expectedResult);
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

describe('mapGoodFirstIssues function', () => {
  it('should map the issues correctly', async () => {
    // Call the function with the mock data
    const result = await mapGoodFirstIssues(mockIssues);
    expect(result).to.deep.equal(expectedOutput);
  });
});

describe('getDiscussionsById function', () => {
  it('should fetch a discussion (pull request or issue)', async () => {
    // Stub the GraphQL request with mock data
    const isPR = true;
    /**
      * if IsPr == true then we get Pull request if false we get issue 
      * for current situation we will be getting pull request 
    */
    cy.intercept('POST', 'https://api.github.com/graphql', (req) => {
      if (req.body.operationName === Queries.pullRequestById && isPR === true) {
        req.reply({ body: { data: { pullRequest: mockData.discussion.pullRequest } } });
      } else if (req.body.operationName === Queries.issueById) {
        req.reply({ body: { data: { issue: mockData.discussion.issue } } });
      }
    }).as('graphqlRequest');
    await getDiscussionByID(mockData.isPr).then((result) => {
      expect(result).to.exist;
    });
  });
});
