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
      const linkTypes = [
        { name: 'Website', links: linksData.WebsiteLinks, verifyFn: (link) => toolsPage.verifyWebsiteLinks(link.href, link.heading) },
        { name: 'GitHub', links: linksData.GithubLinks, verifyFn: (link) => toolsPage.verifyGithubLinks(link.href, link.heading) },
        { name: 'Docs', links: linksData.DocsLinks, verifyFn: (link) => toolsPage.verifyDocsLinks(link.href, link.heading) }
      ];

      linkTypes.forEach(({ name, links, verifyFn }) => {
        it(`verifies ${name} links`, () => {
          (links || []).forEach(verifyFn);
        });
      });
    });
  });
});
