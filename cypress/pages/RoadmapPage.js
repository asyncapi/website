import BasePage from './BasePage';

class RoadmapPage extends BasePage {
  verifyPageLoaded() {
    this.verifyHeadingExists('AsyncAPI becomes the #1 API specification for defining and developing APIs.');
  }

  verifyCommunityLink() {
    this.verifyElementHasAttribute(
      '[data-testid="TextLink-href"]',
      'href',
      'https://github.com/asyncapi/community'
    );
  }

  verifyTooltip(index) {
    cy.get('[data-testid="InlineHelp-icon"]').eq(index).trigger('mouseover');
    cy.get('[data-testid="InlineHelp"]').should('be.visible');
  }
}

export default RoadmapPage;
