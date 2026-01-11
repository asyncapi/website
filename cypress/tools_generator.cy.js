import toolsGenerator from './pages/toolsGenerator';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - Generator Page', () => {
  const page = new toolsGenerator();

  beforeEach(() => {
    page.visit(toolsData.generator.path);
  });

  it('User sees the main header', () => {
    page.verifyHeadingExists(toolsData.generator.heading);
  });

  it('User sees the generator diagram image', () => {
    page.verifyGeneratorWorkflowDiagram();
  });

  it('User verifies GitHub button link', () => {
    page.verifyGithubLink(toolsData.generator.github);
  });

  it('User verifies Docs button link', () => {
    page.verifyDocsLink(toolsData.generator.docs);
  });
});
