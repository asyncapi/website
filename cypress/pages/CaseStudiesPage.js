class CaseStudiesPage {
  verifyPageLoaded() {
    cy.contains('h1', 'Case Studies').should('be.visible');
  }
}
export default CaseStudiesPage;
