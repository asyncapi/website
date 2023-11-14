const rssFeed = require('./build-rss');
const buildPostList = require('./build-post-list');
const buildCaseStudiesList = require('./casestudies');

async function start() {
  await buildPostList();
  rssFeed(
    'blog',
    'AsyncAPI Initiative Blog RSS Feed',
    'AsyncAPI Initiative Blog',
    'rss.xml'
  );
  rssFeed(
    'jobs',
    'AsyncAPI Initiative Jobs RSS Feed',
    'AsyncAPI Initiative Jobs Board',
    'jobs/rss.xml'
  );
  await buildCaseStudiesList();
}

start();