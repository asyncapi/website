import BasePage from './BasePage';

class CommunityPage extends BasePage {
  verifyPageLoaded() {
    cy.get('[data-testid="orbit-div"]')
      .contains('h1', 'Welcome to the AsyncAPI Community')
      .should('be.visible');
  }
}

export default CommunityPage;