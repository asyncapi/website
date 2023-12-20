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
  it('renders the Adopters section with adopters data', () => {
    mount(<Casestudies />);
    
    cy.get('[data-testid="Adopters"]').should('exist');

    AdoptersList.forEach((entry, index) => {
      cy.get(`table tbody tr:eq(${index}) td:eq(0)`).should('have.text', entry.companyName);
      cy.get(`table tbody tr:eq(${index}) td:eq(1)`).should('have.text', entry.useCase);

      entry.resources.forEach((resource, resourceIndex) => {
        cy.get(`table tbody tr:eq(${index}) td:eq(2) ul li:eq(${resourceIndex}) a`)
          .should('have.attr', 'href', resource.link)
          .should('have.text', resource.title);
      });
    });
  });

  it('does not render anything when adopters array is empty', () => {
    // Modify Casestudies component to pass an empty AdoptersList
    mount(<Casestudies adopters={[]} />);

    cy.get('table tbody tr').should('not.exist');
  });
});
