import toolsGenerator from './pages/toolsGenerator';

describe('Tools - Generator Page', () => {
  const page = new toolsGenerator();

  beforeEach(() => {
    page.visit();
  });

  it('User sees the main header', () => {
    page.verifyHeadingExists('Docs, Code, Anything!');
  });

  it('User sees the generator diagram image', () => {
    page.verifyDiagramImage();
  });

  it('User verifies GitHub button link', () => {
    page.verifyGithubLink();
  });

  it('User verifies Docs button link', () => {
    page.verifyDocsLink();
  });
});
