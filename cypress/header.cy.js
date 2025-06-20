import Header from './pages/Header';

describe('Header Links Validation', () => {
  const header = new Header();

  beforeEach(() => {
    header.visit();
  });

  it('User hovers over Docs dropdown and sees all required sections', () => {
    header.verifyDocsDropdown();
  });

  it('User hovers over Tools dropdown and sees all required sections', () => {
    header.verifyToolsDropdown();
  });

  it('User hovers over Community dropdown and sees all required sections', () => {
    header.verifyCommunityDropdown();
  });
});
