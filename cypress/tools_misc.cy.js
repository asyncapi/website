import ToolsMisc from './pages/toolsMisc';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - CLI / Parsers / GitHub Actions', () => {
  const page = new ToolsMisc();

  describe('CLI', () => {
    beforeEach(() => {
      page.visit(toolsData.cli.path);
    });

    it('User sees the CLI header', () => {
      page.verifyHeadingExists(toolsData.cli.heading);
    });

    it('User verifies CLI GitHub and Docs links', () => {
      page.verifyGithubLink(toolsData.cli.github);
      page.verifyDocsLink(toolsData.cli.docs);
    });

    it('User sees CLI install snippet', () => {
      page.verifyCodeSnippet(toolsData.cli.install);
    });
  });

  describe('Parsers', () => {
    beforeEach(() => {
      page.visit(toolsData.parsers.path);
    });

    it('User sees the Parsers header', () => {
      page.verifyHeadingExists(toolsData.parsers.heading);
    });

    it('User verifies Parsers GitHub link', () => {
      page.verifyGithubLink(toolsData.parsers.github);
    });

    it('User sees Parsers install snippet', () => {
      page.verifyCodeSnippet(toolsData.parsers.install);
    });
  });

  describe('GitHub Actions', () => {
    beforeEach(() => {
      page.visit(toolsData.githubActions.path);
    });

    it('User sees the GitHub Actions header', () => {
      page.verifyHeadingExists(toolsData.githubActions.heading);
    });

    it('User verifies GitHub Actions GitHub link', () => {
      page.verifyGithubLink(toolsData.githubActions.github);
    });
  });
});
