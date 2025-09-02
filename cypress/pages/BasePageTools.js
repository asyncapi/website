class BasePage {
  visit(path) {
    cy.visit(path);
  }

  getHeaderText(selector, expectedText) {
    cy.get(selector).should('contain.text', expectedText);
  }

  getLink(href, text) {
    cy.get(`a[href="${href}"]`).contains(text);
  }
}

export default BasePage;
