import BasePage from './BasePage';

class CaseStudiesPage extends BasePage {
  visit() {
    super.visit('/casestudies');
  }

  verifyPageLoaded() {
    super.verifyHeadingExists('Case Studies');
  }

  verifyHeader() {
    this.verifyPageLoaded();
  }

  verifyScrollDown() {
    super.scrollToText('Adopters');
  }

  verifyCardLink(cardName, cardUrl, index = 0) {
    cy.get('[data-testid="CaseStudyCard-main"]')
      .eq(index)
      .within(() => {
        cy.get(`img[alt*="${cardName.split(' ')[0]}"]`).should('exist');
      })
      .closest('a')
      .should('have.attr', 'href', cardUrl);
  }

  verifyResourceLink(href) {
    cy.get(`a[href="${href}"]`)
      .first()
      .should('exist')
      .should('have.attr', 'href', href);
  }

  verifyFaqLink() {
    super.verifyButtonLink(
      'https://github.com/asyncapi/website/blob/master/README.md#case-studies',
      'FAQ'
    );
  }

  verifySubmitPullRequestLink() {
    super.verifyButtonLink(
      'https://github.com/asyncapi/website/blob/master/config/usecases.yaml',
      'submit a pull request'
    );
  }

  verifyCardsLink() {
    this.verifyCardLink('Adeo Group', 'casestudies/adeogroup', 0);
    this.verifyCardLink('HDI Global SE', 'casestudies/hdiglobal', 1);
  }
}

export default CaseStudiesPage;
