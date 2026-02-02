import ToolsModelina from './pages/toolsModelina';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - Modelina Page', () => {
  const page = new ToolsModelina();

  beforeEach(() => {
    page.visit(toolsData.modelina.path);
  });

  it('Verifying the main header and intro', () => {
    page.verifyHeadingExists(toolsData.modelina.heading);
  });

  it('Verifying install snippet', () => {
    page.verifyInstallSnippet();
  });

  it('Verifying the GitHub button link', () => {
    page.verifyButtonLink(toolsData.modelina.github, 'View on Github');
  });

  it('Verifying the Try it now link', () => {
    page.verifyTryItNowLink();
  });
});
