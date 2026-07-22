const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

describe('Accessibility Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Homepage accessibility', async () => {
    await page.goto('http://localhost:3000');
    const results = await new AxePuppeteer(page).analyze();
    expect(results.violations.length).toBe(0);
  }, 30000);
});