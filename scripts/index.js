const rssFeed = require('./build-rss');
const buildDocs = require('./build-docs');
const buildPosts = require('./build-posts');
const buildRoadMap = require('./build-roadmap');

async function start() {
  buildDocs();
  buildPosts();
  buildRoadMap();
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
