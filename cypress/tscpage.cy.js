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
    tscpage.fillNewsletterForm('aditi', 'kerghjh@fhgj');
    tscpage.submitNewsletter();
    tscpage.getFailureMessage().should('be.visible');
  });

  it('verifies key links on the TSC page', () => {
    const linksToVerify = [
      {
        href: 'https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md',
        label: 'Link',
      },
      {
        href: 'https://github.com/asyncapi/community/blob/master/CHARTER.md',
        label: 'Open Governance Model',
      },
      {
        href: 'https://www.asyncapi.com/blog/governance-motivation',
        label: 'this',
      },
    ];

    linksToVerify.forEach(({ href, label }) => {
      cy.get(`a[href="${href}"]`).contains(label);
    });
  });

  it('verifies social links for selected TSC members', () => {

    const members = [
      {
        name: 'Aishat Muibudeen',
        links: {
          GitHub: 'https://www.github.com/Mayaleeeee',
          Twitter: 'https://www.twitter.com/maya_ux_ui',
          Linkedin: 'https://www.linkedin.com/in/aishatmuibudeen'
        }
      },
      {
        name: 'Khuda Dad Nomani',
        links: {
          GitHub: 'https://www.github.com/KhudaDad414',
          Twitter: 'https://www.twitter.com/KhudaDadNomani',
          Linkedin: 'https://www.linkedin.com/in/khudadadnomani'
        }
      },
      {
        name: 'Lukasz Gornicki',
        links: {
          GitHub: 'https://www.github.com/derberg',
          Twitter: 'https://www.twitter.com/derberq',
          Linkedin: 'https://www.linkedin.com/in/lukasz-gornicki-a621914'
        }
      }
    ];

    members.forEach(({ name, links }) => {
      tscpage.verifyMemberSocialLinks(name, links);
    });
  });
});
