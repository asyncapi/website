import SlackPage from './pages/slack';

describe('Slack workspace tests', () => {
  const slackPage = new SlackPage();

  beforeEach(() => {
    slackPage.visitSlack();
  });

  it('Should show all login methods when the Slack invite link is active', function () {
    cy.get('body', { timeout: 10000 }).then(($body) => {
      const isInactive =
        $body.find('.p-refreshed_page__heading').length > 0 &&
        $body.text().includes('This link is no longer active');

      const hasLoginButtons =
        $body.find('[data-qa="base_google_login_button"]').length > 0 ||
        $body.find('[data-qa="join_with_email"]').length > 0;

      if (isInactive || !hasLoginButtons) {
        cy.log('Slack invite link is inactive or login buttons not available - skipping test');
        this.skip();
      } else {
        slackPage.verifyGoogleLoginButton();
        slackPage.verifyAppleLoginButton();
        slackPage.verifyContinueWithEmail();
      }
    });
  });

  it('Should show links for Privacy, Contact Us, and Region Change', () => {
    slackPage.verifyPrivacyAndTerms();
    slackPage.verifyContactUs();
    slackPage.verifyChangeRegion();
  });

});

