const { graphql } = require('@octokit/graphql')

exports.handler = async function (event, context) {
  if (event.httpMethod == 'POST') {
    const { title, feedback } = JSON.parse(event.body);
    const repositoryID = "MDEwOlJlcG9zaXRvcnkzNDc2MjE1NTk=";
    const categoryID = "DIC_kwDOFLhIt84B_T4d"
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
      // res.status(200).json({ url: url, result: "Feedback posted in Discussion" });
      return {
        statusCode: 200,
        body: JSON.stringify({
          url: url,
          message: "Feedback submitted successfully"
        })
      } 
    } catch (e) {
      console.log(e);
    }
  }else{
    console.log("Get Request")
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "GET Request called"
      })
    }
  }
}
