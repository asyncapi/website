
import homePageData from './fixtures/homePageData.json';
import HomePage from './pages/homepage';
import { features } from '../components/features/FeatureList';

describe('Home Page E2E Tests Using Base Components', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  const navigationTests = [
    ['Blog', () => homePage.goToBlogPage()],
    ['Docs', () => homePage.goToDocsPage()],
    ['Case Studies', () => homePage.goToCaseStudiesPage()],
    ['Tools', () => homePage.goToToolsPage()],
    ['Community', () => homePage.goToCommunityPage()],
  ];

  navigationTests.forEach(([name, nav]) => {
    it(`should navigate to the ${name} page`, () => {
      const page = nav();
      page.verifyPageLoaded();
    });
  });
  
  it('should display the main header and logo', () => {
    homePage.verifyHeader();
    homePage.verifyNavbarLogo();
  });

  it('should show the GitHub star button with correct link', () => {
    homePage.verifyGithubStarButton();
  });

  it('should show the primary CTA Slack button', () => {
    homePage.verifySlackCTAButton();
  });

  it('shows the Slack screenshot that matches the stored theme', () => {
    const lightSrc = '/img/homepage/slack-wg-community-light.webp';
    const darkSrc = '/img/homepage/slack-wg-community-dark.webp';

    cy.visit('/en', {
      onBeforeLoad(win) {
        win.localStorage.setItem('theme', 'light');
      }
    });
    cy.get(`img[src="${lightSrc}"]`).scrollIntoView().should('be.visible');
    cy.get(`img[src="${darkSrc}"]`).should('not.be.visible');

    cy.visit('/en', {
      onBeforeLoad(win) {
        win.localStorage.setItem('theme', 'dark');
      }
    });
    cy.get(`img[src="${darkSrc}"]`).scrollIntoView().should('be.visible');
    cy.get(`img[src="${lightSrc}"]`).should('not.be.visible');
  });

  it('should display the Google Calendar link', () => {
    homePage.verifyLetUsKnowLink();
  });

  it('should show all homepage cards with expected titles', () => {
    const { cardTitles, moreCardTitles } = homePageData;
    homePage.verifyHomepageCards(cardTitles, moreCardTitles);
  });

  it('should verify all important homepage links', () => {
    features.forEach(feature => {
      feature.links.forEach(({ label, href }) => {
        homePage.verifyHomepageCardLink(label, href);
      });
    });
  });
});