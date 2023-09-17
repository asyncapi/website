import React from 'react';
import { mount } from 'cypress/react';
import InlineHelp from '../../../components/InlineHelp';

describe('InlineHelp', () => {
  it('toggles help text visibility on click and hover', () => {
    const text = 'Helpful information';
    mount(<InlineHelp text={ text } />);
    cy.get('[data-testid="InlineHelp"]').should('not.exist');
    // Click on the question mark icon to show text
    cy.get('[data-testid="InlineHelp-icon"]').click();
    // Click on the question mark icon again to hide text
    cy.get('[data-testid="InlineHelp-icon"]').click();
    // Hover the question mark icon to show text
    cy.get('[data-testid="InlineHelp-icon"]').trigger('mouseover');
    // Move the cursor away from the question mark icon to hide text
    cy.get('[data-testid="InlineHelp-icon"]').trigger('mouseout');

  });
});
