class BlogPage {
  verifyPageLoaded() {
    cy.contains('h1', 'Welcome to our blog!').should('be.visible');
  }
}
export default BlogPage;
