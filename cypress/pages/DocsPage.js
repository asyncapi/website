class DocsPage {
  visit() {
    cy.visit('/docs');
    // Clicking outside to remove focus (fixing hover issue)
    cy.contains('On this pageWelcome to').click();
  }
}


export default DocsPage;