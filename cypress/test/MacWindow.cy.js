import React from 'react';
import { mount } from 'cypress/react';
import MacWindow from '../../components/MacWindow';

describe('MacWindow Component', () => {
  it('renders the component props', () => {
    const className = 'my-mac-window';
    const contentClassName = 'my-content';
    const title = '';
    const children = '';
    mount(
      <MacWindow
        className={className}
        contentClassName={contentClassName}
        title={title}
      >
        {children}
      </MacWindow>
    );
    cy.get('[data-testid="MacWindow-main"]')
      .should('have.class', className)
      .within(() => {
        cy.get('[data-testid="MacWindow-div"]').should('exist');

        cy.get('[data-testid="MacWindow-div"]').within(() => {
          cy.get('div').should('have.length', 3);
        });
        cy.get('[data-testid="MacWindow-title-div"]')
          .should('exist')
          .and('have.attr', 'title', title)
          .and('have.text', title);
        cy.get('[data-testid="MacWindow-title"]').should('exist').and('have.length', 1);
      });
  });
});
