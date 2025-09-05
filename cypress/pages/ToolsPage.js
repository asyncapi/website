class ToolsPage {
  verifyPageLoaded() {
    cy.contains('h1', 'Tools').should('be.visible');
  }
}
export default ToolsPage;
