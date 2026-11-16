import communityLinks from '../config/community-links.json';
import ConnectPage from './pages/connect';

const connectLinks = [
  {
    label: 'Slack',
    url: communityLinks.slack,
  },
  {
    label: 'Conferences',
    url: communityLinks.conferences,
  },
  {
    label: 'LinkedIn',
    url: communityLinks.linkedin,
  },
  {
    label: 'Mastodon',
    url: communityLinks.mastodon,
  },
  {
    label: 'Email',
    url: communityLinks.email,
  },
  {
    label: 'GitHub',
    url: communityLinks.github,
  },
];

describe('Connect Page', () => {
  const connectPage = new ConnectPage();

  beforeEach(() => {
    connectPage.visit();
  });

  it('should display the connect page content', () => {
    connectPage.verifyPageLoaded();
  });

  it('should display all connect links with correct urls', () => {
    connectLinks.forEach((link) => {
      connectPage.verifyConnectLink(link);
    });
  });
});
