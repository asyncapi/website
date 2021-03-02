const { writeFileSync } = require('fs')
const { resolve } = require('path')
const { graphql } = require('@octokit/graphql')
require('dotenv').config({
  path: resolve(process.cwd(), '.env.local')
})

async function start() {
  try {
    const keyResultsQuery = await graphql(`
      query keyResults($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          issues(labels: ["Key Result"], states: [OPEN], last: 100) {
            nodes {
              title
              url
              labels (last: 100) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `,
      {
        owner: 'asyncapi',
        repo: 'shape-up-process',
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    )

    const keyResults = keyResultsQuery.repository.issues.nodes
    const keyResultsNow = keyResults.filter(kr => kr.labels.nodes.find(label => label.name === 'Pipeline: Now'))
    const keyResultsLater = keyResults.filter(kr => kr.labels.nodes.find(label => label.name === 'Pipeline: Later'))
    const keyResultsFuture = keyResults.filter(kr => kr.labels.nodes.find(label => label.name === 'Pipeline: Future'))
    
    console.log(keyResults)
    
    const result = {
      keyResults: {
        now: keyResultsNow,
        later: keyResultsLater,
        future: keyResultsFuture,
      },
    }

    writeFileSync(resolve(__dirname, '..', 'roadmap.json'), JSON.stringify(result, null, '  '))
  } catch (e) {
    console.error(e)
  }
}

start()