const { writeFileSync } = require('fs')
const { resolve } = require('path')
const fetch = require('node-fetch')
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
              number
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
    
    let res = await fetch('https://api.zenhub.com/v5/workspaces/5f6492205269c584ae1b576f/issues?epics=1&connections=1&repo_ids=296590488', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authentication-Token': process.env.ZENHUB_TOKEN,
      },
    })
    const issues = await res.json()
    const pitches = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Pitch'))
    const bets = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Bet'))

    for await (bet of bets) {
      if (bet.parent_epics.length) {
        res = await fetch(`https://api.zenhub.com/v4/repositories/${bet.parent_epics[0].repo_id}/epics/${bet.parent_epics[0].issue_number}?workspaceId=5f6492205269c584ae1b576f`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authentication-Token': process.env.ZENHUB_TOKEN,
          },
        })
        const parentEpic = await res.json()
        if (parentEpic && parentEpic.labels.find(l => l.name === 'Key Result')) {
          const kr = keyResults.find(kr => kr.number === parentEpic.issue_number)
          kr.bets = kr.bets || []
          kr.bets.push(bet)
        }
      }
    }

    const keyResultsNow = keyResults.filter(kr => kr.labels.nodes.find(label => label.name === 'Pipeline: Now'))
    const keyResultsLater = keyResults.filter(kr => kr.labels.nodes.find(label => label.name === 'Pipeline: Later'))
    const keyResultsFuture = keyResults.filter(kr => kr.labels.nodes.find(label => label.name === 'Pipeline: Future'))
    
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