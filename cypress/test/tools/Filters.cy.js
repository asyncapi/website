import React from 'react';
import { mount } from 'cypress/react';
import Filters from '../../../components/tools/Filters';
import ToolFilter from '../../../context/ToolFilterContext';

describe('Filters Component', () => {
  // Define the filter types and their data-testid attributes
  const filterTypes = [
    { name: 'Language', id: 'Filters-Language-dropdown' },
    { name: 'Technology', id: 'Filters-Technology-dropdown' },
    { name: 'Category', id: 'Filters-Category-dropdown' },
  ];

  // Define a helper function to select filters from a dropdown
  const selectFilters = (filterType) => {
    // Click on the dropdown
    cy.get(`[data-testid="${filterType.id}"]`).click();
    // Select desired filters
    // You can use any selector or logic to choose the filters
    // For example, you can use cy.contains() or cy.get() with a specific index
  };

  // Define a helper function to verify the applied filters
  const verifyFilters = (filterType) => {
    // Assert that the applied filters contain the selected filters from the dropdown
    cy.get('[data-testid="Applied-filters"]').should(
      'contain',
      `Selected ${filterType.name} filters: [Your selected filters]`
    );
  };

  beforeEach(() => {
    // Mount the component before each test case
    mount(
      <ToolFilter>
        <Filters setOpenFilter={() => {}} />
      </ToolFilter>
    );
  });

  it('renders correctly', () => {
    // Add assertions to verify the rendered elements and their behaviors
    cy.get('[data-testid="Filters-div"]').should('exist');
    cy.get('.bg-gray-200').should('have.length', 6);
    cy.get('.flex').should('have.length', 17);
  });

  filterTypes.forEach((filterType) => {
    it(`allows selecting and displaying ${filterType.name} options`, () => {
      // Use the helper function to select filters from the dropdown
      selectFilters(filterType);
      // Add any additional assertions or actions as needed
    });
  });

  it('allows selecting filters and applying them', () => {
    // Use the helper function to select filters from each type
    filterTypes.forEach((filterType) => {
      selectFilters(filterType);
      // Wrap the selected filters in a context variable
      cy.wrap(filterType).as(`${filterType.name}Filters`);
    });
    // Click on the "Apply" button
    cy.get('[data-testid="Button-link"]').click();
    // Use the helper function to verify the applied filters for each type
    filterTypes.forEach((filterType) => {
      // Get the context variable with the selected filters
      cy.get(`@${filterType.name}Filters`).then((selectedFilters) => {
        // Assert that the applied filters match the selected filters
        cy.get('[data-testid="Filters-Apply"]').should(
          'contain',
          `Selected ${filterType.name} filters: ${selectedFilters}`
        );
      });
    });
  });
  
});
