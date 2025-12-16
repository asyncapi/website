import ToolsGenerator from './pages/toolsGenerator';

describe('Tools - Generator Page', () => {
  const page = new ToolsGenerator();

  beforeEach(() => {
    page.visit();
  });

  it('User sees the main header', () => {
    page.verifyHeader();
  });

  it('User sees the generator diagram image', () => {
    page.verifyMainImage();
  });

  it('User verifies GitHub button link', () => {
    page.verifyGithubLink();
  });

  it('User verifies Docs button link', () => {
    page.verifyDocsLink();
  });
});
