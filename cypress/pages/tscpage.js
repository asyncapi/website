
class TSCPage {


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
    return cy.get('[data-testid="Paragraph-test"]')
    .should('be.visible');
   
  }
}

export default TSCPage;

