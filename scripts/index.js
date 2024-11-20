import { resolve, dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { rssFeed } from './build-rss.js';
import { buildPostList } from './build-post-list.js';
import { buildCaseStudiesList } from './casestudies/index.js';
import { buildAdoptersList } from './adopters/index.js';
import { buildFinanceInfoList } from './finance/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function start() {
  await buildPostList();
  rssFeed('blog', 'AsyncAPI Initiative Blog RSS Feed', 'AsyncAPI Initiative Blog', 'rss.xml');
  await buildCaseStudiesList('config/casestudies', resolve(__dirname, '../config', 'case-studies.json'));
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
