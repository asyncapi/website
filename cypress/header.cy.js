
import Header from './pages/header';

describe('Header Links Validation', () => {
  const header = new Header();

  beforeEach(() => {
    header.visit(); 
  });

  it('User hovers over Docs dropdown and sees the dropdown', () => {
    header.verifyDocsDropdown();
  });

  it('User hovers over Tools dropdown and sees the dropdown', () => {
    header.verifyToolsDropdown();
  });

  it('User hovers over Community dropdown and sees the dropdown', () => {
    header.verifyCommunityDropdown();
  });
});
