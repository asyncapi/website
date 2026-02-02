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
          toolsPage.verifyToolLink(link.href, link.heading, 'website');
        });
      });

      it('verifies GitHub links', () => {
        (linksData.GithubLinks || []).forEach((link) => {
          toolsPage.verifyToolLink(link.href, link.heading, 'github');
        });
      });

      it('verifies Docs links', () => {
        (linksData.DocsLinks || []).forEach((link) => {
          toolsPage.verifyToolLink(link.href, link.heading, 'docs');
        });
      });
    });
  });
});
