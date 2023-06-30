import { mount } from 'cypress/react';
import ToolFilter, { ToolFilterContext } from '../../../context/ToolFilterContext';
import ToolDashboard from '../../../components/tools/ToolDashboard';

describe('ToolDashboard', () => {
  beforeEach(() => {
    // Manually mock the next/router module
    cy.intercept('/_next/static/runtime/main.js', {
      body: `
        // Mock useRouter hook
        const mockRouter = {
          isReady: true,
          query: {},
        };

        export function useRouter() {
          return mockRouter;
        }
      `,
    }).as('mockNextRouter');

    // Mount the ToolDashboard component after mocking the next/router module
    mount(
      <ToolFilter>
        <ToolDashboard />
      </ToolFilter>
    );

    // Wait for the mockNextRouter intercept to complete
    cy.wait('@mockNextRouter');
  });

  it('should render the ToolDashboard component', () => {
    // Assertions to check if the ToolDashboard component is rendered correctly
    cy.get('.tool-dashboard').should('exist');
    cy.get('.filter-button').should('exist');
    cy.get('.category-dropdown').should('exist');
    cy.get('.search-input').should('exist');
    cy.get('.clear-filters').should('not.exist');
    cy.get('.loading-tools').should('not.exist');
    cy.get('.tools-list').should('not.exist');
    cy.get('.no-tools-found').should('not.exist');
  });

  it('should apply filters and display filtered tools', () => {
    // Perform actions to apply filters
    cy.get('.filter-button').click();
    // Apply filter actions

    // Assertions to check if filters are applied correctly and filtered tools are displayed
    cy.get('.clear-filters').should('exist');
    cy.get('.loading-tools').should('not.exist');
    cy.get('.tools-list').should('exist');
    cy.get('.no-tools-found').should('not.exist');
  });

  it('should clear filters and display all tools', () => {
    // Perform actions to clear filters
    cy.get('.clear-filters').click();

    // Assertions to check if filters are cleared and all tools are displayed
    cy.get('.clear-filters').should('not.exist');
    cy.get('.loading-tools').should('not.exist');
    cy.get('.tools-list').should('exist');
    cy.get('.no-tools-found').should('not.exist');
  });

  it('should display no tools found message', () => {
    // Perform actions to apply filters that result in no tools found
    cy.get('.filter-button').click();
    // Apply filter actions that result in no tools found

    // Assertions to check if no tools found message is displayed
    cy.get('.clear-filters').should('exist');
    cy.get('.loading-tools').should('not.exist');
    cy.get('.tools-list').should('not.exist');
    cy.get('.no-tools-found').should('exist');
  });
});
