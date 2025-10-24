class RoadmapPage {
  verifyPageLoaded() {
    cy.contains('h1', 'AsyncAPI becomes the #1 API specification for defining and developing APIs.').should('be.visible');
  }
}
export default RoadmapPage;
