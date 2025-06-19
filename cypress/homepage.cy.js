import HomePage from './pages/homepage';

describe('Home Page Tests', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('User navigates to the home page and verifies header and logo', () => {
    homePage.verifyHeader();
    homePage.verifyNavbarLogo();
  });

  it('User clicks on the GitHub star button', () => {
    homePage.verifyGithubStarButton();
  });

  it('User clicks on the Read the Docs button', () => {
    homePage.verifyReadTheDocsButton();
  });

  it('User clicks on the "Let us know here" link', () => {
    homePage.verifyLetUsKnowLink();
  });

  it('User verifies homepage cards', () => {
    homePage.verifyHomepageCards();
  });
  
  it('User verifies important links', () => {
    homePage.verifyHomepageCardLinks();
  })
});



