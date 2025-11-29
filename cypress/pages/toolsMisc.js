class ToolsMiscPage {
  visitCli() {
    cy.visit('/tools/cli');
  }

  visitParsers() {
    cy.visit('/tools/parsers');
  }

  visitGithubActions() {
    cy.visit('/tools/github-actions');
  }

  verifyHeadingExists(text) {
    cy.contains('h1, h2, h3, h4, h5, h6', text).should('be.visible');
  }

  // CLI page checks
  verifyCliHeader() {
    this.verifyHeadingExists(
      'Interact with AsyncAPI from the comfort of your CLI',
    );
  }

  verifyCliGithubLink() {
    cy.contains('a', 'View on Github')
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.github.com/asyncapi/cli');
  }

  verifyCliDocsLink() {
    cy.contains('a', 'View Docs')
      .should('be.visible')
      .and('have.attr', 'href', '/docs/tools/cli');
  }

  verifyCliInstallSnippet() {
    cy.contains('code', 'npm install -g @asyncapi/cli').should('exist');
  }

  // Parsers page checks
  verifyParsersHeader() {
    this.verifyHeadingExists('Build your own tools');
  }

  verifyParsersGithubLink() {
    cy.contains('a', 'View on Github')
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.github.com/asyncapi/parser-js');
  }

  verifyParsersInstallSnippet() {
    cy.contains('code', 'npm install @asyncapi/parser').should('exist');
  }

  // GitHub Actions page checks
  verifyGhActionsHeader() {
    this.verifyHeadingExists('Automate using GitHub Actions');
  }

  verifyGhActionsGithubLink() {
    cy.contains('a', 'View on Github')
      .should('be.visible')
      .and(
        'have.attr',
        'href',
        'https://www.github.com/asyncapi/github-action-for-generator',
      );
  }
}

export default ToolsMiscPage;
