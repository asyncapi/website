import toolsMisc from './pages/toolsMisc';

describe('Tools - CLI / Parsers / GitHub Actions', () => {
  const page = new toolsMisc();

  describe('CLI', () => {
    beforeEach(() => {
      page.visit('/tools/cli');
    });

    it('User sees the CLI header', () => {
      page.verifyHeadingExists('Interact with AsyncAPI from the comfort of your CLI');
    });

    it('User verifies CLI GitHub and Docs links', () => {
      page.verifyGithubLink('https://www.github.com/asyncapi/cli');
      page.verifyDocsLink('/docs/tools/cli');
    });

    it('User sees CLI install snippet', () => {
      page.verifyCliInstallSnippet();
    });
  });

  describe('Parsers', () => {
    beforeEach(() => {
      page.visit('/tools/parsers');
    });

    it('User sees the Parsers header', () => {
      page.verifyHeadingExists('Build your own tools');
    });

    it('User verifies Parsers GitHub link', () => {
      page.verifyGithubLink('https://www.github.com/asyncapi/parser-js');
    });

    it('User sees Parsers install snippet', () => {
      page.verifyParsersInstallSnippet();
    });
  });

  describe('GitHub Actions', () => {
    beforeEach(() => {
      page.visit('/tools/github-actions');
    });

    it('User sees the GitHub Actions header', () => {
      page.verifyHeadingExists('Automate using GitHub Actions');
    });

    it('User verifies GitHub Actions GitHub link', () => {
      page.verifyGithubLink('https://www.github.com/asyncapi/github-action-for-generator');
    });
  });
});
