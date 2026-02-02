class BasePage {
  visit(path = '/') {
    cy.visit(path);
  }

  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyHeadingExists(headingText, headingSelector = 'h1, h2, h3, h4, h5, h6') {
    cy.contains(headingSelector, headingText).should('be.visible');
  }

  verifyElementHasAttribute(selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value);
  }

  verifyLinkExists(href, text = null) {
    const chain = cy.get(`a[href="${href}"]`).should('be.visible');
    return text ? chain.and('contain', text) : chain;
  }

  verifyButtonLink(href, text) {
    cy.contains('a', text)
      .should('be.visible')
      .and('have.attr', 'href', href);
  }

  verifyElementContainsText(selector, text) {
    cy.contains(selector, text).should('exist');
  }

  scrollToElement(selector) {
    cy.get(selector).scrollIntoView().should('be.visible');
  }

  scrollToText(text) {
    cy.contains(text).scrollIntoView().should('be.visible');
  }
}

export default BasePage;
