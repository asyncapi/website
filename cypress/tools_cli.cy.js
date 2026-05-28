import BasePage from './pages/BasePage';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - CLI', () => {
  const page = new BasePage();

  beforeEach(() => {
    page.visit(toolsData.cli.path);
  });

  it('Verifying if the CLI header is visible', () => {
    page.verifyHeadingExists(toolsData.cli.heading);
  });

  it('Verifying if CLI GitHub and Docs links work', () => {
    page.verifyButtonLink(toolsData.cli.github, 'View on Github');
    page.verifyButtonLink(toolsData.cli.docs, 'View Docs');
  });

  it('Verifying if CLI install snippet is visible', () => {
    page.verifyElementContainsText('code', toolsData.cli.install);
  });
});
