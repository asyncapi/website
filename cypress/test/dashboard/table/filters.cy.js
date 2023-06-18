import React from 'react';
import { mount } from 'cypress/react'
import Filters from '../../../../components/dashboard/table/Filters';


describe('Filters', () => {
  const sampleIssues = [
    { area: 'Area 1', repo: 'Repo 1' },
    { area: 'Area 2', repo: 'Repo 1' },
    { area: 'Area 1', repo: 'Repo 2' },
    { area: 'Area 2', repo: 'Repo 2' },
  ];

  it('displays the filter menu correctly', () => {

    mount(
      <Filters
        className="test-class"
        issues={sampleIssues}
        allIssues={sampleIssues}
        selectedArea="Area 1"
        selectedRepo="Repo 1"
      />
    );

    // Click on the filter icon to open the menu
    cy.get('[data-testid="Filters-img-container"]').click();

    // Verify that the menu is displayed
    cy.get('div[data-testid="Filter-menu"]').should('be.visible');

    // Verify the heading "Filter Issues"
    cy.contains('h4', 'Filter Issues').should('be.visible');

    // Verify the filter options
    cy.contains('BY REPOSITORY').should('be.visible');
    cy.contains('BY AREA').should('be.visible');

    // Verify that the menu is closed
    cy.get('div[data-testid="Filter-menu"]').should('exist');

  });
});

