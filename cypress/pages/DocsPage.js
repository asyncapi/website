import BasePage from './basepagedocs';

class DocsPage extends BasePage {
  visitDocsPage() {
    this.verifyLinkByHref('/docs');
  }

  verifyCardLinks(href) {
    cy.get(`[href="${href}"]`)
      .find('[data-testid="Docs-div-contents"]')
      .find('[data-testid="Paragraph-test"]')
      .should('exist');
  }

  navigateToSection(section, href) {
    this.verifyLinkByLabel(href, section);
  }
  verifyConceptSection(){
    cy.get(`a[href="/docs/concepts"] span`).contains('Concepts').click();
  }
  goToConceptsSection() {
    this.navigateToSection('Concepts', '/docs/concepts');
  }
  goToTutorialsSection() {
    this.navigateToSection('Tutorials', '/docs/tutorials');
  }
  goToToolsSection() {
    this.navigateToSection('Tools', '/docs/tools');
  }
  goToGuidesSection() {
    this.navigateToSection('Guides', '/docs/guides');
  }
  goToReferenceSection() {
    this.navigateToSection('Reference', '/docs/reference');
  }
  goToMigrationsSection() {
    this.navigateToSection('Migration', '/docs/migration');
  }
  goToCommunitySection() {
    this.navigateToSection('Community', '/docs/community');
  }
  verifyConceptSubsection({ href, label}) {
    this.verifyLinkByLabel(href, label);
  }
}

export default DocsPage;
