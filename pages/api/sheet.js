const { graphql } = require('@octokit/graphql')

async function handler(req, res) {
    if (req.method == 'POST') {
        const {title, feedback} = req.body;
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
            res.status(200).json({url:url, result:"Feedback posted in Discussion"});
        }catch(e){
            console.log(e);
        }
    }
}

export default handler