class BasePage {
  visit(path) {
    cy.visit(path);
  }

  getHeaderText(selector, expectedText) {
    cy.get(selector).should('contain.text', expectedText);
  }

  getLink(href, text) {
   return cy.contains(`a[href="${href}"]`, text)
      .should('be.visible')
      .and('have.attr', 'href', href);
  }
}

export default BasePage;

