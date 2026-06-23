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
}

export default TSCPage;
