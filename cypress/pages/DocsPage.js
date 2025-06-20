class DocsPage {
  visit() {
    cy.visit('/docs');
    // Clicking outside to remove focus (fixing hover issue)
    cy.get('body').click(0, 0);
  }
}


export default DocsPage;
