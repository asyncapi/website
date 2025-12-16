import ToolsModelina from './pages/toolsModelina';

describe('Tools - Modelina Page', () => {
  const page = new ToolsModelina();

  beforeEach(() => {
    page.visit();
  });

  it('User sees the main header and intro', () => {
    page.verifyHeader();
  });

  it('User sees install snippet', () => {
    page.verifyInstallSnippet();
  });

  it('User verifies GitHub button link', () => {
    page.verifyGithubLink();
  });

  it('User verifies Try it now link', () => {
    page.verifyTryItNowLink();
  });
});
