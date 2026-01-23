import ToolsMisc from './pages/toolsMisc';
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
      page.verifyGithubLink(toolsData.cli.github);
      page.verifyDocsLink(toolsData.cli.docs);
    });

    it('Verifying if CLI install snippet is visible', () => {
      page.verifyCodeSnippet(toolsData.cli.install);
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
      page.verifyGithubLink(toolsData.parsers.github);
    });

    it('Verifying if Parsers install snippet is visible', () => {
      page.verifyCodeSnippet(toolsData.parsers.install);
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
      page.verifyGithubLink(toolsData.githubActions.github);
    });
  });
});
