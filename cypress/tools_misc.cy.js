import ToolsMisc from './pages/BasePage';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - CLI / Parsers / GitHub Actions', () => {
  const page = new ToolsMisc();

  describe('CLI', () => {
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

  describe('Parsers', () => {
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

  describe('GitHub Actions', () => {
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
});
