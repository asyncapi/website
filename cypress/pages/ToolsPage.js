class ToolsPage {
  verifyPageLoaded() {
    cy.contains('h1', 'Tools').should('be.visible');
  }

  verifyHeader() {
    this.verifyPageLoaded();
  }
}
export default ToolsPage;
