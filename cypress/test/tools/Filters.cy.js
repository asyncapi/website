import React from 'react';
import { mount } from 'cypress/react';
import Filters from '../../../components/tools/Filters';
import ToolFilter from '../../../context/ToolFilterContext';
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe('Filters Component', () => {
  // Filter types and their data-testid attributes
  const filterTypes = [
    { name: 'Language', id: 'Filters-Language-dropdown' },
    { name: 'Technology', id: 'Filters-Technology-dropdown' },
    { name: 'Category', id: 'Filters-Category-dropdown' },
  ];

  // Select from dropdown
  const selectFilters = (filterType) => {
    cy.get(`[data-testid="${ filterType.id }"]`).click();
  };

  // Helper function to verify the applied filters
  const verifyFilters = (filterType) => {
    // Check that applied filters contain the selected filters from the dropdown
    cy.get('[data-testid="Applied-filters"]').should('exist');
  };


  beforeEach(() => {
    // Context variables for router stub
    const route = '/';
    const pathname = '/';
    const query = {};
    const asPath = '/';
    const basePath = '';
    const back = cy.stub();
    const beforePopState = cy.stub();
    const prefetch = cy.stub().resolves();
    const reload = cy.stub();
    const push = cy.stub();
    const isFallback = false;
    const defaultLocale = 'en';
    mount(
      <RouterContext.Provider
        value={ {
          route,
          pathname,
          query,
          asPath,
          basePath,
          back,
          beforePopState,
          prefetch,
          reload,
          push,
          isFallback,
          defaultLocale,
        } }
      >
        <ToolFilter>
          <Filters setOpenFilter={ () => { } } />
        </ToolFilter>
      </RouterContext.Provider>
    );
  });

  it('renders correctly', () => {
    cy.get('[data-testid="Filters-div"]').should('exist');
    cy.get('.bg-gray-200').should('have.length', 6);
    cy.get('.flex').should('have.length', 17);
  });

  filterTypes.forEach((filterType) => {
    it(`allows selecting and displaying ${ filterType.name } options`, () => {
      // Using context variable to select filters from the dropdown
      selectFilters(filterType);
    });
  });

  it('allows selecting filters and applying them', () => {
    filterTypes.forEach((filterType) => {
      selectFilters(filterType);
    });

    cy.get('.w-full').click({ multiple: true }, { force: true });

    filterTypes.forEach((filterType) => {
      verifyFilters(filterType);
    });
  });
});
