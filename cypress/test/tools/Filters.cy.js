import React from 'react';
import { mount } from 'cypress/react';
import Filters from '../../../components/tools/Filters';
import ToolFilter from '../../../context/ToolFilterContext';
describe('Filters Component', () => {
  it('renders correctly', () => {
    mount(
      <ToolFilter>
        <Filters setOpenFilter={ () => { } } />
      </ToolFilter>
    );

    // Add assertions to verify the rendered elements and their behaviors
    cy.get('[data-testid="Filters-div"]').should('exist');
    cy.get('.bg-gray-200').should('have.length', 6);
    cy.get('.flex').should('have.length', 17);
  });

  it('allows selecting and displaying language options', () => {
    mount(
      <ToolFilter>
        <Filters setOpenFilter={ () => { } } />
      </ToolFilter>
    );

    // Click on the language dropdown
    cy.get('[data-testid="Filters-Language-dropdown"]').click();
  });

  it('allows selecting and displaying technology options', () => {
    mount(
      <ToolFilter>
        <Filters setOpenFilter={ () => { } } />
      </ToolFilter>
    );

    // Click on the technology dropdown
    cy.get('[data-testid="Filters-Technology-dropdown"]').click();
  });

  it('allows selecting and displaying category options', () => {
    mount(
      <ToolFilter>
        <Filters setOpenFilter={ () => { } } />
      </ToolFilter>
    );

    // Click on the category dropdown
    cy.get('[data-testid="Filters-Category-dropdown"]').click();
  });

});
