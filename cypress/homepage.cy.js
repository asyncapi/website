import HomePage from './pages/HomePage';

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
