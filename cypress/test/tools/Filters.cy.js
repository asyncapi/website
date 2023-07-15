import React from 'react';
import { mount } from 'cypress/react';
import Filters from '../../../components/tools/Filters';
import ToolFilter from '../../../context/ToolFilterContext';
import MockRouter from '../../utils/router';

describe('Filters Component', () => {
  //filter types and their data-testid attributes
  const filterTypes = [
    { name: 'Language', id: 'Filters-Language-dropdown' },
    { name: 'Technology', id: 'Filters-Technology-dropdown' },
    { name: 'Category', id: 'Filters-Category-dropdown' },
  ];

  // helper function to select filters from a dropdown
  const selectFilters = (filterType) => {
    cy.get(`[data-testid="${ filterType.id }"]`).click();
  };

  // helper function to verify the applied filters
  const verifyFilters = (filterType) => {
    // chck that applied filters contain the selected filters from the dropdown
    cy.get('[data-testid="Applied-filters"]').should('exist'
    );
  };

  beforeEach(() => {
    mount(
      <MockRouter>
        <ToolFilter>
          <Filters setOpenFilter={ () => { } } />
        </ToolFilter>
      </MockRouter>
    );
  });

  it('renders correctly', () => {
    cy.get('[data-testid="Filters-div"]').should('exist');
    cy.get('.bg-gray-200').should('have.length', 6);
    cy.get('.flex').should('have.length', 17);
  });

  filterTypes.forEach((filterType) => {
    it(`allows selecting and displaying ${ filterType.name } options`, () => {
      // Using helper function to select filters from the dropdown
      selectFilters(filterType);
    });
  });

  it('allows selecting filters and applying them', () => {
    filterTypes.forEach((filterType) => {
      selectFilters(filterType);
    });
   cy.get('.w-full').click({ multiple: true },{force:true});
    // Using helper function to verify the applied filters for each type
    filterTypes.forEach((filterType) => {
      verifyFilters(filterType);
    });
  });
});
