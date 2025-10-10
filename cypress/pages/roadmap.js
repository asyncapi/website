class RoadmapPage {
  visit() {
    cy.visit('/roadmap');
  }

  verifyHeader() {
    cy.contains('h1, h2, h3, h4, h5, h6', 'Roadmap').should('be.visible');
  }

  verifyLink() {
    cy.get('[data-testid="TextLink-href"]')
      .should('have.attr', 'href', 'https://github.com/asyncapi/community');
  }

  verifyTooltip(index){
    cy.get('[data-testid="InlineHelp-icon"]')
    .eq(index)
    .trigger('mouseover');
    cy.get('[data-testid="InlineHelp"]')
    .should('be.visible')
  }
}

export default RoadmapPage;
