const { writeFileSync } = require('fs')
const { resolve } = require('path')
const fetch = require('node-fetch')
require('dotenv').config({
  path: resolve(process.cwd(), '.env.local')
})

async function start() {
  try {
    res = await fetch('https://api.zenhub.com/v5/workspaces/5f6492205269c584ae1b576f/issues?epics=1&estimates=1&pipelines=1&repo_ids=296590488', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authentication-Token': process.env.ZENHUB_TOKEN,
      },
    })
    const issues = await res.json()
    const keyResultsNow = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Key Result') && iss.pipeline.name === 'Key Results (Now)' && iss.state === 'open')
    const keyResultsLater = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Key Result') && iss.pipeline.name === 'Key Results (Later)' && iss.state === 'open')
    const keyResultsFuture = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Key Result') && iss.pipeline.name === 'Key Results (Future)' && iss.state === 'open')
    
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