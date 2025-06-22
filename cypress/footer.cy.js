import Footer from './pages/Footer';

describe('Footer Links Validation', () => {
  const footer = new Footer();

  beforeEach(() => {
    footer.visit();
  });

  it('User verifies the initiative section', () => {
    footer.initiativeLinks.forEach((link) => {
      footer.verifyLink(link.href, link.text);
    });
  });

  it('User verifies the social section', () => {
    footer.socialLinks.forEach(({ href, text }) => {
      footer.verifyLink(href, text);
    });
  });

  it('User verifies the news section', () => {
    footer.newsLinks.forEach((link) => {
      footer.verifyLink(link.href, link.text);
    });
  });

  it('User verifies Netlify link', () => {
    footer.verifyLink('https://netlify.com', '');
  });
});


