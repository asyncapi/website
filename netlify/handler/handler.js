// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const { graphql } = require('@octokit/graphql')

const handler = async (event) => {
  try {
    if (event.method == 'POST') {
      const {title, feedback} = event.body;
      const repositoryID = "MDEwOlJlcG9zaXRvcnkzNDc2MjE1NTk=";
      const categoryID = "DIC_kwDOFLhIt84B_T4d"
      try{
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
          // res.status(200).json({url:url, result:"Feedback posted in Discussion"});
          return {
            status: 200,
            url:url,
            result: "Feedback posted in Discussion"
          }
        }catch(e){
          console.log(e);
      }
  }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
