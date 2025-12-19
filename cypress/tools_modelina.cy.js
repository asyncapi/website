import toolsModelina from './pages/toolsModelina';

describe('Tools - Modelina Page', () => {
  const page = new toolsModelina();

  beforeEach(() => {
    page.visit('/tools/modelina');
  });

  it('User sees the main header and intro', () => {
    page.verifyHeadingExists('Modelina');
  });

  it('User sees install snippet', () => {
    page.verifyInstallSnippet();
  });

  it('User verifies GitHub button link', () => {
    page.verifyGithubLink('https://www.github.com/asyncapi/modelina');
  });

  it('User verifies Try it now link', () => {
    page.verifyTryItNowLink();
  });
});
