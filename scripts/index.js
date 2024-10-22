const { resolve } = require('path');
const fs = require('fs');
const rssFeed = require('./build-rss');
const {buildPostList} = require('./build-post-list');
const buildCaseStudiesList = require('./casestudies');
const buildAdoptersList = require('./adopters');
const buildFinanceInfoList = require('./finance');

async function start() {

  const postDirectories = [
    ['pages/blog', '/blog'],
    ['pages/docs', '/docs'],
    ['pages/about', '/about']
  ];
  const basePath = 'pages';
  const writeFilePath = resolve(__dirname, '../config', 'posts.json');
  
  await buildPostList(postDirectories, basePath, writeFilePath);

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
  const financeDir = resolve('.', 'config', 'finance');

  // loop through all the files finance in directory and find the latest year to build the finance info list
  const yearsList = fs
    .readdirSync(financeDir)
    // filter out any files that are not numbers
    .filter((file) => {
      return !Number.isNaN(parseFloat(file));
    })
    // sort the years in descending order
    .sort((a, b) => {
      return parseFloat(b) - parseFloat(a);
    });

  if (yearsList.length === 0) {
    throw new Error('No finance data found in the finance directory.');
  }

  const latestYear = yearsList[0];

  await buildFinanceInfoList({
    currentDir: '.',
    configDir: 'config',
    financeDir: 'finance',
    year: latestYear,
    jsonDataDir: 'json-data'
  });
}

module.exports = start;

start();
