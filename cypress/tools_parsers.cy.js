import BasePage from './pages/BasePage';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - Parsers', () => {
  const page = new BasePage();

  beforeEach(() => {
    page.visit(toolsData.parsers.path);
  });

  it('Verifying if the Parsers header is visible', () => {
    page.verifyHeadingExists(toolsData.parsers.heading);
  });

  it('Verifying if Parsers GitHub link works', () => {
    page.verifyButtonLink(toolsData.parsers.github, 'View on Github');
  });

  it('Verifying if Parsers install snippet is visible', () => {
    page.verifyElementContainsText('code', toolsData.parsers.install);
  });
});
