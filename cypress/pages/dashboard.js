import BasePage from './BasePageTools';

class DashboardPage extends BasePage {
  visit() {
    super.visit('/community/dashboard');
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

  verifyHeaderLinks() {
    cy.contains('[data-testid="Button-link"]', 'Contribution Guide')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'docs/community/010-contribution-guidelines');

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
