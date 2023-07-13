import React from 'react';
import { mount } from '@cypress/react';
import Container from '../../../components/layout/Container';

describe('Container component', () => {
  it('renders children correctly', () => {
    mount(
      <Container fluid flex wide padding="px-2" className="custom-class">
        <p>Children content</p>
      </Container>
    );
    cy.get('[data-testid="Container-main"]').should('exist');

    cy.get('[data-testid="Container-main"]').should(
      'contain.text',
      'Children content'
    );
  });
});
