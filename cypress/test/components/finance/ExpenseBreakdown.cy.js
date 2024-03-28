import { mount } from 'cypress/react';
import ExpenseBreakdown from '../../../../components/FinancialSummary/ExpenseBreakdown';

describe('ExpenseBreakdown Component', () => {
  beforeEach(() => {
    mount(<ExpenseBreakdown />);
  });

  it('renders the heading', () => {
    cy.contains('Expense Breakdown');
  });

  it('renders six expense breakdown sections with images and content', () => {
    cy.get('.grid-cols-1 > div').should('have.length', 6);

    // Section 1: Mentorship Program
    cy.get('img[alt="Mentorship Program"]').should('be.visible');
    cy.get('h2').eq(1).should('have.text', 'Mentorship Program');

    // Section 2: Bounty Program
    cy.get('img[alt="Bounty Program"]').should('be.visible');
    cy.get('h2').eq(2).should('have.text', 'Bounty Program');

    // Section 3: Events
    cy.get('img[alt="Events"]').should('be.visible');
    cy.get('h2').eq(3).should('have.text', 'Events');

    // Section 4: Swag Store
    cy.get('img[alt="Swag Store"]').should('be.visible');
    cy.get('h2').eq(4).should('have.text', 'Swag Store');

    // Section 5: Hiring
    cy.get('img[alt="Hiring"]').should('be.visible');
    cy.get('h2').eq(5).should('have.text', 'Hiring');

    // Section 6: Services
    cy.get('img[alt="Services"]').should('be.visible');
    cy.get('h2').eq(6).should('have.text', 'Services');

  });


  it('contains a link in the "Hiring" section', () => {
    cy.get('a').should('have.attr', 'href', 'https://www.linkedin.com/in/v-thulisile-sibanda/');
  });

});
