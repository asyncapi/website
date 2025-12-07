import HomePage from './pages/homepage';
import DocsPage from './pages/DocsPage';

let homePage;
let docsPage;

beforeEach(() => {
  homePage = new HomePage();
  homePage.visit();
  docsPage = homePage.goToDocsPage();
  cy.fixture('docsSections').as('subsections');
});

describe('Docs Page Tests', () => {
  it('User navigates SideBar containing various sections', () => {
    docsPage.goToConceptsSection();

    cy.get('@subsections').then((subsections) => {
      subsections.forEach((subsection) => {
        docsPage.verifyConceptSubsection(subsection);
      });
    });

    docsPage.goToConceptsSection();
    docsPage.goToTutorialsSection();
    docsPage.goToToolsSection();
    docsPage.goToGuidesSection();
    docsPage.goToReferenceSection();
    docsPage.goToMigrationsSection();
    docsPage.goToCommunitySection();

    it('User verifies Card Links present on the Docs Page', () => {
      const cards = [
        { href: '/docs/concepts' },
        { href: '/docs/tutorials' },
        { href: '/docs/guides' },
        { href: '/docs/tools' },
        { href: '/docs/reference' },
        { href: '/docs/migration' },
        { href: '/docs/community' },
        { href: '/docs/reference/specification/v3.0.0-explorer' },
      ];

      cards.forEach((card) => {
        docsPage.verifyCardLinks(card.href);
      });
    });
  });
});
