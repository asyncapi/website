class DocsPage {
  visitDocsPage() {
    cy.get('[data-testid="NavItem-Link"][href="/docs"]').click();
  }

  goToConceptsSection() {
    cy.get('a[href="/docs/concepts"] span').contains('Concepts').click();
    cy.get('#concepts').should('be.visible'); //Fixes a flaky test
  }

  goToTutorialsSection() {
    cy.get('a[href="/docs/tutorials"] span').contains('Tutorials').click();
  }

  goToToolsSection() {
    cy.get('a[href="/docs/tools"] span').contains('Tools').click();
  }

  verifyConceptSubsection({ href, label, heading }) {
    cy.get(`a[href="${href}"] span`).contains(label).click();
    cy.get('h1').should('contain.text', heading);
  }
}

export default DocsPage;
