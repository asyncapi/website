import toolsGenerator from './pages/toolsGenerator';
import toolsData from './fixtures/toolsPages.json';

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
    page.verifyGithubLink(toolsData.generator.github);
  });

  it('Verifying if Docs button link works', () => {
    page.verifyDocsLink(toolsData.generator.docs);
  });
});
