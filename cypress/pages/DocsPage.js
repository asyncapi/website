class DocsPage {
  verifyPageLoaded() {
    cy.url().should('include', '/docs');
    cy.get('article').should('be.visible'); 
  }
}
export default DocsPage;
