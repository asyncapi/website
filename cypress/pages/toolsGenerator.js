import BasePage from './BasePage';
import toolsData from '../fixtures/toolsPages.json';

class ToolsGenerator extends BasePage {
  verifyGeneratorWorkflowDiagram() {
    return this.verifyImageVisible(toolsData.generator.image);
  }
}

export default ToolsGenerator;