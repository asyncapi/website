import React from 'react';
import { mount } from 'cypress/react';
import Warning from '../../../components/Warning';
import IconExclamation from '../../../components/icons/Exclamation';

describe('Warning Component', () => {
  it('renders the component with the provided title and description', () => {
    const className = 'my-warning';
    const title = 'Warning Title';
    const description = 'Warning description text';
    mount(
      <Warning className={className} title={title} description={description} />
    );
    cy.get('[data-testid="Warning-main"]')
      .should('exist')
      .within(() => {
        cy.get(IconExclamation).should('exist');
        cy.contains('[data-testid="Warning-title"]', title).should('exist');
        cy.contains('[data-testid="Warning-description"]', description).should('exist');
      });
  });
});
