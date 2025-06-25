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

describe('Concepts section', () => {
  it('User navigates to different subsections of the "Concepts" section', () => {
    docsPage.goToConceptsSection();
    docsPage.goToTutorialsSection();
    docsPage.goToToolsSection();

    cy.get('@subsections').then((subsections) => {
      subsections.forEach((subsection) => {
        docsPage.verifyConceptSubsection(subsection);
      });
    });
  });
});
