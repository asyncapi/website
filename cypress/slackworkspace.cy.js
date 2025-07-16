import SlackPage from './pages/slack';

describe('Slack workspace tests', () => {
  const slackPage = new SlackPage();

  beforeEach(() => {
    slackPage.visitSlack();
  });

  it('User can access all login methods', () => {
    slackPage.verifyGoogleLoginButton();
    slackPage.verifyAppleLoginButton();
    slackPage.verifyContinueWithEmail();
  });

  it('User can view links for Privacy, Contact Us, and Region Change', () => {
    slackPage.verifyPrivacyAndTerms();
    slackPage.verifyContactUs();
    slackPage.verifyChangeRegion();
  });
});
