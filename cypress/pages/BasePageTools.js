class BasePage {
  visit() {
    cy.visit('/');
  }

  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyTextVisible(text) {
    cy.contains(text).should('be.visible');
  }

  verifyLinkWithText(selector, text, expectedHrefPart) {
    cy.contains(selector, text)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', expectedHrefPart);
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

