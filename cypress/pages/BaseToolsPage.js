class BaseToolsPage {
  visit(path) {
    cy.visit(path);
    return this;
  }

  verifyHeadingExists(text) {
    return cy.contains('h1, h2, h3, h4, h5, h6', text).should('be.visible');
  }

  verifyGithubLink(href) {
    return cy.contains('a', 'View on Github')
      .should('be.visible')
      .and('have.attr', 'href', href);
  }

  verifyDocsLink(href) {
    return cy.contains('a', 'View Docs')
      .should('be.visible')
      .and('have.attr', 'href', href);
  }

  verifyCodeSnippet(text) {
    return cy.contains('code', text).should('exist');
  }

  verifyImageVisible(altText) {
    return cy.get(`img[alt="${altText}"]`).should('be.visible');
  }

  verifyCustomLink(text, href) {
    return cy.contains('a', text)
      .should('be.visible')
      .and('have.attr', 'href', href);
  }
}

export default BaseToolsPage;
