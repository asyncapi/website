import CaseStudiesPage from './CaseStudiesPage';
import DocsPage from './DocsPage';
import RoadmapPage from './RoadmapPage';
import CommunityPage from './CommunityPage';
import ToolsPage from './ToolsPage';
import BlogPage from './BlogPage';

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
    cy.contains('a', linkName)
      .should('be.visible')
      .should('have.attr', 'href', linkUrl);
  }

  verifyCardTitles(titles, testId = null) {
    titles.forEach((title) => {
      const selector = testId ? `[data-testid="${testId}"]` : '';
      cy.contains(`${selector} h1, h2, h3, h4, h5, h6`, title).should(
        'be.visible',
      );
    });
  }

  verifyNavbarLogo() {
    this.verifyElementIsVisible('[data-testid="Navbar-logo"]');
  }

  verifyHeader() {
    this.verifyHeadingExists(
      'Building the future of Event-Driven Architectures (EDA)',
    );
  }

  verifyGithubStarButton() {
    const selector = '[data-testid="Navbar-main"] [data-testid="Button-link"]';
    this.verifyElementIsVisible(selector);
    this.verifyElementHasAttribute(
      selector,
      'href',
      'https://github.com/asyncapi/spec',
    );
  }

  verifyReadTheDocsButton() {
    cy.get('[data-testid="Button-link"][href="/docs"]').should('be.visible');
  }

  verifyHomepageCards() {
    const cardTitles = [
      'Document APIs',
      'Code Generation',
      'Open Governance',
      'And much more...',
    ];
    const moreCardTitles = ['Specification', 'Community'];

    this.verifyCardTitles(cardTitles);
    this.verifyCardTitles(moreCardTitles, 'Feature-ul');
  }

  verifyHomepageCardLinks() {
    const links = [
      {
        name: 'HTML Template',
        url: 'https://github.com/asyncapi/html-template',
      },
      {
        name: 'React Component',
        url: 'https://github.com/asyncapi/asyncapi-react/',
      },
      { name: 'Generator', url: '/tools/generator' },
      { name: 'Modelina', url: '/tools/modelina' },
      { name: 'Join our Slack', url: 'https://asyncapi.com/slack-invite' },
      {
        name: 'Read more about Open Governance',
        url: '/blog/governance-motivation',
      },
      { name: 'TSC Members', url: '/community/tsc' },
      {
        name: 'View GitHub Discussions',
        url: 'https://github.com/asyncapi/community/discussions',
      },
    ];

    links.forEach((link) => {
      this.verifyLinkExists(link.name, link.url);
    });
  }

  verifyLetUsKnowLink() {
    cy.contains('a', 'Let us know here!')
      .should('be.visible')
      .and(
        'have.attr',
        'href',
        'https://github.com/asyncapi/website/issues/new',
      );
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
