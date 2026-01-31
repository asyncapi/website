class CommunityPage {
  verifyPageLoaded() {
    cy.contains('h1', 'Home of #CommunityOps').should('be.visible');
  }

  verifyHeader() {
    this.verifyPageLoaded();
  }
}
export default CommunityPage;
