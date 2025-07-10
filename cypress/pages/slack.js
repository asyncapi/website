class SlackPage {

  visitSlack(){
    cy.visit('https://asyncapi.slack.com/join/shared_invite/zt-33bsaqqgz-ZL0a3ZUiuy4stSbXB~~E9A#/shared-invite/email');
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
    cy.get('[data-qa="join_with_email"]')
      .should('have.attr', 'type', 'button');
  }

  verifyPrivacyAndTerms() {
    cy.get('[href="/legal"]')
      .should('have.attr', 'href', '/legal');
  }
  verifyContactUs(){
    cy.get('[href="/help/requests/new"]')
      .should('have.attr', 'href', '/help/requests/new');
  }
  verifyChangeRegion(label){
    cy.get('a[href="#"]').contains('Change region');
  }
}

export default SlackPage;
