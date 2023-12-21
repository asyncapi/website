import React from 'react';
import { mount } from 'cypress/react';
import CaseStudyCard from '../../../components/CaseStudyCard';
import CaseStudiesList from '../../../config/case-studies.json';
import AdoptersList from '../../../config/adopters.json';
import Casestudies from '../../../pages/casestudies';

describe('CaseStudyCard Component', () => {

  it('renders the CaseStudyCard component with study data', () => {
    mount(<CaseStudyCard studies={CaseStudiesList} />);

    cy.get('[data-testid="CaseStudyCard-main"]').should('have.length', CaseStudiesList.length); 

    CaseStudiesList.forEach((study, index) => {
      cy.get(`.rounded-md:eq(${index}) img`).should('have.attr', 'src', study.company.logo);
      cy.get(`.rounded-md:eq(${index}) img`).should('have.attr', 'alt', study.company.name);
    });
  });

  it('does not render anything when studies array is empty', () => {
    mount(<CaseStudyCard studies={[]} />);

    cy.get('.rounded-md').should('not.exist');
  });

  //tests for the Adopters section
  it('displays a table with correct columns and AdoptersList data', () => {
    mount(<CaseStudyCard/>);
    cy.get('[data-testid="Adopters"]').should('have.length', AdoptersList.length); 

    cy.get('table')
      .should('exist')
      .within(() => {
        // Check table headers
        cy.get('th').eq(0).should('have.text', 'Company name');
        cy.get('th').eq(1).should('have.text', 'Use Case');
        cy.get('th').eq(2).should('have.text', 'Resources');

        // Check table data
        cy.get('tbody tr').should('have.length', AdoptersList.length);
        AdoptersList.forEach((entry, index) => {
          cy.get('tbody tr').eq(index).find('td').eq(0).should('have.text', entry.companyName);
          cy.get('tbody tr').eq(index).find('td').eq(1).should('have.text', entry.useCase);
        });
      });
  });
});
