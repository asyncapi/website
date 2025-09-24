class BasePage {
  visit() {
    cy.visit('/');
  }

  verifyLink(href, text, attr = 'href') {
    const chain = cy
      .get(`a[${attr}="${href}"]`)
      .should('be.visible')
      .and('have.attr', attr, href);
    return text ? chain.and('contain', text) : chain;
  }
}

export default BasePage;
