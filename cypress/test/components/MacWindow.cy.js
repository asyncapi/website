import React from 'react';
import { mount } from 'cypress/react';
import MacWindow from '../../../components/MacWindow';

describe('MacWindow Component', () => {
  it('renders the component props', () => {
    const className = 'bg-code-editor-dark h-full border-gray-800 border shadow-lg transition-all duration-500 ease-in-out';
    const contentClassName = "text-left text-white text-sm font-mono font-medium transition-all duration-500 ease-in-out break-words md:min-h-108";
    const title="asyncapi.yaml";
    const children = 'This is the children component for testing can be replaced';
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
        cy.get('[data-testid="MacWindow-title-center"]').should('exist').and('have.length', 1);
      });
  });
});
