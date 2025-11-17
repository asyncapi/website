import BasePage from './BasePageTools';

class ToolsPage extends BasePage {
  visitToolsPage() {
    super.visit('/tools');
  }

  verifyPageLoaded() {
    cy.contains('h1', 'Tools').should('be.visible');
  }

  verifyHeader() {
    this.verifyPageLoaded();
  }

  verifyToolLink(href, heading, linkType) {
    const linkTexts = {
      website: 'Visit Website',
      github: 'View Github',
      docs: 'Visit Docs',
    };

    this.getLink(href, linkTexts[linkType])
      .parents('.rounded-lg.border.shadow-md')
      .first()
      .within(() => {
        cy.get('h2').should('contain', heading);
      });
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
