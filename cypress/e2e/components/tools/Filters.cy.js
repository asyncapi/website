import React from 'react';
import { mount } from 'cypress/react';
import Filters from '../../../../components/tools/Filters';
import  { ToolFilterContext } from '../../../../context/ToolFilterContext';
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe('Filters Component', () => {
  const initialContextValues = {
    isPaid: false,
    isAsyncAPIOwner: false,
    languages: ['Javascript'],         // Replace with initial selected languages
    technologies: ['Node.js'],      // Replace with initial selected technologies
    categories: ['APIs'],        // Replace with initial selected categories
  };

  const filterTypes = [
    { name: 'Language', id: 'Filters-Language-dropdown' },
    { name: 'Technology', id: 'Filters-Technology-dropdown' },
    { name: 'Category', id: 'Filters-Category-dropdown' },
  ];

  const selectFilters = (filterType) => {
    cy.get(`[data-testid="${filterType.id}"]`).click({force:true});
  };

  beforeEach(() => {
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
        value={{
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
        }}
      >
        <ToolFilterContext.Provider value={initialContextValues}>
          <Filters setOpenFilter={() => {}} />
        </ToolFilterContext.Provider>
      </RouterContext.Provider>
    );

    // Aliasing the context variables
    cy.wrap(initialContextValues.isPaid).as('isPaid');
    cy.wrap(initialContextValues.isAsyncAPIOwner).as('isAsyncAPIOwner');
    cy.wrap(initialContextValues.languages).as('languages');
    cy.wrap(initialContextValues.technologies).as('technologies');
    cy.wrap(initialContextValues.categories).as('categories');
  });

  it('renders correctly', () => {
    cy.get('[data-testid="Filters-div"]').should('exist');
    cy.get('.bg-gray-200').should('have.length', 6);
  
  });

  filterTypes.forEach((filterType) => {
    it(`allows selecting and displaying ${filterType.name} options`, () => {
      selectFilters(filterType);
      cy.get(`[data-testid="${filterType.id}"]`).should('be.visible');
    });
  });

  it('allows selecting filters and applying them', () => {

    // Check if context variables are updated after applying filters
    cy.get('@isPaid').should('be.false');                 // Replace with expected value
    cy.get('@isAsyncAPIOwner').should('be.false');        // Replace with expected value
    cy.get('@languages').should('deep.equal', ['Javascript']);        // Replace with expected value
    cy.get('@technologies').should('deep.equal', ['Node.js']);     // Replace with expected value
    cy.get('@categories').should('deep.equal', ['APIs']);       // Replace with expected value
    cy.get('[data-testid="Button-main"]').click({force:true});
  });
});
