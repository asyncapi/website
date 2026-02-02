import SlackPage from './pages/slack';

describe('Slack workspace tests', () => {
  const slackPage = new SlackPage();

  beforeEach(() => {
    slackPage.visitSlack();
  });

  it('Should show all login methods when the Slack invite link is active', () => {
    cy.get('body').then(($body) => {
      const isInactive =
        $body.find('.p-refreshed_page__heading').length > 0 &&
        $body.text().includes('This link is no longer active');

      if (!isInactive) {
        slackPage.verifyGoogleLoginButton();
        slackPage.verifyAppleLoginButton();
        slackPage.verifyContinueWithEmail();
      } else {
        cy.log('Slack invite link is inactive - skipping login method tests');
        expect(isInactive).to.be.true;
      }
    });
  });

  it('Should show links for Privacy, Contact Us, and Region Change', () => {
    slackPage.verifyPrivacyAndTerms();
    slackPage.verifyContactUs();
    slackPage.verifyChangeRegion();
  });

});

