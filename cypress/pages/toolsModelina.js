class ToolsModelinaPage {
  visit() {
    cy.visit('/tools/modelina');
  }

  verifyHeadingExists(text) {
    cy.contains('h1, h2, h3, h4, h5, h6', text).should('be.visible');
  }

  verifyHeader() {
    this.verifyHeadingExists('Modelina');
  }

  verifyGithubLink() {
    cy.contains('a', 'View on Github')
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.github.com/asyncapi/modelina');
  }

  verifyTryItNowLink() {
    cy.contains('a', 'Try it now')
      .should('be.visible')
      .and('have.attr', 'href', 'https://modelina.org/playground');
  }

  verifyInstallSnippet() {
    cy.contains('code', 'npm install @asyncapi/modelina').should('exist');
  }
}

export default ToolsModelinaPage;
