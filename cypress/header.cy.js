
import Header from './pages/header';

describe('Header Links Validation', () => {
  const header = new Header();

  beforeEach(() => {
    header.visit(); 
  });

  it('Verifying if user hovers over Docs dropdown and sees the dropdown', () => {
    header.verifyDocsDropdown();
  });

  it('Verifying if user hovers over Tools dropdown and sees the dropdown', () => {
    header.verifyToolsDropdown();
  });

  it('Verifying if user hovers over Community dropdown and sees the dropdown', () => {
    header.verifyCommunityDropdown();
  });
});
