import HomePage from './pages/homepage';
import TSCPage from './pages/tscpage';

let homePage;
let tscPage;

beforeEach(() => {
  homePage = new HomePage();
  tscPage = new TSCPage();
  homePage.visit();
  homePage.goToTSCPage();
});

afterEach(() => {
  cy.get('input[aria-label="Search TSC members"]').clear();
});

describe('TSC Page', () => {
  it('should succeed in subscribing to the newsletter', () => {
    tscPage.fillNewsletterForm('anushka', 'valid@example.com');
    tscPage.submitNewsletter();
    tscPage.getSuccessMessage().should('be.visible');
  });

  it('should show correct failure message', () => {
    tscPage.fillNewsletterForm('aditi', 'kerghjh@fhgj');
    tscPage.submitNewsletter();
    tscPage.getFailureMessage().should('be.visible');
  });

  it('verifies key links on the TSC page', () => {
    const linksToVerify = [
      {
        href: 'https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/TSC_MEMBERSHIP.md',
        label: 'Link',
      },
      {
        href: 'https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/CHARTER.md',
        label: 'Open Governance Model',
      },
      {
        href: 'https://www.asyncapi.com/blog/governance-motivation',
        label: 'this',
      },
    ];

    linksToVerify.forEach(({ href, label }) => {
      cy.get(`a[href="${href}"]`).contains(label).should('be.visible');
    });
  });

  it('verifies social links for selected TSC members', () => {
    const tscMembers = [
      {
        name: 'Aishat Muibudeen',
        links: {
          GitHub: 'https://www.github.com/Mayaleeeee',
          Twitter: 'https://www.twitter.com/maya_ux_ui',
          Linkedin: 'https://www.linkedin.com/in/aishatmuibudeen'
        }
      },
      {
        name: 'Akshat Nema',
        links: {
          GitHub: 'https://www.github.com/akshatnema',
          Twitter: 'https://www.twitter.com/AksNema',
          Linkedin: 'https://www.linkedin.com/in/akshat-nema'
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

    tscMembers.forEach(({ name, links }) => {
      tscPage.verifyTSCMemberSocialLinks(name, links);
    });
  });

  it('verifies repo pills are clickable links to the correct GitHub repository', () => {
    // Aishat Muibudeen maintains the "website" repo — verify the pill is an <a> with the correct href
    tscPage.verifyRepoPillIsLink('Aishat Muibudeen', 'website');
    tscPage.verifyRepoPillIsLink('Aishat Muibudeen', 'conference-website');
    cy.get('[data-testid="repo-pill"]').should('exist');
  });

  it('verifies +N button expands all remaining repos inline', () => {
    // Aishat Muibudeen has 3 repos; 2 are shown by default and 1 is hidden behind the +1 button
    tscPage.expandRepos('Aishat Muibudeen');

    cy.contains('h3', 'Aishat Muibudeen')
      .closest('[class*="rounded-xl"]')
      .within(() => {
        cy.get('[data-testid="repo-pill"]').should('have.length', 3);
        cy.get('[data-testid="repo-expand-button"]').should('not.exist');
        cy.get('[data-testid="repo-collapse-button"]').should('be.visible');
      });
  });

  it('verifies Show less button collapses repos back to default', () => {
    tscPage.expandRepos('Aishat Muibudeen');
    tscPage.collapseRepos('Aishat Muibudeen');

    cy.contains('h3', 'Aishat Muibudeen')
      .closest('[class*="rounded-xl"]')
      .within(() => {
        cy.get('[data-testid="repo-pill"]').should('have.length', 2);
        cy.get('[data-testid="repo-expand-button"]').should('be.visible');
        cy.get('[data-testid="repo-collapse-button"]').should('not.exist');
      });
  });

  it('verifies ambassador badge is shown for TSC members who are also Ambassadors', () => {
    const ambassadorTscMembers = [
      { name: 'Daniel Kocot', github: 'danielkocot' },
      { name: 'Ivan Garcia Sainz-Aja', github: 'ivangsa' },
    ];

    ambassadorTscMembers.forEach(({ name, github }) => {
      tscPage.verifyAmbassadorBadge(name, github);
    });

    cy.get('input[aria-label="Search TSC members"]').clear().type('Daniel Kocot');
    cy.get('[data-testid="ambassador-badge"]').should('be.visible');
  });

  it('verifies ambassador filter shows only TSC members who are also Ambassadors', () => {
    tscPage.filterByAmbassador();

    // Known ambassador+TSC member must be visible after filtering
    cy.contains('h3', 'Daniel Kocot').should('be.visible');

    // Non-ambassador TSC member must not be visible after filtering
    cy.contains('h3', 'Akshat Nema').should('not.exist');

    tscPage.clearFilter();
  });
});
