class CaseStudiesPage {
  visit() {
    cy.visit('/casestudies');
  }

  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyHeadingExists(headingText) {
    cy.contains('h1', headingText).should('be.visible');
  }

  verifyElementHasAttribute(selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value);
  }

  verifyScrollDown(){
    cy.contains('h1', 'Adopters')  
    .scrollIntoView()
    .should('be.visible');
  }


  verifyLinkExists(linkName, linkUrl, index = 0) {
    cy.get('[data-testid="CaseStudyCard-main"]')
      .eq(index)
      .within(() => {
        cy.get(`img[alt*="${linkName.split(' ')[0]}"]`).should('exist');
      })
      .closest('a')
      .should('have.attr', 'href', `${linkUrl}`);
  }

  verifyLinksWork(href,label){
  cy.get(`a[href="${href}"]`)
      .should('contain.text', label)
      .should('have.attr', 'href', href)
      .then(($link) => {
        // Verify the link is not broken
        cy.request('HEAD', href).its('status').should('eq', 200);
      });
    }

  verifyFaqLink() {
    cy.contains('a', 'FAQ')
      .should('be.visible')
      .should(
        'have.attr',
        'href',
        'https://github.com/asyncapi/website/blob/master/README.md#case-studies',
      );
  }

  verifySubmitPullRequestLink(){
    cy.contains('a','submit a pull request')
    .should('be.visible')
    .should('have.attr',
    'href',
    'https://github.com/asyncapi/website/blob/master/config/adopters.yml',
    );
  }

   verifyCardsLink() {
    this.verifyLinkExists('Adeo Group', 'casestudies/adeogroup', 0); // Selects the first card
    this.verifyLinkExists('HDI Global SE', 'casestudies/hdiglobal', 1); // Selects the second card
  }

  verifyHeader() {
    this.verifyHeadingExists('Case Studies');
  }
}

export default CaseStudiesPage;
