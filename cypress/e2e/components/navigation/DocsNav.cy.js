import React from 'react';
import { mount } from 'cypress/react';
import DocsNav from '../../../../components/navigation/DocsNav';
import MockRouter from '../../../utils/router'
import { Docsitem } from '../../../fixtures/navigation-mock';

describe('DocsNav', () => {
  it('renders the nav items with the correct styles and icons', () => {
    const active = '/getting-started/installation';
    mount(
    <MockRouter> <DocsNav item={Docsitem} active={active}  /></MockRouter>
   );
   cy.get('[data-testid="DocsNav-item"]').should('exist');
   cy.get('[data-testid="DocsNav-subitem"]').should('exist');
   cy.get('[data-testid="DocsNav-subitem"]').first().find('span').then(($span) => {
    // Checking the color of the element
    cy.wrap($span).should('have.css', 'color', 'rgb(26, 169, 201)'); // Check for the specific color value on active
  });

  });
});

