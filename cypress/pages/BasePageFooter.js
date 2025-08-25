class BasePage {
  visit(path = '/') {
    cy.visit(path);
  }

  verifyLink(href, text, attr = 'href') {
    const element = cy.get(`a[${attr}="${href}"]`).should('be.visible');
    if (text) {
      element.and('contain', text).and('have.attr', attr, href);
    } else {
      element.and('have.attr', attr, href);
    }
  }
}

export default BasePage;
