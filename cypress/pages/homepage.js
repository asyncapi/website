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
}

export default HomePage;
