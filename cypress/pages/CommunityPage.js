class CommunityPage {
  verifyPageLoaded() {
    cy.contains('h1','Home of #CommunityOps')
  }
}
export default CommunityPage;