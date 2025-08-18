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

});
