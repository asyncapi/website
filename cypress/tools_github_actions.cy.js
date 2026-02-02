import BasePage from './pages/BasePage';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - GitHub Actions', () => {
  const page = new BasePage();

  beforeEach(() => {
    page.visit(toolsData.githubActions.path);
  });

  it('Verifying if the GitHub Actions header is visible', () => {
    page.verifyHeadingExists(toolsData.githubActions.heading);
  });

  it('Verifying if GitHub Actions GitHub link works', () => {
    page.verifyButtonLink(toolsData.githubActions.github, 'View on Github');
  });
});
