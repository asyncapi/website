import SlackPage from './pages/slack';

describe('Slack tests', () => {
  const slackPage = new SlackPage();

  it('User navigates Slack Workspace Page', () => {
    slackPage.visitSlack();
    slackPage.verifyGoogleLoginButton();
    slackPage.verifyAppleLoginButton();
    slackPage.verifyContinueWithEmail();
    slackPage.verifyPrivacyAndTerms();
    slackPage.verifyContactUs();
    slackPage.verifyChangeRegion();
  });
});
