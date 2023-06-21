import React from 'react';
import { mount } from 'cypress/react';
import ToolDashboard from '../../../components/tools/ToolDashboard';
import { ToolFilterContext } from '../../../context/ToolFilterContext';
describe('ToolDashboard', () => {
  it('renders the ToolDashboard component', () => {
    mount(<ToolDashboard />);
    cy.contains('Filter');
    cy.contains('Jump to Category');
    cy.contains('Search by name');
  });

  it('filters tools based on category', () => {
    mount(<ToolDashboard />);
    cy.get('[data-testid="category-filter"]').click(); // Assuming you have added a data-testid to the category filter element
    cy.contains('Category 1').click(); // Replace 'Category 1' with the actual category option text
    cy.contains('Tool 1'); // Assuming 'Tool 1' is a tool that belongs to 'Category 1'
    cy.contains('Tool 2'); // Assuming 'Tool 2' is a tool that belongs to 'Category 1'
  });

  // Add more test cases as needed
});
