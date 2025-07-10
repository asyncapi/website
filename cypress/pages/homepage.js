import ToolsPage from './ToolsPage';
import DocsPage from './DocsPage';

class HomePage {
  visit() {
    cy.visit('/');
  }
  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyHeadingExists(headingText) {
    cy.contains('h1, h2, h3, h4, h5, h6', headingText).should('be.visible');
  }

  verifyNavbarLogo() {
    this.verifyElementIsVisible('[data-testid="Navbar-logo"]');
  }

  verifyHeader() {
    this.verifyHeadingExists(
      'Building the future of Event-Driven Architectures (EDA)',
    );
  }

  goToToolsPage() {
    cy.get('[data-testid="Navbar-main"]').contains('Tools').click();
    return new ToolsPage();
  }

  goToDocsPage() {
    cy.get('[data-testid="Navbar-main"]').contains('Docs').click();
    return new DocsPage();
  }

  goToTSCPage(){
    cy.visit('/community/tsc')
  }
}

export default HomePage;
