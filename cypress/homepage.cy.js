import HomePage from './pages/HomePage';

describe('Home Page Tests', () => {
  const homePage = new HomePage();
  let data;

  before(() => {
    cy.fixture('homePageData').then((fixtureData) => {
      data = fixtureData;
    });
  });

  beforeEach(() => {
    homePage.visit();
  });

  it('User navigates to the home page and verifies header and logo', () => {
    homePage.verifyHeadingExists(data.headerText);
    homePage.verifyNavbarLogo();
  });

  it('User clicks on the GitHub star button', () => {
    const selector = '[data-testid="Navbar-main"] [data-testid="Button-link"]';
    homePage.verifyElementIsVisible(selector);
    homePage.verifyElementHasAttribute(selector, 'href', data.githubStarLink);
  });

  it('User clicks on the Read the Docs button', () => {
    const selector = `[data-testid="Button-link"][href="${data.readDocsLink}"]`;
    homePage.verifyElementIsVisible(selector);
  });

  it('User clicks on the "Let us know here" link', () => {
    homePage.verifyLinkExists('Let us know here!', data.letUsKnowLink);
  });

  it('User verifies homepage cards', () => {
    homePage.verifyCardTitles(data.cardTitles);
    homePage.verifyCardTitles(data.moreCardTitles, 'Feature-ul');
  });

  it('User verifies important links', () => {
    data.homepageLinks.forEach((link) => {
      homePage.verifyLinkExists(link.name, link.url);
    });
  });
});
