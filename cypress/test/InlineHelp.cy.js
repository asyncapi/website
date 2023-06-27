import React from 'react';
import { mount } from 'cypress/react';
import InlineHelp from '../../components/InlineHelp';

describe('InlineHelp', () => {
    it('toggles help text visibility on click and hover', () => {
      const text = 'Helpful information';
      mount(<InlineHelp text={text} />);
      cy.get('[data-testid="InlineHelp"]').should('not.exist');
  
      // Click on the question mark icon to show text
      cy.get('[data-testid="InlineHelp-icon"]').click(); 
      cy.get('[data-testid="InlineHelp"]').should('be.visible').should('contain', text);
  
      // Click on the question mark icon again to hide text
      cy.get('[data-testid="InlineHelp-icon"]').click();
      cy.get('[data-testid="InlineHelp"]').should('not.exist');
  
      // Hover the question mark icon to show text
      cy.get('[data-testid="InlineHelp-icon"]').trigger('mouseover');
      cy.get('[data-testid="InlineHelp"]').should('be.visible').should('contain', text);
  
      // Move the cursor from the question mark icon to hide text
      cy.get('[data-testid="InlineHelp-icon"]').trigger('mouseout');
      cy.get('[data-testid="InlineHelp"]').should('not.exist');
    });
  });