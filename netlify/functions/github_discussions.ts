import type { Handler, HandlerEvent } from '@netlify/functions';
import type { GraphQlQueryResponseData } from '@octokit/graphql';
import { graphql } from '@octokit/graphql';

const repositoryID: string =
  'MDEwOlJlcG9zaXRvcnkzNDc2MjE1NTk='; /* Respository ID */
const categoryID: string = 'DIC_kwDOFLhIt84B_T4d'; /* Docs Category ID */

interface ErrorResponse {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

/**
 * The handler function creates a GitHub discussion in the Docs category of the community repository using GitHub GraphQL API. This function accepts a POST request from the Feedback card and creates a Discussion only if GITHUB_TOKEN_CREATE_DISCUSSION has been added in .env properly.
 * @param event Handler event context that contains the title and body of the feedback to be added in the GitHub discussion.
 * @returns Success or Error API response based upon the GraphQL call
 */
const handler: Handler = async function (event: HandlerEvent) {
  if (event.httpMethod === 'POST') {
    const { title, feedback } = JSON.parse(event.body || '');

    try {
      // eslint-disable-next-line function-paren-newline
      const createDiscussion: GraphQlQueryResponseData = await graphql(
        `mutation {
            createDiscussion(input:{repositoryId:"${repositoryID}", categoryId:"${categoryID}", title:"${title}", body:"${feedback}"}){
             discussion{
               url
             }
           }
        }`,
        {
          owner: 'asyncapi',
          repo: 'community',
          headers: {
            authorization: `token ${process.env.GITHUB_TOKEN_CREATE_DISCUSSION}`
          }
        });
      const { url } = createDiscussion.createDiscussion.discussion;

      return {
        statusCode: 200,
        body: JSON.stringify({
          url,
          message: 'Feedback submitted successfully'
        })
      };
    } catch (err) {
      const error: ErrorResponse = err;

      return {
        statusCode: error.response.status,
        message: error.response.data.message
      };
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'The specified HTTP method is not allowed.'
      })
    };
  }
};

export { handler };
