class SlackPage {
  visitSlack() {
    cy.visit(
      'https://asyncapi.slack.com/join/shared_invite/zt-3clk6rmc0-Cujl2fChHYnHDUwFKRlQCw#/shared-invite/email',
    );
  }

  isLinkInactive() {
    return cy.get('body').then(($body) => {
      return $body.find('.p-refreshed_page__heading').length > 0;
    });
  }

  verifyInactiveLinkMessage() {
    cy.get('.p-refreshed_page__heading')
      .should('be.visible')
      .and('have.text', 'This link is no longer active');
  }

  verifyGoogleLoginButton() {
    cy.get('[data-qa="base_google_login_button"]')
      .should('have.id', 'google_login_button')
      .and('have.attr', 'type', 'button');
  }

  verifyAppleLoginButton() {
    cy.get('[data-qa="base_apple_login_button"]')
      .should('have.id', 'apple_login_button')
      .and('have.attr', 'href')
      .and('include', 'slack.com/shared-invite/oauth/apple/start');
  }

  verifyContinueWithEmail() {
    cy.get('[data-qa="join_with_email"]').should('have.attr', 'type', 'button');
  }

  verifyPrivacyAndTerms() {
    cy.get('[href="/legal"]').should('have.attr', 'href', '/legal');
  }
  verifyContactUs() {
    cy.get('[href="/help/requests/new"]').should(
      'have.attr',
      'href',
      '/help/requests/new',
    );
  }
  verifyChangeRegion() {
    cy.get('a[href="#"]')
      .should('be.visible')
      .and('contain.text', 'Change region');
  }
}

export default SlackPage;
