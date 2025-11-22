class ToolsGeneratorPage {
  visit() {
    cy.visit('/tools/generator');
  }

  verifyHeadingExists(text) {
    cy.contains('h1, h2, h3, h4, h5, h6', text).should('be.visible');
  }

  verifyHeader() {
    this.verifyHeadingExists('Docs, Code, Anything!');
  }

  verifyMainImage() {
    cy.get('img[alt="generator diagram"]').should('be.visible');
  }

  verifyGithubLink() {
    cy.contains('a', 'View on Github')
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.github.com/asyncapi/generator');
  }

  verifyDocsLink() {
    cy.contains('a', 'View Docs')
      .should('be.visible')
      .and('have.attr', 'href', '/docs/tools/generator');
  }
}

export default ToolsGeneratorPage;
