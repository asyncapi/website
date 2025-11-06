class BlogPage {
  visit() {
    cy.visit('/blog');
  }

  verifyHeader() {
    cy.contains('h1', 'Welcome to our blog!').should('be.visible');
  }

  verifySubmitLink() {
    cy.contains('a', 'Submit yours!')
      .should('be.visible')
      .and('have.attr', 'href')
      .and(
        'include',
        'github.com/asyncapi/website/issues/new?template=blog.md',
      );
  }

  verifyRSSLink() {
    cy.contains('a', 'RSS Feed')
      .should('be.visible')
      .and('have.attr', 'href', '/rss.xml');
  }

  verifyRSSImage() {
    cy.get('img[alt="RSS feed"]')
      .should('be.visible')
      .and('have.attr', 'src', '/img/logos/rss.svg');
  }

  verifyBlogPostsVisible() {
    cy.get('[data-testid="BlogPostItem-Link"]')
      .should('have.length.greaterThan', 0)
      .should('be.visible');
  }

  verifyFilteredPostsVisible() {
    cy.get('[data-testid="BlogPostItem-Link"]').should(
      'have.length.greaterThan',
      0,
    );
  }

  verifyClearFiltersButton() {
    cy.contains('button', 'Clear filters').should('be.visible');
  }

  clickClearFilters() {
    cy.contains('button', 'Clear filters').click();
  }

  verifyNoFilterButton() {
    cy.contains('button', 'Clear filters').should('not.exist');
  }

  filterByType(type) {
    cy.get('[data-testid="Select-form"]').eq(1).select(type);
  }

  filterByAuthor(author) {
    cy.get('[data-testid="Select-form"]').eq(2).select(author);
  }

  filterByTag(tag) {
    cy.get('[data-testid="Select-form"]').eq(3).select(tag);
  }

  verifyPostLinkAndClick(titlePattern, expectedHref) {
    cy.contains('h5', titlePattern)
      .closest('a')
      .should('have.attr', 'href', expectedHref)
      .click();
  }

  verifyPostHeader(expectedHeaderText) {
    cy.get('[data-testid="BlogLayout-main"]').should(
      'have.text',
      expectedHeaderText,
    );
  }

  verifyBlogPostLinkByTitle(title, expectedHref) {
    cy.contains('[data-testid="BlogPostItem-Link"]', title)
      .should('be.visible')
      .and('have.attr', 'href', expectedHref);
  }

  clickBlogPostByTitle(title) {
    cy.contains('[data-testid="BlogPostItem-Link"]', title).click();
  }

  verifyBlogPostHeader(expectedTitle) {
    cy.get('[data-testid="BlogLayout-main"]')
      .should('be.visible')
      .and('contain', expectedTitle);
  }
}

export default BlogPage;
