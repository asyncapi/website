import Footer from './pages/Footer';
import { initiativeLinks, socialMediaData, newsLinks, footerMiscData } from '../components/footer/FooterData';

describe('Footer Links Validation', () => {
  const footer = new Footer();

  beforeEach(() => {
    footer.visit();
  });

  it('verifies the initiative links in the footer', () => {
    initiativeLinks.forEach(({ url, label }) => {
      footer.verifyFooterLink(url, label);
    });
  });

  it('verifies the social links in the footer', () => {
    socialMediaData.forEach(({ url, label }) => {
      footer.verifyFooterLink(url, label);
    });
  });

  it('verifies the news links in the footer', () => {
    newsLinks.forEach(({ url, label }) => {
      footer.verifyFooterLink(url, label);
    });
  });
  
  it('verifies the Netlify link in the footer', () => {
    footer.verifyFooterLink(footerMiscData.netlifyLink, '');
  });
});
