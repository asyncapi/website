import BasePage from './BasePageFooter';

class Footer extends BasePage {
  
  constructor() {
    super();
    this.footerSelector = 'footer'; 
  }

  verifyFooterLink(href, text, attr = 'href') {
    cy.get(this.footerSelector).within(() => {
      this.verifyLink(href, text, attr);
    });
  }
}

export default Footer;
