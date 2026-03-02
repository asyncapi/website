import Footer from './pages/Footer';
import { initiativeLinks, socialMediaData, newsLinks, footerMiscData } from '../components/footer/FooterData';

describe('Footer Links Validation', () => {
  const footer = new Footer();

  beforeEach(() => {
    footer.visit();
  });

  const linkGroups = [
    { name: 'initiative', links: initiativeLinks },
    { name: 'social', links: socialMediaData },
    { name: 'news', links: newsLinks }
  ];

  linkGroups.forEach(({ name, links }) => {
    it(`verifies the ${name} links in the footer`, () => {
      links.forEach(({ url, label }) => {
        footer.verifyFooterLink(url, label);
      });
    });
  });
  
  it('verifies the Netlify link in the footer', () => {
    footer.verifyFooterLink(footerMiscData.netlifyLink, '');
  });
});
