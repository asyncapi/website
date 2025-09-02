class BasePage {
  visit(path = '/') {
    cy.visit(path);
  }

  verifyLinkByHref(href) {
    cy.get(`a[href="${href}"]`).click();
  }

  verifyLinkByLabel(href, label) {
    cy.get(`a[href="${href}"]`).contains(label).click();
  }

  verifyLinkExists(href, text) {
    cy.get(`a[href="${href}"]`).should('contain.text', text);
  }
}

export default BasePage;
