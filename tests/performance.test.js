const puppeteer = require('puppeteer');

describe('Performance Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Homepage performance', async () => {
    await page.goto('http://localhost:3000');
    const metrics = await page.metrics();
    expect(metrics.LayoutDuration).toBeLessThan(1000);
    expect(metrics.RecalcStyleDuration).toBeLessThan(500);
  }, 30000);
});