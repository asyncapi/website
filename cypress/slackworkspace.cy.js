import SlackPage from './pages/slack';

describe('Slack workspace tests', () => {
  const slackPage = new SlackPage();

  beforeEach(() => {
    slackPage.visitSlack();
  });

  it('Should show all login methods when the Slack invite link is active', () => {
    slackPage.verifyGoogleLoginButton();
    slackPage.verifyAppleLoginButton();
    slackPage.verifyContinueWithEmail();
  });

  it('Should show links for Privacy, Contact Us, and Region Change', () => {
    slackPage.verifyPrivacyAndTerms();
    slackPage.verifyContactUs();
    slackPage.verifyChangeRegion();
  });
});
