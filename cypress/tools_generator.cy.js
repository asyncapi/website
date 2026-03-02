import toolsGenerator from './pages/toolsGenerator';
import toolsData from './data/toolsPages.json';

describe('Tools - Generator Page', () => {
  const page = new toolsGenerator();

  beforeEach(() => {
    page.visit(toolsData.generator.path);
  });

  it('Verifying if the main header is visible', () => {
    page.verifyHeadingExists(toolsData.generator.heading);
  });

  it('Verifying if the generator diagram image is visible', () => {
    page.verifyGeneratorWorkflowDiagram();
  });

  it('Verifying if GitHub button link works', () => {
    page.verifyButtonLink(toolsData.generator.github, 'View on Github');
  });

  it('Verifying if Docs button link works', () => {
    page.verifyButtonLink(toolsData.generator.docs, 'View Docs');
  });
});
