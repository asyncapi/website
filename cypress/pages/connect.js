import BasePage from './BasePage';

class ConnectPage extends BasePage {
  visit() {
    return super.visit('/connect');
  }

  verifyPageLoaded() {
    this.verifyElementIsVisible('[data-testid="ConnectPage-main"]');
    this.verifyHeadingExists('Get in Touch');
  }

  verifyConnectLink({ label, url }) {
    cy.get(`[data-testid="ConnectCard-${label}"]`)
      .should('be.visible')
      .and('have.attr', 'href', url);
  }
}

export default ConnectPage;
