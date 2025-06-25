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
    describe(` ${sectionName} section`, () => {
      it('User verifies card Links', () => {
        const websiteLinks = linksData.WebsiteLinks || [];
        const githubLinks = linksData.GithubLinks || [];
        const docsLinks = linksData.DocsLinks || [];

        websiteLinks.forEach((link) => {
          toolsPage.verifyWebsiteLinks(link.href, link.heading);
        });

        githubLinks.forEach((link) => {
          toolsPage.verifyGithubLinks(link.href, link.heading);
        });

        docsLinks.forEach((link) => {
          toolsPage.verifyDocsLinks(link.href, link.heading);
        });
      });
    });
  });
});
