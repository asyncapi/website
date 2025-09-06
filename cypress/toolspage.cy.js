import HomePage from './pages/homepage';
import toolsData from '../config/tools-automated.json';

describe('Tools Page E2E Tests', () => {
  let homePage;
  let toolsPage;

  beforeEach(() => {
    homePage = new HomePage();
    homePage.visit();
    toolsPage = homePage.goToToolsPage();
  });

  Object.entries(toolsData).forEach(([sectionName, linksData]) => {
    describe(`${sectionName} section`, () => {
      it('verifies Website links', () => {
        (linksData.WebsiteLinks || []).forEach((link) => {
          toolsPage.verifyWebsiteLinks(link.href, link.heading);
        });
      });

      it('verifies GitHub links', () => {
        (linksData.GithubLinks || []).forEach((link) => {
          toolsPage.verifyGithubLinks(link.href, link.heading);
        });
      });

      it('verifies Docs links', () => {
        (linksData.DocsLinks || []).forEach((link) => {
          toolsPage.verifyDocsLinks(link.href, link.heading);
        });
      });
    });
  });
});
