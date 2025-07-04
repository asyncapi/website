class ToolsPage {
  visitToolsPage() {
    cy.visit('/tools');
  }

  verifyToolLink(href, heading, linkType) {
   const linkTexts = {
     website: 'Visit Website',
     github: 'View Github', 
     docs: 'Visit Docs'
    };
   
   cy.get(`a[href="${href}"]`).contains(linkTexts[linkType])
     .closest('[data-testid="tool-card"], .card, article')
     .find('h2').should('contain.text', heading);
 }

 verifyWebsiteLinks(href, heading) {
   this.verifyToolLink(href, heading, 'website');
 }

 verifyGithubLinks(href, heading) {
   this.verifyToolLink(href, heading, 'github');
 }

 verifyDocsLinks(href, heading) {
   this.verifyToolLink(href, heading, 'docs');
 }
}

export default ToolsPage;
