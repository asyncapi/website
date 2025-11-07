class CommunityPage {
  verifyPageLoaded() {
    cy.contains('h1','Home of #CommunityOps')
    .should('be.visible');
  }
}
export default CommunityPage;