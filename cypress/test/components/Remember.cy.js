import React from 'react';
import { mount } from 'cypress/react';
import Remember from '../../../components/Remember';
import LightBulb from '../../../components/icons/LightBulb';
describe('Remember Component', () => {
  it('renders the component with the provided title and children', () => {
    const title = 'Remember This';
    const className = 'remember';
    const children = <div data-testid="Remember-children">Remember content</div>;
      mount(
      <Remember title={title} className={className}>
        {children}
      </Remember>
    );
  cy.get('[data-testid="Remember-main"]')
      .should('exist')
      .within(() => {
        cy.get('[data-testid="Remember-heading"]')
          .should('have.length', 1)
          .within(() => {
            cy.get(LightBulb).should('exist');
            cy.contains('[data-testid="Remember-title"]', title).should('exist');
          });

        cy.get('[data-testid="Remember-children"]').should('exist');
      });
  });

  it('renders the component with default title and no children', () => {
    const className = 'remember';
    mount(<Remember className={className} />);
    cy.get('[data-testid="Remember-main"]')
      .should('exist')
      .within(() => {
        cy.get('[data-testid="Remember-heading"]').should('have.length', 1).within(() => {
          cy.get(LightBulb).should('exist');
          cy.contains('[data-testid="Remember-title"]', 'Remember').should('exist');
        });
        cy.get('[data-testid="Remember-children"]').should('not.exist');
      });
  });
});
