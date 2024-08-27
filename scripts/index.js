const { resolve } = require('path');
const fs = require('fs');
const rssFeed = require('./build-rss');
const buildPostList = require('./build-post-list');
const buildCaseStudiesList = require('./casestudies');
const buildAdoptersList = require('./adopters');
const buildFinanceInfoList = require('./finance');

async function start() {
  await buildPostList();
  rssFeed('blog', 'AsyncAPI Initiative Blog RSS Feed', 'AsyncAPI Initiative Blog', 'rss.xml');
  await buildCaseStudiesList('config/casestudies', resolve(__dirname, '../config', 'case-studies.json'));
  await buildAdoptersList();
  const financeDir = resolve('.', 'config', 'finance');

  // loop through all the files finance in directory and find the latest year to build the finance info list
  const yearList = fs
    .readdirSync(financeDir)
    // filter out any files that are not numbers
    .filter((file) => {
      return !Number.isNaN(parseFloat(file));
    })
    // sort the years in descending order
    .sort((a, b) => {
      return parseFloat(b) - parseFloat(a);
    });

  const latestYear = yearList[0];

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
