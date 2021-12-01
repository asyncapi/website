const rssFeed = require('./build-rss');
const buildRoadMap = require('./build-roadmap');
const buildPostList = require('./build-post-list');
const buildMeetings = require('./build-meetings');

async function start() {
  buildMeetings();
  buildRoadMap();
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
}

start();
