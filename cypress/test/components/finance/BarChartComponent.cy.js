import { mount } from '@cypress/react';
import BarChartComponent from '../../../../components/FinancialSummary/BarChartComponent';

describe('BarChartComponent', () => {
  beforeEach(() => {
    mount(<BarChartComponent />);
  });

  it('renders without crashing', () => {
    cy.get('h1#budget-analysis').should('have.text', 'Budget Analysis');
    cy.contains('Gain insights into the allocation of funds across different categories through our Budget Analysis');
    cy.get('div').contains('Expenses').should('exist');
    cy.get('div').contains('Budget Analysis').should('exist');
  });

  it('filters data by category and month', () => {
    cy.get('select').first().should('have.value', 'All Categories');
    cy.get('select').eq(1).should('have.value', 'All Months');
  });

  it('handles resizing', () => {
    cy.viewport(1200, 800);
    cy.get('text').should('exist');
  });

  it('displays expenses card on small screens', () => {
    cy.viewport(500, 800);
    cy.get('.bg-slate-100').should('exist');
  });

});
