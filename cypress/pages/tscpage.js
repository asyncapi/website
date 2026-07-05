import BasePage from './BasePage';

class TSCPage extends BasePage {
  hoverCommunityLink() {
    cy.get('[data-testid="NavItem-Link"]').contains('Community').trigger('mouseover');
  }

  fillNewsletterForm(name, email) {
    cy.get('[data-testid="NewsletterSubscribe-text-input"]').type(name);
    cy.get('[data-testid="NewsletterSubscribe-email-input"]').type(email);
  }

  submitNewsletter() {
    cy.get('[data-testid="Button-main"]').click();
  }

  getSuccessMessage() {
    return cy.get('[data-testid="Paragraph-test"]').contains(
      `You'll receive an email whenever someone requests the TSC to vote.`
    );
  }

  getFailureMessage() {
    return cy.get('[data-testid="Paragraph-test"]').contains(`Subscription failed, please let us know about it by submitting a bug`);
  }

  verifyTSCMemberSocialLinks(name, links) {
    // Search for the member to bring them into view regardless of pagination
    cy.get('input[aria-label="Search TSC members"]').clear().type(name);
    cy.contains('h3', name)
      .closest('[class*="rounded-xl"]')
      .within(() => {
        if (links.GitHub) cy.get(`a[href="${links.GitHub}"]`).should('be.visible');
        if (links.Twitter) cy.get(`a[href="${links.Twitter}"]`).should('be.visible');
        if (links.Linkedin) cy.get(`a[href="${links.Linkedin}"]`).should('be.visible');
      });
    cy.get('input[aria-label="Search TSC members"]').clear();
  }

  verifyRepoPillIsLink(memberName, repoName) {
    cy.get('input[aria-label="Search TSC members"]').clear().type(memberName);
    cy.contains('h3', memberName)
      .closest('[class*="rounded-xl"]')
      .within(() => {
        cy.get(`a[data-testid="repo-pill"][href="https://github.com/asyncapi/${repoName}"]`).should('be.visible');
      });
    cy.get('input[aria-label="Search TSC members"]').clear();
  }

  expandRepos(memberName) {
    cy.get('input[aria-label="Search TSC members"]').clear().type(memberName);
    cy.contains('h3', memberName)
      .closest('[class*="rounded-xl"]')
      .within(() => {
        cy.get('[data-testid="repo-expand-button"]').should('be.visible').click();
      });
  }

  collapseRepos(memberName) {
    cy.get('input[aria-label="Search TSC members"]').clear().type(memberName);
    cy.contains('h3', memberName)
      .closest('[class*="rounded-xl"]')
      .within(() => {
        cy.get('[data-testid="repo-collapse-button"]').should('be.visible').click();
      });
    cy.get('input[aria-label="Search TSC members"]').clear();
  }

  verifyAmbassadorBadge(memberName, githubHandle) {
    cy.get('input[aria-label="Search TSC members"]').clear().type(memberName);
    cy.contains('h3', memberName)
      .closest('[class*="rounded-xl"]')
      .within(() => {
        cy.get('[data-testid="ambassador-badge"]')
          .should('be.visible')
          .and('have.attr', 'href', `/community/ambassadors/${githubHandle}`);
      });
    cy.get('input[aria-label="Search TSC members"]').clear();
  }

  openFilterDropdown() {
    cy.get('#current-members button[aria-haspopup="true"]').click();
  }

  selectFilterOption(label) {
    this.openFilterDropdown();
    cy.get('[role="menuitem"]').contains(label).click();
  }

  filterByAmbassador() {
    this.selectFilterOption('Ambassador');
  }

  clearFilter() {
    this.selectFilterOption('All');
  }
}

export default TSCPage;
