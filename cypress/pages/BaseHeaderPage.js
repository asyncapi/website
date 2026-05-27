
class BasePage {
  visit() {
    cy.visit('/')
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
