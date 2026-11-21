import BasePage from './BasePage';
import toolsData from '../fixtures/toolsPages.json';

class ToolsGenerator extends BasePage {
  verifyGeneratorWorkflowDiagram() {
    return cy.get(toolsData.generator.diagram).should('be.visible');
  }
}

export default ToolsGenerator;