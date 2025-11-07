class RoadmapPage {
  visit() {
    cy.visit('/roadmap');
  }

  verifyPageLoaded() {
    cy.contains(
      'h1',
      'AsyncAPI becomes the #1 API specification for defining and developing APIs.',
    ).should('be.visible');
  }

  verifyHeader() {
    this.verifyPageLoaded();
  }

  verifyLink() {
    cy.get('[data-testid="TextLink-href"]').should(
      'have.attr',
      'href',
      'https://github.com/asyncapi/community',
    );
  }

  verifyTooltip(index) {
    cy.get('[data-testid="InlineHelp-icon"]').eq(index).trigger('mouseover');
    cy.get('[data-testid="InlineHelp"]').should('be.visible');
  }
}

export default RoadmapPage;
