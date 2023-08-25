import React from 'react';
import { mount } from 'cypress/react';
import GoodFirstIssuesTip from '../../../../components/dashboard/GoodFirstIssuesTip';

describe('GoodFirstIssuesTip', () => {
  beforeEach(() => {
    mount(<GoodFirstIssuesTip />);
  });

  it('toggles the tip when hovering over the icon', () => {
    cy.get('[data-testid="GoodFirstIssuesTip-hover-icon"]').click({ force: true });
  });

  it('renders the tip content with the correct text', () => {
    cy.get('[data-testid="GoodFirstIssuesTip-hover-icon"]').click({ force: true });
    //checking for the available class here
    cy.get('.bg-white').should('have.css', 'visibility', 'visible');

    cy.contains('Is this your first contribution?').should('exist');
    cy.contains('The issues in this column are perfect for you!').should(
      'exist'
    );
    cy.contains(
      'These issues are of low-complexity and should be a quick commit.'
    ).should('exist');
    cy.contains('Thanks for your help, and welcome!').should('exist');
  });
});