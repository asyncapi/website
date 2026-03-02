import CaseStudiesPage from './pages/CaseStudiesPage';

let casestudiespage;

beforeEach(() => {
  casestudiespage = new CaseStudiesPage();
  casestudiespage.visit();
});

describe('Critical User Flows in CaseStudies Page', () => {
  const verifications = [
    { name: 'header', testName: 'User navigates to the Case Studies Page and verifies the header', fn: () => casestudiespage.verifyHeader() },
    { name: 'FAQ link', testName: 'User verifies FAQ link is visible and contains correct URL', fn: () => casestudiespage.verifyFaqLink() },
    { name: 'Cards link', testName: 'User verifies Cards link is visible and contains correct URL', fn: () => casestudiespage.verifyCardsLink() },
    { name: 'Submit PR link', testName: 'User verifies Submit a Pull Request Link is visible and contains correct URL', fn: () => casestudiespage.verifySubmitPullRequestLink() }
  ];

  verifications.forEach(({ testName, fn }) => {
    it(testName, fn);
  });
});

describe('Adopters Table', () => {
  it('Navigates to the Case Studies page and scrolls down to the Adopters Table', () => {
    casestudiespage.verifyScrollDown();
  });
});

describe('Links under Resources Section', () => {
  let links;

  before(() => {
    cy.fixture('caseStudiesLinks').then((data) => {
      links = data;
    });
  });

  it('Verifies all Links under Resources work', () => {
    links.forEach(({ href }) => {
      casestudiespage.verifyResourceLink(href);
    });
  });
});
