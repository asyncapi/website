import SlackPage from './pages/slack';

describe('Slack workspace tests', () => {
  const slackPage = new SlackPage();

  beforeEach(() => {
    slackPage.visitSlack();
  });

  it('User can access all login methods', () => {
    slackPage.waitForPageLoad();
    slackPage.checkLinkStatus((isInactive) => {
      if (isInactive) {
        slackPage.verifyInactiveLinkMessage();
      } else {
        slackPage.verifyAllLoginMethods();
      }
    });
  });

  it('Should handle inactive Slack invite link gracefully', () => {
    slackPage.checkLinkStatus((isInactive) => {
      if (isInactive) {
        slackPage.verifyInactiveLinkMessage();
      }
    });
  });

  it('User can view links for Privacy, Contact Us, and Region Change', () => {
    slackPage.checkLinkStatus((isInactive) => {
      if (!isInactive) {
        slackPage.verifyAllFooterLinks();
      }
    });
  });
});
