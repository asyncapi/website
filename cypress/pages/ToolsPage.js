class ToolsPage {
  visitToolsPage() {
    cy.visit('/tools');
  }

  verifyWebsiteLinks(href, heading) {
    cy.get(`a[href="${href}"]`).contains('Visit Website');

    cy.get('h2').should('contain.text', heading);
  }

  verifyGithubLinks(href, heading) {
    cy.get(`a[href="${href}"]`).contains('View Github');

    cy.get('h2').should('contain.text', heading);
  }

  verifyDocsLinks(href, heading) {
    cy.get(`a[href="${href}"]`).contains('Visit Docs');

    cy.get('h2').should('contain.text', heading);
  }
}

export default ToolsPage;
