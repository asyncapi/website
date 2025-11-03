class AmbassadorsPage {
  visit() {
    cy.visit('/community/ambassadors');
  }

  verifyKeySectionsAndLinks() {
    // Main CTA button to program doc
    cy.get(
      'a[href="https://github.com/asyncapi/community/blob/master/docs/050-mentorship-program/ambassador-program/AMBASSADOR_PROGRAM.md"]'
    ).should('be.visible');

    // Intro video iframe
    cy.get('[data-testid="Ambassadors-Iframe"]').should('be.visible');

    // Members grid exists
    cy.get('[data-testid="Ambassadors-members-main"]').should('be.visible');

    // Bottom CTA buttons
    cy.get(
      'a[href="https://github.com/asyncapi/community/blob/master/AMBASSADOR_ORGANIZATION.md#are-you-interested-in-becoming-an-official-asyncapi-ambassador"]'
    ).should('be.visible');
    cy.get('a[href="https://www.asyncapi.com/blog/asyncapi-ambassador-program"]').should('be.visible');
  }

  verifyAmbassadorSocialLinks(name, links) {
    // Find the card for the ambassador by their name, then check social anchors within it
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
