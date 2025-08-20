
class BasePage {
  visit(path = '/') {
    cy.visit(path);
  }

  getElement(selector) {
    return cy.get(selector);
  }

  hoverElement(selector) {
    return this.getElement(selector).trigger('mouseover');
  }
}

export default BasePage;
