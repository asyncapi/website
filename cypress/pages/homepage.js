import CaseStudiesPage from "./CaseStudiesPage";
import RoadmapPage from "./roadmap";
class HomePage{
  visit() {
    cy.visit('/');
  }
  verifyElementIsVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyHeadingExists(headingText) {
    cy.contains('h1, h2, h3, h4, h5, h6', headingText).should('be.visible');
  }

  verifyNavbarLogo() {
    this.verifyElementIsVisible('[data-testid="Navbar-logo"]');
  }

  verifyHeader() {
    this.verifyHeadingExists(
      'Building the future of Event-Driven Architectures (EDA)',
    );
  }

   goToCaseStudiesPage() {
    cy.contains('a', 'Case Studies').click();
    return new CaseStudiesPage();
  }

  goToRoadmapPage() {
    cy.contains('a', 'Roadmap').click();
    return new RoadmapPage();
  }
}

export default HomePage;
