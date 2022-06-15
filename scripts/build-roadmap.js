const { writeFileSync } = require('fs')
const { resolve } = require('path')
const fetch = require('node-fetch')
const { graphql } = require('@octokit/graphql')
require('dotenv').config({
  path: resolve(process.cwd(), '.env.local')
})

module.exports = async function buildRoadMap() {
  try {
    const outcomesAndSolutionsQuery = await graphql(`
      query outcomesAndSolutions($owner: String!, $repo: String!) {
        outcomes: repository(owner: $owner, name: $repo) {
          issues(labels: ["Outcome"], states: [OPEN], last: 100) {
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
        
        solutions: repository(owner: $owner, name: $repo) {
          issues(labels: ["Solution"], states: [OPEN], last: 100) {
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

    const outcomes = outcomesAndSolutionsQuery.outcomes.issues.nodes

    let res = await fetch('https://api.zenhub.com/v5/workspaces/5f6492205269c584ae1b576f/issues?epics=1&connections=1&repo_ids=296590488', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authentication-Token': process.env.ZENHUB_TOKEN,
      },
    })
    const issues = await res.json()
    const bets = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Bet'))
    const solutions = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Solution'))

    for await (let bet of bets) {
      if (bet.parent_epics.length) {
        res = await fetch(`https://api.zenhub.com/v4/repositories/${bet.parent_epics[0].repo_id}/epics/${bet.parent_epics[0].issue_number}?workspaceId=5f6492205269c584ae1b576f`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authentication-Token': process.env.ZENHUB_TOKEN,
          },
        })
        const parentEpic = await res.json()
        if (parentEpic && parentEpic.labels.find(l => l.name === 'Solution')) {
          const solution = solutions.find(solution => solution.number === parentEpic.issue_number)
          solution.bets = solution.bets || []
          solution.bets.push(bet)
        }
      }
    }

    for await (let solution of solutions) {
      for await (let pEpic of solution.parent_epics) {
        res = await fetch(`https://api.zenhub.com/v4/repositories/${pEpic.repo_id}/epics/${pEpic.issue_number}?workspaceId=5f6492205269c584ae1b576f`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authentication-Token': process.env.ZENHUB_TOKEN,
          },
        })
        const parentEpic = await res.json()
        if (parentEpic && parentEpic.labels.find(l => l.name === 'Outcome')) {
          const outcome = outcomes.find(outcome => outcome.number === parentEpic.issue_number)
          outcome.solutions = outcome.solutions || []
          outcome.solutions.push(solution)
        }
      }
    }

    const outcomesNow = outcomes.filter(outcome => outcome.labels.nodes.find(label => label.name === 'Pipeline: Now'))
    const outcomesLater = outcomes.filter(outcome => outcome.labels.nodes.find(label => label.name === 'Pipeline: Later'))
    const outcomesFuture = outcomes.filter(outcome => outcome.labels.nodes.find(label => label.name === 'Pipeline: Future'))
    
    const result = {
      outcomes: {
        now: outcomesNow,
        later: outcomesLater,
        future: outcomesFuture,
      },
    }

    writeFileSync(resolve(__dirname, '..', 'config', 'roadmap.json'), JSON.stringify(result, null, '  '))
  } catch (e) {
    if (process.env.NODE_ENV === 'production') {
      console.error(e)
    }
    
    writeFileSync(resolve(__dirname, '..', 'config', 'roadmap.json'), '{}')
  }
};
