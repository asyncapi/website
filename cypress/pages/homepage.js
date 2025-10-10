import CaseStudiesPage from './CaseStudiesPage';
import DocsPage from './DocsPage';
import RoadmapPage from './RoadmapPage';
import CommunityPage from './CommunityPage';
import ToolsPage from './ToolsPage';
import BlogPage from './BlogPage';

import { features } from '../../components/features/FeatureList';
import packageJson from '../../package.json';
import landingPageTranslations from '../../public/locales/en/landing-page.json';

const headerText = `${landingPageTranslations.main.header} ${landingPageTranslations.main.subHeader}`;

const githubStarLink = 'https://github.com/asyncapi/spec';
const readDocsLink = '/docs';
const letUsKnowLink = `${packageJson.bugs.url}/new`;

const cardTitles = [
  landingPageTranslations.features['document-apis.name'],
  landingPageTranslations.features['code-generation.name'],
  landingPageTranslations.features['open-governance.name'],
  landingPageTranslations.features['much-more.name'],
];

const moreCardTitles = [
  landingPageTranslations.features['specification.name'],
  landingPageTranslations.features['community.name'],
];

const homepageLinks = features.flatMap((feature) =>
  feature.links.map((link) => ({
    name: link.label,
    url: link.href,
  })),
);

class HomePage {
  visit() {
    cy.visit('/');
  }

  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyElementHasAttribute(selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value);
  }

  verifyHeadingExists(headingText) {
    cy.contains('h1, h2, h3, h4, h5, h6', headingText).should('be.visible');
  }

  verifyLinkExists(linkName, linkUrl) {
    cy.get('a')
      .contains(linkName, { matchCase: false })
      .should('exist')
      .then(($el) => {
        cy.wrap($el).invoke('attr', 'href').should('include', linkUrl);
      });
  }

  verifyCardTitles(customTitles, testId = null) {
    const titlesToVerify = customTitles || cardTitles;
    titlesToVerify.forEach((title) => {
      const selector = testId ? `[data-testid="${testId}"]` : '';
      cy.contains(`${selector} h1, h2, h3, h4, h5, h6`, title).should(
        'be.visible',
      );
    });
  }

  verifyNavbarLogo() {
    this.verifyElementIsVisible('[data-testid="Navbar-logo"]');
  }

  verifyHeader(text = headerText) {
    this.verifyHeadingExists(text);
  }

  verifyGithubStarButton(link = githubStarLink) {
    const selector = '[data-testid="Navbar-main"] [data-testid="Button-link"]';
    this.verifyElementIsVisible(selector);
    this.verifyElementHasAttribute(selector, 'href', link);
  }

  verifyReadTheDocsButton(link = readDocsLink) {
    cy.get(`[data-testid="Button-link"][href="${link}"]`).should('be.visible');
  }

  verifyHomepageCards(
    customCardTitles = cardTitles,
    customMoreCardTitles = moreCardTitles,
  ) {
    this.verifyCardTitles(customCardTitles);
    this.verifyCardTitles(customMoreCardTitles, 'Feature-ul');
  }

  verifyHomepageCardLink(linkName, linkUrl) {
    cy.get('a')
      .contains(linkName, { matchCase: false })
      .should('exist')
      .then(($el) => {
        cy.wrap($el).invoke('attr', 'href').should('include', linkUrl);
      });
  }

  verifyLetUsKnowLink(link = letUsKnowLink) {
    cy.contains('a', 'Let us know here!')
      .should('exist')
      .and('have.attr', 'href', link);
  }

  goToBlogPage() {
    cy.get('[data-testid="Navbar-main"]').contains('Blog').click();
    return new BlogPage();
  }

  goToDocsPage() {
    cy.get('[data-testid="Navbar-main"]').contains('Docs').click();
    return new DocsPage();
  }

  goToCaseStudiesPage() {
    cy.contains('a', 'Case Studies').click();
    return new CaseStudiesPage();
  }

  goToToolsPage() {
    cy.get('[data-testid="Navbar-main"]').contains('Tools').click();
    return new ToolsPage();
  }

  goToCommunityPage() {
    cy.get('[data-testid="Navbar-main"]').contains('Community').click();
    return new CommunityPage();
  }

  goToRoadmapPage() {
    cy.contains('a', 'Roadmap').click();
    return new RoadmapPage();
  }
}

export default HomePage;
