import { mount } from 'cypress/react';
import OtherFormsComponent from '../../../../components/FinancialSummary/OtherFormsComponent';

describe('OtherFormsComponent', () => {
  beforeEach(() => {
    mount(<OtherFormsComponent />);
  });

  it('renders the heading', () => {
    cy.contains('Other Forms Of Financial Support');
  });

  it('renders three forms of financial support sections with images and content', () => {
    cy.get('.grid-cols-1 > div').should('have.length', 3);

    // Section 1: Employee Involvement
    cy.get('img[alt="Employee involvement"]').should('be.visible');
    cy.get('h2').eq(1).should('have.text', 'Employee involvement');

    // Section 2: Service Provision
    cy.get('img[alt="Service provision"]').should('be.visible');
    cy.get('h2').eq(2).should('have.text', 'Service provision');

    // Section 3: Event Organization
    cy.get('img[alt="Event organization"]').should('be.visible');
    cy.get('h2').eq(3).should('have.text', 'Event organization');

  });
});
