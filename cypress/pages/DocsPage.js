class DocsPage {
  visitDocsPage() {
    cy.get('[data-testid="NavItem-Link"][href="/docs"]').click();
  }

  verifyCardLinks(href){
    cy.get(
      `[href="${href}"] [data-testid="Docs-div-contents"] [data-testid="Paragraph-test"]`
    ).should('have.attr', 'data-testid', 'Paragraph-test');
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

  goToGuidesSection() {
    cy.get('a[href="/docs/guides"] span').contains('Guides').click();
  }

  goToReferenceSection() {
    cy.get('a[href="/docs/reference"] span').contains('Reference').click();
  }

  goToMigrationsSection(){
    cy.get('a[href="/docs/migration"] span').contains('Migrations').click();
  }

  goToCommunitySection(){
    cy.get('a[href="/docs/community"] span').contains('Community').click();
  }

  verifyConceptSubsection({ href, label, heading }) {
    cy.get(`a[href="${href}"] span`).contains(label).click();

    cy.get('h1').should('contain.text', heading);
  }
}

export default DocsPage;
