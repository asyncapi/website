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

  // Initialize combined data objects before the year loop
  const allExpenses = {};
  const allExpensesLinks = [];

  // Loop through all years and build finance info list for each year
  for (const year of yearsList) {
    // Build individual year data
    await buildFinanceInfoList({
      currentDir: '.',
      configDir: 'config',
      financeDir: 'finance',
      year: year,
      jsonDataDir: `json-data/${year}`
    });

    // Add data to combined collections
    const expensesPath = resolve(financeDir, `json-data/${year}/Expenses.json`);
    const linksPath = resolve(financeDir, `json-data/${year}/ExpensesLink.json`);

    if (fs.existsSync(expensesPath)) {
      const yearExpenses = JSON.parse(fs.readFileSync(expensesPath, 'utf8'));
      Object.entries(yearExpenses).forEach(([month, expenses]) => {
        if (!allExpenses[month]) {
          allExpenses[month] = [];
        }

        // Create a temporary object to hold category sums for this month
        const monthCategorySums = {};
        
        // Process existing amounts in allExpenses for this month
        allExpenses[month].forEach((existing) => {
          monthCategorySums[existing.Category] = parseFloat(existing.Amount);
        });

        // Add or sum new expenses from current year
        expenses.forEach((expense) => {
          const amount = parseFloat(expense.Amount);
          if (monthCategorySums[expense.Category]) {
            monthCategorySums[expense.Category] += amount;
          } else {
            monthCategorySums[expense.Category] = amount;
          }
        });

        // Convert back to array format with summed amounts
        allExpenses[month] = Object.entries(monthCategorySums).map(([Category, Amount]) => ({
          Category,
          Amount: Amount.toFixed(2)
        }));
      });
    }

    if (fs.existsSync(linksPath)) {
      const yearLinks = JSON.parse(fs.readFileSync(linksPath, 'utf8'));
      yearLinks.forEach(link => {
        if (!allExpensesLinks.some(existing => existing.category === link.category)) {
          allExpensesLinks.push(link);
        }
      });
    }
  }

  // Create All_years directory and save combined data
  const allYearsDir = resolve(financeDir, 'json-data/All_years');
  if (!fs.existsSync(allYearsDir)) {
    fs.mkdirSync(allYearsDir, { recursive: true });
  }

  fs.writeFileSync(
    resolve(allYearsDir, 'Expenses.json'),
    JSON.stringify(allExpenses)
  );
  fs.writeFileSync(
    resolve(allYearsDir, 'ExpensesLink.json'),
    JSON.stringify(allExpensesLinks)
  );
}

export { start };

start();
