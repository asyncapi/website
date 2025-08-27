
class BasePage {
  visit(path = '/') {
    cy.visit(path)
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
}

export default BasePage;
