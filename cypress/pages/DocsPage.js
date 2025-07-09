class DocsPage {
  visitDocsPage() {
    cy.get('[data-testid="NavItem-Link"][href="/docs"]').click();
  }

  verifyCardLinks(href){
    cy.get(`[href="${href}"]`)
    .find('[data-testid="Docs-div-contents"]')
    .find('[data-testid="Paragraph-test"]')
    .should('exist');
  }
  
  verifyConceptSection(){
    cy.get(`a[href="/docs/concepts"] span`).contains('Concepts').click();
  }
  navigateToSection(section,href){
    cy.get(`a[href="${href}"] span`).contains(section).click();
  }
  goToConceptsSection(){
    this.navigateToSection('Concepts',"/docs/concepts")
  }

  goToTutorialsSection() {
    this.navigateToSection('Tutorials',"/docs/tutorials")
  }

  goToToolsSection() {
    this.navigateToSection('Tools',"/docs/tools")
  }

  goToGuidesSection() {
    this.navigateToSection('Guides',"/docs/guides")
  }

  goToReferenceSection() {
    this.navigateToSection('Reference',"/docs/reference")
  }

  goToMigrationsSection(){
    this.navigateToSection('Migration',"/docs/migration")
  }

  goToCommunitySection(){
    this.navigateToSection('Community',"/docs/community")
  }

  verifyConceptSubsection({ href, label}) {
    cy.get(`a[href="${href}"]`).contains(label).click();
  }
}

export default DocsPage;
