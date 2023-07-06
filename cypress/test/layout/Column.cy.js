import { mount } from '@cypress/react';
import Column from '../../../components/layout/Column';

describe('Column component', () => {
  it('renders children correctly', () => {
    mount(
      <Column>
        <p>Children content</p>
      </Column>
    );
    cy.get('[data-testid="Column-div"]').should('exist');
    cy.get('[data-testid="Column-div"]').should(
      'have.text',
      'Children content'
    );
  });
});
