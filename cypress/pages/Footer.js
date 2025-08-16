class Footer {
  visit() {
    cy.visit('/');
  }

  verifyLink(href, text, attr = 'href') {
    const element = cy.get(`a[href="${href}"]`).should('be.visible');
    if (text) {
      element.and('contain', text).and('have.attr', attr, href);
    } else {
      element.and('have.attr', attr, href);
    }
  }

  
}

export default Footer;
