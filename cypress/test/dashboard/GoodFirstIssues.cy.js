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
    cy.get('[data-testid="GoodFirstIssues-main-div"]').should('exist');
    cy.get(Table).should('exist');
  });

  it('filters issues based on selected repository', () => {
    mount(<GoodFirstIssues issues={issues} />);
    // Select a specific repository , Repo 1 for now 
      const selectedRepo = 'Repository 1';
  
      mount(<GoodFirstIssues issues={issues} />);
  
      // Select the mentioned repository
      cy.get('select[name="selectedRepo"]').select(selectedRepo);
  
      // check that the selected repository is displayed
      cy.contains(selectedRepo).should('exist');
      
      //check if Filter component renders 
      cy.get('[data-testid="GoodFirstIssues-filter-component"]').should('exist'); 

      // check no other repo is displayed
      cy.get('select[name="selectedRepo"] option').should('not.contain', 'Repository 2').and('not.contain', 'Repository 3') 
      
    
  });

  it('filters issues based on selected area', () => {
    mount(<GoodFirstIssues issues={issues} />);
  });
  

});
