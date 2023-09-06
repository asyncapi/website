import React from 'react';
import { mount } from 'cypress/react';
import ApplyJobButton from '../../../../components/buttons/ApplyJob';

describe('ApplyJobButton', () => {
  const job = {
    contact: 'https://www.asyncapi.com/',
  };

  beforeEach(() => {
    mount(<ApplyJobButton job={job} />);
  });

  it('renders the ApplyJobButton component', () => {
    cy.contains('Apply for this job').should('exist');
  });

  it('sets the correct href and target attributes', () => {
    cy.get('[data-testid="Button-link"]').should('have.attr', 'href', 'https://www.asyncapi.com/');
    cy.get('[data-testid="Button-link"]').should('have.attr', 'target', '_blank');
  });
});
