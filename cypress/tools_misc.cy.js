import ToolsMiscPage from './pages/toolsMisc';

describe('Tools - CLI / Parsers / GitHub Actions', () => {
  const page = new ToolsMiscPage();

  describe('CLI', () => {
    beforeEach(() => {
      page.visitCli();
    });

    it('User sees the CLI header', () => {
      page.verifyCliHeader();
    });

    it('User verifies CLI GitHub and Docs links', () => {
      page.verifyCliGithubLink();
      page.verifyCliDocsLink();
    });

    it('User sees CLI install snippet', () => {
      page.verifyCliInstallSnippet();
    });
  });

  describe('Parsers', () => {
    beforeEach(() => {
      page.visitParsers();
    });

    it('User sees the Parsers header', () => {
      page.verifyParsersHeader();
    });

    it('User verifies Parsers GitHub link', () => {
      page.verifyParsersGithubLink();
    });

    it('User sees Parsers install snippet', () => {
      page.verifyParsersInstallSnippet();
    });
  });

  describe('GitHub Actions', () => {
    beforeEach(() => {
      page.visitGithubActions();
    });

    it('User sees the GitHub Actions header', () => {
      page.verifyGhActionsHeader();
    });

    it('User verifies GitHub Actions GitHub link', () => {
      page.verifyGhActionsGithubLink();
    });
  });
});
