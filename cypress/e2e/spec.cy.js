describe('empty spec', () => {
  it('passes', () => {
    cy.origin('https://example.cypress.io', () => {
      Cypress.require('')
    });
  });
});
