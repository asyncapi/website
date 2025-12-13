import CaseStudiesPage from './pages/CaseStudiesPage';

let casestudiespage;

beforeEach(() => {
  casestudiespage = new CaseStudiesPage();
  casestudiespage.visit();
});

describe('Critical User Flows in CaseStudies Page', () => {
it('User navigates to the Case Studies Page and verifies the header', () => {
  casestudiespage.verifyHeader();
});

it('User verifies FAQ link is visible and contains correct URL', () => {
  casestudiespage.verifyFaqLink();
});

it('User verifies Cards link is visible and contains correct URL', () => {
  casestudiespage.verifyCardsLink();
});

  it('User verifies Submit a Pull Request Link is visible and contains correct URL', () => {
    casestudiespage.verifySubmitPullRequestLink();
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
    links.forEach(({ href, label }) => {
      casestudiespage.verifyLinksWork(href, label);
    });
  });
});
