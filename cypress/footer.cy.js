import Footer from './pages/Footer';

describe('Footer Links Validation', () => {
  const footer = new Footer();
  let links;

  before(() => {
    cy.fixture('footerPageData').then((data) => {
      links = data;
    });
  });

  beforeEach(() => {
    footer.visit();
  });

  it('verifies the initiative links in the footer', () => {
    links.initiativeLinks.forEach(({ href, text }) => {
      footer.verifyFooterLink(href, text);
    });
  });

  it('verifies the social links in the footer', () => {
    links.socialLinks.forEach(({ href, text }) => {
      footer.verifyFooterLink(href, text);
    });
  });

  it('verifies the news links in the footer', () => {
    links.newsLinks.forEach(({ href, text }) => {
      footer.verifyFooterLink(href, text);
    });
  });

  it('verifies the Netlify link in the footer', () => {
    footer.verifyFooterLink(links.netlifyLink, '');
  });
});
