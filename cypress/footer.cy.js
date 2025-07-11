import Footer from './pages/Footer';

describe('Footer Links Validation', () => {
  const footer = new Footer();

  let links;

  before(() => {
    cy.fixture('footerLinks').then((data) => {
      links = data;
    });
  });

  beforeEach(() => {
    footer.visit();
  });

  it('User verifies the initiative section', () => {
    links.initiativeLinks.forEach(({ href, text }) => {
      footer.verifyLink(href, text);
    });
  });

  it('User verifies the social section', () => {
    links.socialLinks.forEach(({ href, text }) => {
      footer.verifyLink(href, text);
    });
  });

  it('User verifies the news section', () => {
    links.newsLinks.forEach(({ href, text }) => {
      footer.verifyLink(href, text);
    });
  });

  it('User verifies Netlify link', () => {
    footer.verifyLink(links.netlifyLink, '');
  });
});
