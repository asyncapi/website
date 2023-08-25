import React from 'react';
import { mount } from '@cypress/react';
import Container from '../../../../components/layout/Container';

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

  it('applies fluid wide correctly', () => {
      mount(
        <Container fluid wide>
          <p>Children content</p>
        </Container>
    );
    cy.get('[data-testid="Container-main"]').should('exist');
    cy.get('[data-testid="Container-main"]').should('not.have.class', 'max-w-screen-xl');

  });

  it('applies wide and padding correctly', () => {
    mount(
      <Container wide padding="px-6">
        <p>Children content</p>
      </Container>
    );
    cy.get('[data-testid="Container-main"]').should('exist');
    cy.get('[data-testid="Container-main"]').should('have.class', 'max-w-screen-xl');
    cy.get('[data-testid="Container-main"]').should('have.class', 'px-6');
    cy.get('[data-testid="Container-main"]').should('not.have.class', 'max-w-4xl');
  });

  it('applies flex and flexReverse correctly', () => {
    mount(
      <Container flex flexReverse>
        <p>Children content</p>
      </Container>
    );
    cy.get('[data-testid="Container-main"]').should('exist');
    cy.get('[data-testid="Container-main"]').should('have.class', 'md:flex-row-reverse');
  });

});
