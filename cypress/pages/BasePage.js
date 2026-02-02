class BasePage {
  visit(path = '/') {
    cy.visit(path);
    return this;
  }

  verifyHeadingExists(headingText, tag = 'h1') {
    cy.get(tag).should('contain.text', headingText);
  }

  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyElementHasAttribute(selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value);
  }

  scrollToText(text) {
    cy.contains(text).scrollIntoView();
  }

  verifyButtonLink(href, text) {
    cy.contains('a', text)
      .should('have.attr', 'href', href)
      .should('be.visible');
  }

  verifyLink(href, text) {
    cy.get(`a[href="${href}"]`)
      .should('be.visible')
      .and('contain.text', text);
  }
}

export default BasePage;
