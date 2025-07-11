class Footer {
  visit() {
    cy.visit('/');
  }

  verifyLink(href, text, attr = 'href') {
    const element = cy.get(`a[href="${href}"]`).should('be.visible');
    if (text) {
      element.and('contain', text).and('have.attr', attr, href);
    } else {
      element.and('have.attr', attr, href);
    }
  }

  get initiativeLinks() {
    return [
      { href: '/about', text: 'About' },
      { href: '/blog', text: 'Blog' },
      {
        href: 'https://github.com/asyncapi/brand/blob/master/brand-guidelines/README.md',
        text: 'Brand',
      },
      { href: '/finance', text: 'Finance' },
      { href: '/about#faqs', text: 'FAQs' },
    ];
  }

  get socialLinks() {
    return [
      { href: 'https://twitter.com/AsyncAPISpec', text: 'Twitter' },
      { href: 'https://github.com/asyncapi', text: 'GitHub' },
      { href: 'https://linkedin.com/company/asyncapi', text: 'LinkedIn' },
      { href: 'https://youtube.com/asyncapi', text: 'YouTube' },
      { href: 'https://asyncapi.com/slack-invite', text: 'Slack' },
      { href: 'https://www.twitch.tv/asyncapi', text: 'Twitch' },
    ];
  }

  get newsLinks() {
    return [{ href: 'mailto:press@asyncapi.io', text: 'Email Us' }];
  }
}

export default Footer;
