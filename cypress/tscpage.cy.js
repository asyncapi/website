
import HomePage from './pages/homepage';
import TSCPage from './pages/tscpage';

let homePage;
let tscpage;

beforeEach(() => {

  homePage = new HomePage();
  tscpage = new TSCPage();
  homePage.visit();
  homePage.goToTSCPage();
});

describe('TSC Newsletter Subscription', () => {
  it('should succeed in subscribing to the newsletter', () => {

    tscpage.fillNewsletterForm('anushka', 'valid@example.com');
    tscpage.submitNewsletter();
    tscpage.getSuccessMessage().should('be.visible');
  });

  it('should show correct failure message', () => {

    tscpage.fillNewsletterForm('anushka', 'invalid-email');
    tscpage.submitNewsletter();
    tscpage.getFailureMessage().should('be.visible');
  });

  
  it('verifies key links on the TSC page', () => {

    const linksToVerify = [
    {href: 'https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md',label:'Link'},
    {href: 'https://github.com/asyncapi/community/blob/master/CHARTER.md',label:'Open Governance Model'},
    {href: 'https://www.asyncapi.com/blog/governance-motivation',label:'this'}
    ];

    linksToVerify.forEach(({ href,label }) => {
    cy.get(`a[href="${href}"]`).should('contain.text',label);

   
    })
  });
});



