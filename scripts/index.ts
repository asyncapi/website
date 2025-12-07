import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildUsecasesList } from './usecases/index';
import { buildPostList } from './build-post-list';
import { rssFeed } from './build-rss';
import { buildCaseStudiesList } from './casestudies/index';
import { buildFinanceInfoList } from './finance/index';
import { buildToolsManual } from './build-tools';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const automatedToolsPath = resolve(currentDirPath, '../config', 'tools-automated.json');
const manualToolsPath = resolve(currentDirPath, '../config', 'tools-manual.json');
const toolsPath = resolve(currentDirPath, '../config', 'tools.json');
const tagsPath = resolve(currentDirPath, '../config', 'all-tags.json');


/**
 * Initiates the build process for the project's content.
 *
 * This asynchronous function orchestrates the creation of various content lists by processing designated directories and files.
 * It builds the posts list, generates the blog RSS feed, creates the case studies list, compiles the adopters list,
 * and combines tools data.
 * For finance information, it reads the finance directory, filters and sorts numeric filenames representing years, and utilizes the latest year.
 * The function throws an error if no valid finance data is found.
 *
 * @throws {Error} If no numeric finance data is found in the finance directory.
 */
export async function start() {
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

  // Build tools manually to reflect changes in tools-manual.json
  await buildToolsManual(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
  
  await buildUsecasesList();
  const financeDir = resolve('.', 'config', 'finance');

  // loop through all the directories in finance directory and find the latest year to build the finance info list
  const yearsList = fs
    .readdirSync(financeDir)
    // filter out any items that are not directories with numeric names
    .filter((item) => {
      const itemPath = resolve(financeDir, item);
      return fs.statSync(itemPath).isDirectory() && !Number.isNaN(parseFloat(item));
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

// Only run the function if this file is executed directly
if (process.argv[1] === currentFilePath) {
  start().catch(console.error);
}
