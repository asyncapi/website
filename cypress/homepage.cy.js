import HomePage from './pages/homepage';

describe('Home Page Tests', () => {
  const homePage = new HomePage();

  it('User visits the home page', () => {
    homePage.visit();
  });

});