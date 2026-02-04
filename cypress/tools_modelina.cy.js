import ToolsModelina from './pages/toolsModelina';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - Modelina Page', () => {
  const page = new ToolsModelina();

  beforeEach(() => {
    page.visit(toolsData.modelina.path);
  });

  it('should display the main header and intro', () => {
    page.verifyHeadingExists(toolsData.modelina.heading);
  });

  it('should show the install snippet', () => {
    page.verifyInstallSnippet();
  });

  it('should verify the GitHub button link', () => {
    page.verifyButtonLink(toolsData.modelina.github, 'View on Github');
  });

  it('should verify the Try it now link', () => {
    page.verifyTryItNowLink();
  });
});
