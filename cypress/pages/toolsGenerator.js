import BasePage from './BasePage';

class ToolsGenerator extends BasePage {

  verifyGeneratorWorkflowDiagram() {
    return cy.get('img[alt="generator diagram"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .should('not.be.empty');
  }

}

export default ToolsGenerator;