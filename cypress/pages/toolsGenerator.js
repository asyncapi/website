import BaseToolsPage from './BaseToolsPage';

class toolsGenerator extends BaseToolsPage {
  visit() {
    return super.visit('/tools/generator');
  }

  verifyDiagramImage() {
    return cy.get('img[alt="generator diagram"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .should('not.be.empty');
  }

  verifyGithubLink() {
    return super.verifyGithubLink('https://www.github.com/asyncapi/generator');
  }

  verifyDocsLink() {
    return super.verifyDocsLink('/docs/tools/generator');
  }
}

export default toolsGenerator;
