import BasePage from './BasePage';

class BlogPage extends BasePage {
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  }

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
    cy.get('[data-testid="FilterDropdown-option"]').should('be.visible');
    cy.contains('[data-testid="FilterDropdown-option"]', new RegExp(`^${this.escapeRegExp(type)}$`)).click();
  }

  filterByAuthor(author) {
    cy.contains('[data-testid="FilterDropdown-button"]', 'Filter by authors').click();
    cy.get('[data-testid="FilterDropdown-option"]').should('be.visible');
    cy.contains('[data-testid="FilterDropdown-option"]', new RegExp(`^${this.escapeRegExp(author)}$`)).click();
  }

  filterByTag(tag) {
    cy.contains('[data-testid="FilterDropdown-button"]', 'Filter by tags').click();
    cy.get('[data-testid="FilterDropdown-option"]').should('be.visible');
    cy.contains('[data-testid="FilterDropdown-option"]', new RegExp(`^${this.escapeRegExp(tag)}$`)).click();
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

  selectFirstValidDropdownOption(dropdownLabel, optionType) {
    cy.contains('[data-testid="FilterDropdown-button"]', dropdownLabel).click();
    cy.get('[data-testid="FilterDropdown-option"]', { timeout: 10000 })
      .should('have.length.greaterThan', 1)
      .should('be.visible')
      .then(($options) => {
        const firstSelectable = [...$options].find((option) => {
          const label = option.textContent?.trim();
          return label && !label.startsWith('Filter by');
        });

        expect(firstSelectable, `first selectable ${optionType} option`).to.exist;
        cy.wrap(firstSelectable).click();
      });
  }

  filterByFirstAvailableAuthor() {
    cy.get('[data-testid="BlogPostItem-Link"]', { timeout: 10000 }).should('have.length.greaterThan', 0);
    this.selectFirstValidDropdownOption('Filter by authors', 'author');
  }

  filterByFirstAvailableTag() {
    cy.get('[data-testid="BlogPostItem-Link"]', { timeout: 10000 }).should('have.length.greaterThan', 0);
    this.selectFirstValidDropdownOption('Filter by tags', 'tag');
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
