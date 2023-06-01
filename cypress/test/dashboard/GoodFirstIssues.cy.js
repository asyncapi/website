import React from 'react';
import { mount } from '@cypress/react';
import Table from '../../../components/dashboard/table/Table'; 
import GoodFirstIssues from '../../../components/dashboard/GoodFirstIssues';


describe('GoodFirstIssues Component', () => {
  const issues = [
    { id: 1, repo: 'Repository 1', area: 'Area 1' },
    { id: 2, repo: 'Repository 2', area: 'Area 2' },
    { id: 3, repo: 'Repository 3', area: 'Area 3' },
   
  ];

  it('renders the GoodFirstIssues component', () => {
    mount(<GoodFirstIssues issues={issues} />);
    // Assert that the component is rendered successfully
    cy.get('.flex').should('exist');
    cy.get(Table).should('exist');
  });

  it('filters issues based on selected repository', () => {
    mount(<GoodFirstIssues issues={issues} />);
    // Select a specific repository
    cy.get('select[name="selectedRepo"]').select('Repository 1');
    // Assert that the table displays the filtered issues
    cy.get(Table).should('contain', 'Repository 3');
    cy.get(Table).should('not.contain', 'Repository 2');
  });

  it('filters issues based on selected area', () => {
    mount(<GoodFirstIssues issues={issues} />);
  });
  

});