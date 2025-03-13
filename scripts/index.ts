import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildAdoptersList } from './adopters/index';
import { buildPostList } from './build-post-list';
import { rssFeed } from './build-rss';
import { buildCaseStudiesList } from './casestudies/index';
import { buildFinanceInfoList } from './finance/index';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Main function to start the build process for posts, RSS feed, case studies, adopters, and finance info.
 *
 * @throws {Error} - Throws an error if no finance data is found in the finance directory.
 */
async function start() {
  const postDirectories = [
    ['pages/blog', '/blog'],
    ['pages/docs', '/docs'],
    ['pages/about', '/about']
  ];
  const basePath = 'pages';
  const writeFilePath = resolve(currentDirPath, '../config', 'posts.json');

  await buildPostList(postDirectories, basePath, writeFilePath);
  await rssFeed('blog', 'AsyncAPI Initiative Blog RSS Feed', 'AsyncAPI Initiative Blog', 'rss.xml');
  await buildCaseStudiesList('config/casestudies', resolve(currentDirPath, '../config', 'case-studies.json'));
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

export { start };

start();
