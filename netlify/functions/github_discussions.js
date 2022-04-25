const { graphql } = require('@octokit/graphql')
const repositoryID = "MDEwOlJlcG9zaXRvcnkzNDc2MjE1NTk=" /* Respository ID */
const categoryID = "DIC_kwDOFLhIt84B_T4d" /* Docs Category ID */

/**  
  ** The handler function creates a GitHub discussion in the Docs category of the community repository using GitHub GraphQL API. This function accepts a POST request from the Feedback card and creates a Discussion only if GITHUB_TOKEN_CREATE_DISCUSSION has been added in .env properly.

  @param event contains the title and body of the feedback to be added in the GitHub discussion.
*/

exports.handler = async function (event) {
  if (event.httpMethod == 'POST') {
    const { title, feedback } = JSON.parse(event.body);
    
    try {
      const createDiscussion = await graphql(`
        mutation { 
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
            authorization: `token ${process.env.GITHUB_TOKEN_CREATE_DISCUSSION}`,
          },
        })
      let url = createDiscussion.createDiscussion.discussion.url;
      return {
        statusCode: 200,
        body: JSON.stringify({
          url: url,
          message: "Feedback submitted successfully"
        })
      } 
    } catch (err) {
      console.log(err);
      return {
        statusCode: err.response.status,
        message:err.response.data.message
      }
    }
  }else{
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "The specified HTTP method is not allowed."
      })
    }
  }
}
