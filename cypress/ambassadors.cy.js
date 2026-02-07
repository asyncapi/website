import HomePage from './pages/homepage';
import AmbassadorsPage from './pages/ambassadors';

let homePage;
let ambassadorsPage;

beforeEach(() => {
  homePage = new HomePage();
  ambassadorsPage = new AmbassadorsPage();
  homePage.visit();
  homePage.goToAmbassadorsPage();
});

describe('Ambassadors Page', () => {
  it('verifies key sections and links', () => {
    ambassadorsPage.verifyKeySectionsAndLinks();
  });

  it('verifies social links for selected Ambassadors', () => {
    const ambassadors = [
      {
        name: 'Quetzalli Writes',
        links: {
          github: 'https://www.github.com/quetzalliwrites',
          twitter: 'https://www.twitter.com/QuetzalliWrites',
          linkedin: 'https://www.linkedin.com/in/quetzalli-writes'
        }
      },
      {
        name: 'Giri Venkatesan',
        links: {
          github: 'https://www.github.com/gvensan',
          twitter: 'https://www.twitter.com/giri_venkatesan',
          linkedin: 'https://www.linkedin.com/in/girivenkatesan'
        }
      },
      {
        name: 'Hugo Guerrero',
        links: {
          github: 'https://www.github.com/hguerrero',
          twitter: 'https://www.twitter.com/hguerreroo',
          linkedin: 'https://www.linkedin.com/in/hugoguerrero'
        }
      }
    ];

    ambassadors.forEach(({ name, links }) => {
      ambassadorsPage.verifyAmbassadorSocialLinks(name, links);
    });
  });
});
