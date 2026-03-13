describe('Blog Page Pagination', () => {
    beforeEach(() => {
        cy.visit('/blog');
    });

    it('should load the blog page successfully', () => {
        cy.contains('Welcome to our blog!').should('be.visible');
    });

    it('should display pagination controls when there are multiple pages', () => {
        cy.get('[data-testid="blog-pagination"]').should('exist');
        cy.get('[data-testid="pagination-previous"]').should('exist');
        cy.get('[data-testid="pagination-next"]').should('exist');
    });

    it('should show "Showing X to Y of Z posts" text', () => {
        cy.get('[data-testid="blog-pagination"]').contains(/Showing \d+ to \d+ of \d+ posts/);
    });

    it('should navigate to page 2 when clicking page 2 button', () => {
        cy.get('[data-testid="pagination-page-2"]').click();
        cy.url().should('include', 'page=2');
    });

    it('should navigate to next page when clicking Next button', () => {
        cy.get('[data-testid="pagination-next"]').click();
        cy.url().should('include', 'page=2');
    });

    it('should disable Previous button on page 1', () => {
        cy.get('[data-testid="pagination-previous"]').should('be.disabled');
    });

    it('should enable Previous button on page 2', () => {
        cy.get('[data-testid="pagination-page-2"]').click();
        cy.get('[data-testid="pagination-previous"]').should('not.be.disabled');
    });



    it('should scroll to top when changing pages', () => {
        // Scroll down first
        cy.scrollTo('bottom');

        // Click next page
        cy.get('[data-testid="pagination-next"]').click();

        // Verify scroll position is near top
        cy.window().its('scrollY').should('be.lessThan', 200);
    });

    it('should handle direct URL navigation to specific page', () => {
        cy.visit('/blog?page=3');
        cy.get('[data-testid="pagination-page-3"]').should('have.attr', 'aria-current', 'page');
    });

    it('should work with filter and pagination URL params combined', () => {
        cy.visit('/blog?type=Community&page=1');
        cy.get('[data-testid="blog-pagination"]').should('exist');
    });

    it('should clear filters and page when clicking Clear filters', () => {
        cy.visit('/blog?type=Community&page=2');
        cy.contains('Clear filters').click();
        cy.url().should('not.include', 'type=');
        cy.url().should('not.include', 'page=');
    });
});
