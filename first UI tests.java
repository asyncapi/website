const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL you want to test
  await page.goto('https://example.com');

  // Define the expected page title
  const expectedTitle = 'Example Domain';

  // Get the actual page title
  const actualTitle = await page.title();

  // Compare the actual title with the expected title
  if (actualTitle === expectedTitle) {
    console.log('Test Passed: Page title matches the expected value.');
  } else {
    console.error(`Test Failed: Expected "${expectedTitle}", but found "${actualTitle}".`);
  }

  await browser.close();
})();
