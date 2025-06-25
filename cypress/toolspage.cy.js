import HomePage from './pages/homepage';
import toolsData from './fixtures/toolsData.json';

describe('Tools Page Link Verification', () => {
  let homePage;
  let toolsPage;

  beforeEach(() => {
    homePage = new HomePage();
    homePage.visit();
    toolsPage = homePage.goToToolsPage();
  });

  Object.entries(toolsData).forEach(([sectionName, linksData]) => {
    describe(`${sectionName} section`, () => {
    it('verifies website links', () => {
        const websiteLinks = linksData.WebsiteLinks || [];
        websiteLinks.forEach((link) => {
          toolsPage.verifyWebsiteLinks(link.href, link.heading);
        });
      });

      it('verifies GitHub links', () => {
        const githubLinks = linksData.GithubLinks || [];
        githubLinks.forEach((link) => {
          toolsPage.verifyGithubLinks(link.href, link.heading);
        });
      });

      it('verifies documentation links', () => {
        const docsLinks = linksData.DocsLinks || [];
        docsLinks.forEach((link) => {
          toolsPage.verifyDocsLinks(link.href, link.heading);
        });
      });
    });
  });
});
