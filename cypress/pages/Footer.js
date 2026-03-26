import BasePage from './BaseFooterPage';

class Footer extends BasePage {

  constructor() {
    super();
    this.footerSelector = 'footer';
  }

  verifyFooterLink(href, text, attr = 'href') {
    cy.get(this.footerSelector).filter(':visible').first().within(() => {
      this.verifyLink(href, text, attr);
    });
  }
}

export default Footer;
