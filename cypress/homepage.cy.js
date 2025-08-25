import HomePage from './pages/homepage';

describe('Home Page E2E Tests Using Base Components', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
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
    homePage.verifyHomepageCards();
  });

  it('should verify all important homepage links', () => {
    homePage.verifyHomepageCardLinks();
  });

  it('should navigate to the Blog page', () => {
    const blogPage = homePage.goToBlogPage();
    blogPage.verifyPageLoaded();
  });

  it('should navigate to the Docs page', () => {
    const docsPage = homePage.goToDocsPage();
    docsPage.verifyPageLoaded(); 

  it('should navigate to the Case Studies page', () => {
    const caseStudiesPage = homePage.goToCaseStudiesPage();
    caseStudiesPage.verifyPageLoaded(); 
  });

  it('should navigate to the Tools page', () => {
    const toolsPage = homePage.goToToolsPage();
    toolsPage.verifyPageLoaded(); 
  });

  it('should navigate to the Community page', () => {
    const communityPage = homePage.goToCommunityPage();
    communityPage.verifyPageLoaded(); 
  });

  it('should navigate to the Roadmap page', () => {
    const roadmapPage = homePage.goToRoadmapPage();
    roadmapPage.verifyPageLoaded(); 
  });
});
});
