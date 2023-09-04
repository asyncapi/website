import React from 'react';
import { mount } from 'cypress/react';
import CaseStudyCard from '../../components/CaseStudyCard';
import CaseStudiesList from "../../config/case-studies.json";
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
});
