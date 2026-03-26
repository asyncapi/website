
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
    ['Roadmap', () => homePage.goToRoadmapPage()],
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

  it('should show the "Read the Docs" button', () => {
    homePage.verifyReadTheDocsButton();
  });

  it('should display the "Let us know here!" link with correct URL', () => {
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