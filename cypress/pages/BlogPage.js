class BlogPage {
  visit() {
    cy.visit('/blog');
  }

  verifyPageLoaded() {
    cy.contains('h1', 'Welcome to our blog!').should('be.visible');
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

  verifyFilteredPostsVisible() {
    cy.get('[data-testid="BlogPostItem-Link"]', { timeout: 10000 }).should(
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
    cy.contains('select', 'Filter by type').select(type);
  }

  filterByAuthor(author) {
    cy.contains('select', 'Filter by authors').select(author);
  }

  filterByTag(tag) {
    cy.contains('select', 'Filter by tags').select(tag);
  }

  verifyPostLinkAndClick(titlePattern, expectedHref) {
    cy.contains('h5', titlePattern)
      .closest('a')
      .should('have.attr', 'href', expectedHref)
      .click();
  }

  verifyPostHeader(expectedHeaderText) {
    cy.get('[data-testid="BlogLayout-main"]')
      .should('be.visible')
      .and('contain', expectedHeaderText);
  }

  filterByFirstAvailableAuthor() {
    cy.get('[data-testid="BlogPostItem-Link"]', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.contains('select', 'Filter by authors').find('option', { timeout: 10000 }).should('have.length.greaterThan', 1);
    cy.contains('select', 'Filter by authors').find('option').then(($options) => {
      const nonEmptyOptions = [...$options].filter(opt => opt.value && opt.value !== '');
      expect(nonEmptyOptions.length, 'No author filter options available').to.be.greaterThan(0);
      cy.contains('select', 'Filter by authors').select(nonEmptyOptions[0].value);
    });
  }

  filterByFirstAvailableTag() {
    cy.get('[data-testid="BlogPostItem-Link"]', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.contains('select', 'Filter by tags').find('option', { timeout: 10000 }).should('have.length.greaterThan', 1);
    cy.contains('select', 'Filter by tags').find('option').then(($options) => {
      const nonEmptyOptions = [...$options].filter(opt => opt.value && opt.value !== '');
      expect(nonEmptyOptions.length, 'No tag filter options available').to.be.greaterThan(0);
      cy.contains('select', 'Filter by tags').select(nonEmptyOptions[0].value);
    });
  }

  clickFirstVisiblePost() {
    cy.get('[data-testid="BlogPostItem-Link"]').first().click();
  }

  verifyPostDetailPageLoaded() {
    cy.get('[data-testid="BlogLayout-main"]').should('be.visible');
    cy.url().should('include', '/blog/');
  }
}

export default BlogPage;
