const rssFeed = require('./build-rss');
const buildPostList = require('./build-post-list');
const buildCaseStudiesList = require('./casestudies');
const buildAdoptersList = require('./adopters')
const buildFinanceInfoList = require('./finance');
const { resolve } = require('path');

async function start() {
  await buildPostList();
  rssFeed(
    'blog',
    'AsyncAPI Initiative Blog RSS Feed',
    'AsyncAPI Initiative Blog',
    'rss.xml'
  );
  await buildCaseStudiesList(
    'config/casestudies',
    resolve(__dirname, '../config', 'case-studies.json')
  );
  await buildAdoptersList();
  await buildFinanceInfoList({
    currentDir: '.',
    configDir: 'config',
    financeDir: 'finance',
    year: '2024',
    jsonDataDir: 'json-data'
  });
}

module.exports = start;

start();
