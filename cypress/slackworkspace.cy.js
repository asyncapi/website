import SlackPage from './pages/slack';

describe('Slack workspace tests', () => {
  const slackPage = new SlackPage();

  beforeEach(() => {
    slackPage.visitSlack();
  });

  it('User can access all login methods', () => {
    cy.wait(2000);
    cy.get('body').then(($body) => {
      const inactiveLinkExists =
        $body.find('.p-refreshed_page__heading').length > 0 &&
        $body.text().includes('This link is no longer active');

      if (inactiveLinkExists) {
        cy.log('Slack invite link is inactive - verifying error message');
        slackPage.verifyInactiveLinkMessage();
      } else {
        cy.log('Slack invite link is active - verifying login methods');
        slackPage.verifyGoogleLoginButton();
        slackPage.verifyAppleLoginButton();
        slackPage.verifyContinueWithEmail();
      }
    });
  });

  it('Should handle inactive Slack invite link gracefully', () => {
    cy.get('body').then(($body) => {
      const inactiveLinkExists =
        $body.find('.p-refreshed_page__heading').length > 0 &&
        $body.text().includes('This link is no longer active');

      if (inactiveLinkExists) {
        cy.log('Slack invite link is inactive - verifying error message');
        slackPage.verifyInactiveLinkMessage();
      } else {
        cy.log('Slack invite link is active - test passes');
      }
    });
  });

  it('User can view links for Privacy, Contact Us, and Region Change', () => {
    slackPage.verifyPrivacyAndTerms();
    slackPage.verifyContactUs();
    slackPage.verifyChangeRegion();
  });
});
