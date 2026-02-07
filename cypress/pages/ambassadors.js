class AmbassadorsPage {
  visit() {
    cy.visit('/community/ambassadors');
  }

  verifyKeySectionsAndLinks() {
    cy.get('a[href="https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/AMBASSADOR_PROGRAM.md"]'
    )
      .should('be.visible');
    cy.get('[data-testid="Ambassadors-Iframe"]')
      .should('be.visible');
    cy.get('[data-testid="Ambassadors-members-main"]')
      .should('be.visible');
    cy.get('a[href="https://www.asyncapi.com/blog/asyncapi-ambassador-program"]')
      .should('be.visible');
  }

  verifyAmbassadorSocialLinks(name, links) {
    cy.contains('[data-testid="Ambassadors-members-details"]', name)
      .closest('[data-testid="Ambassadors-members"]')
      .within(() => {
        if (links.twitter) cy.get(`a[href="${links.twitter}"]`).should('be.visible');
        if (links.github) cy.get(`a[href="${links.github}"]`).should('be.visible');
        if (links.linkedin) cy.get(`a[href="${links.linkedin}"]`).should('be.visible');
      });
  }
}

export default AmbassadorsPage;
