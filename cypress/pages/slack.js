class SlackPage {
  visitSlack() {
    cy.visit(
      'https://asyncapi.slack.com/join/shared_invite/zt-3clk6rmc0-Cujl2fChHYnHDUwFKRlQCw#/shared-invite/email',
    );
  }

  waitForPageLoad() {
    cy.get('body', { timeout: 10000 }).should(($body) => {
      const hasInactiveMessage =
        $body.find('.p-refreshed_page__heading').length > 0;
      const hasLoginButton =
        $body.find('[data-qa="base_google_login_button"]').length > 0;
      expect(hasInactiveMessage || hasLoginButton).to.be.true;
    });
  }

  checkLinkStatus(callback) {
    cy.get('body').then(($body) => {
      const isInactive =
        $body.find('.p-refreshed_page__heading').length > 0 &&
        $body.text().includes('This link is no longer active');
      callback(isInactive);
    });
  }

  verifyInactiveLinkMessage() {
    cy.get('.p-refreshed_page__heading')
      .should('be.visible')
      .and('have.text', 'This link is no longer active');
  }

  verifyAllLoginMethods() {
    this.verifyGoogleLoginButton();
    this.verifyAppleLoginButton();
    this.verifyContinueWithEmail();
  }

  verifyAllFooterLinks() {
    this.verifyPrivacyAndTerms();
    this.verifyContactUs();
    this.verifyChangeRegion();
  }

  verifyGoogleLoginButton() {
    cy.get('[data-qa="base_google_login_button"]')
      .should('be.visible')
      .and('have.id', 'google_login_button')
      .and('have.attr', 'type', 'button');
  }

  verifyAppleLoginButton() {
    cy.get('[data-qa="base_apple_login_button"]')
      .should('be.visible')
      .and('have.id', 'apple_login_button')
      .and('have.attr', 'href')
      .and('include', 'slack.com/shared-invite/oauth/apple/start');
  }

  verifyContinueWithEmail() {
    cy.get('[data-qa="join_with_email"]')
      .should('be.visible')
      .and('have.attr', 'type', 'button');
  }

  verifyPrivacyAndTerms() {
    cy.get('[href="/legal"]')
      .should('be.visible')
      .and('have.attr', 'href', '/legal');
  }

  verifyContactUs() {
    cy.get('[href="/help/requests/new"]')
      .should('be.visible')
      .and('have.attr', 'href', '/help/requests/new');
  }

  verifyChangeRegion() {
    cy.get('a[href="#"]')
      .should('be.visible')
      .and('contain.text', 'Change region');
  }
}

export default SlackPage;