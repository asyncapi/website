import toolsModelina from './pages/toolsModelina';
import toolsData from './fixtures/toolsPages.json';

describe('Tools - Modelina Page', () => {
  const page = new toolsModelina();

  beforeEach(() => {
    page.visit(toolsData.modelina.path);
  });

  it('User sees the main header and intro', () => {
    page.verifyHeadingExists(toolsData.modelina.heading);
  });

  it('User sees install snippet', () => {
    page.verifyCodeSnippet(toolsData.modelina.install);
  });

  it('User verifies GitHub button link', () => {
    page.verifyGithubLink(toolsData.modelina.github);
  });

  it('User verifies Try it now link', () => {
    page.verifyCustomLink(toolsData.modelina.tryIt.text, toolsData.modelina.tryIt.href);
  });
});
