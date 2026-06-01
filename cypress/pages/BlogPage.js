import BasePage from './BasePage';

class BlogPage extends BasePage {
  visit() {
    super.visit('/blog');
  }

  verifyPageLoaded() {
    this.verifyHeadingExists('Welcome to our blog!');
  }

  verifyHeader() {
    cy.contains('h1', 'Welcome to our blog!').should('be.visible');
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
    cy.contains('[data-testid="FilterDropdown-button"]', 'Filter by type').click();
    cy.contains('[data-testid="FilterDropdown-option"]', type).click();
  }

  filterByAuthor(author) {
    cy.contains('[data-testid="FilterDropdown-button"]', 'Filter by authors').click();
    cy.contains('[data-testid="FilterDropdown-option"]', author).click();
  }

  filterByTag(tag) {
    cy.contains('[data-testid="FilterDropdown-button"]', 'Filter by tags').click();
    cy.contains('[data-testid="FilterDropdown-option"]', tag).click();
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
    cy.contains('[data-testid="FilterDropdown-button"]', 'Filter by authors').click();
    cy.get('[data-testid="FilterDropdown-option"]', { timeout: 10000 }).should('have.length.greaterThan', 1).eq(1).click();
  }

  filterByFirstAvailableTag() {
    cy.get('[data-testid="BlogPostItem-Link"]', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.contains('[data-testid="FilterDropdown-button"]', 'Filter by tags').click();
    cy.get('[data-testid="FilterDropdown-option"]', { timeout: 10000 }).should('have.length.greaterThan', 1).eq(1).click();
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
