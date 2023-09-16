import React from 'react';
import { mount } from 'cypress/react';
import Caption from '../../../components/Caption';

describe('Caption component', () => {
  beforeEach(() => {
    mount(<Caption>AsyncAPI</Caption>);
  });

  it('renders the caption text correctly', () => {
    cy.contains('AsyncAPI').should('be.visible');
  });

  it('check correct CSS classes', () => {
    cy.get('[data-testid="Caption-paragraph"]').should('have.class', 'text-center').and('have.class', 'text-xs')
    .and('have.class', 'text-gray-500')
      .and('have.class', 'mt-2');
  });
});
