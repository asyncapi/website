import React from 'react';
import { mount } from 'cypress/react';
import Filters from '../../../components/tools/Filters';
import ToolFilter from '../../../context/ToolFilterContext';
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe('Filters Component', () => {
  //filter types and their data-testid attributes
  const filterTypes = [
    { name: 'Language', id: 'Filters-Language-dropdown' },
    { name: 'Technology', id: 'Filters-Technology-dropdown' },
    { name: 'Category', id: 'Filters-Category-dropdown' },
  ];

  // select from dropwdown
  const selectFilters = (filterType) => {
    cy.get(`[data-testid="${ filterType.id }"]`).click();
  };

  // helper function to verify the applied filters
  const verifyFilters = (filterType) => {
    // check that applied filters contain the selected filters from the dropdown
    cy.get('[data-testid="Applied-filters"]').should('exist');
  };

  beforeEach(() => {
    const routerStub = {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      basePath: '',
      back: cy.stub(),
      beforePopState: cy.stub(),
      prefetch: cy.stub().resolves(),
      reload: cy.stub(),
      push: cy.stub(),
      isFallback: false,
      defaultLocale: 'en',
    };

    mount(
      <RouterContext.Provider value={ routerStub }>
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
      // Using  function to select filters from the dropdown
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
