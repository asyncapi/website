class DashboardPage {
  visit() {
    cy.visit('/community/dashboard');
  }

  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyTextVisible(text) {
    cy.contains(text).should('be.visible');
  }

  verifyHeader() {
    this.verifyElementIsVisible('[data-testid="Header-heading"]');
  }

  verifyGoodFirstIssuesSection() {
    this.verifyTextVisible('Good First Issues');
  }

  verifyHotTopicsSection() {
    this.verifyTextVisible('Hot Topics');
  }

  verifyElementHasAttribute(selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value);
  }

  verifyLinkWithText(selector, text, expectedHrefPart) {
    cy.contains(selector, text)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', expectedHrefPart);
  }

  verifyHeaderLinks() {
    this.verifyLinkWithText(
      '[data-testid="Button-link"]',
      'Contribution Guide',
      'github.com/asyncapi',
    );

    cy.contains('[data-testid="Button-link"]', 'Contribution Guide')
      .should('have.attr', 'href')
      .and('include', 'type=source');

    this.verifyLinkWithText(
      '[data-testid="Button-link"]',
      'View on Github',
      'github.com/asyncapi',
    );

    this.verifyLinkWithText(
      '[data-testid="Button-link"]',
      'Join on Slack',
      'slack-invite',
    );
  }
}

export default DashboardPage;
