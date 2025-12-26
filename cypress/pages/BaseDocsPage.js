class BaseDocsPage {
  visit(path = '/') {
    cy.visit(path);
  }

  verifyLinkByHref(href) {
    return cy.get(`a[href="${href}"]`)
      .should('be.visible')
      .and('have.attr', 'href', href)
      .then($a => {
        const wrap = cy.wrap($a);
        return $a.prop('target') === '_self'
          ? wrap.invoke('removeAttr', 'target').click()
         : wrap.click();
    });
 }

  verifyLinkByLabel(href, label) {
    cy.get(`a[href="${href}"]`).contains(label).click();
  }

  verifyLinkExists(href, text) {
    cy.get(`a[href="${href}"]`).should('contain.text', text);
  }
}

export default BaseDocsPage;
