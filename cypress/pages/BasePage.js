class BasePage {
  visit(path = '/') {
    cy.visit(path);
    return this;
  }

  getElement(selector) {
    return cy.get(selector);
  }

  hoverElement(selector) {
    return this.getElement(selector)
      .trigger('mouseover')
      .trigger('mouseenter');
  }

  verifyElementIsVisible(selector) {
    return this.getElement(selector).should('be.visible');
  }

  verifyElementHasAttribute(selector, attribute, value) {
    return this.getElement(selector).should('have.attr', attribute, value);
  }

  verifyHeadingExists(headingText) {
    return cy.contains('h1, h2, h3, h4, h5, h6', headingText).should('be.visible');
  }

  verifyLink(href, text, attr = 'href') {
    const chain = cy
      .get(`a[${attr}="${href}"]`)
      .should('be.visible')
      .and('have.attr', attr, href);
    return text ? chain.and('contain', text) : chain;
  }

  verifyButtonLink(href, buttonText) {
    return this.verifyCustomLink(buttonText, href);
  }

  verifyElementContainsText(selector, text) {
    return cy.contains(selector, text).should('exist');
  }

  verifyImageVisible(altText) {
    return cy.get(`img[alt="${altText}"]`).should('be.visible');
  }

  verifyCustomLink(text, href) {
    return cy.contains('a', text)
      .should('be.visible')
      .and('have.attr', 'href', href);
  }
}

export default BasePage;
