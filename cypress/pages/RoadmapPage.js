import BasePage from './BasePage';

class RoadmapPage extends BasePage {
  visit() {
    super.visit('/roadmap');
  }

  verifyPageLoaded() {
    super.verifyHeadingExists('AsyncAPI becomes the #1 API specification for defining and developing APIs.');
  }

  verifyCommunityLink() {
    super.verifyElementHasAttribute(
      '[data-testid="TextLink-href"]',
      'href',
      'https://github.com/asyncapi/community'
    );
  }

  verifyTooltip(index) {
    cy.get('[data-testid="InlineHelp-icon"]').eq(index).trigger('mouseover');
    cy.get('[data-testid="InlineHelp"]').first().should('be.visible');
  }
}

export default RoadmapPage;
