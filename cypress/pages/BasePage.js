class BasePage {
  visit(url = '/') {
    cy.visit(url);
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

  verifyLink(href, text, { findByText = false } = {}) {
    if (findByText && text) {
      const chain = cy.contains('a', text).should('be.visible');
      return href ? chain.and('have.attr', 'href', href) : chain;
    }
    const chain = cy.get(`a[href="${href}"]`).should('be.visible').and('have.attr', 'href', href);
    return text ? chain.and('contain', text) : chain;
  }

  verifyButtonLink(href, buttonText) {
    return this.verifyLink(href, buttonText, { findByText: true });
  }

  verifyElementContainsText(selector, text) {
    return cy.contains(selector, text).should('exist');
  }

  verifyImageVisible(altText) {
    return cy.get(`img[alt="${altText}"]`)
      .should('be.visible')
      .and('have.attr', 'src')
      .should('not.be.empty');
  }

  getLink(href, text) {
    return cy.contains(`a[href="${href}"]`, text)
      .should('be.visible')
      .and('have.attr', 'href', href);
  }
}

export default BasePage;
