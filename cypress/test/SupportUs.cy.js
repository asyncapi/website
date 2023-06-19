import { mount } from 'cypress/react';
import SupportUs from '../../components/SupportUs'
import { supportItems } from '../../components/SupportUs';

describe('SupportUs Component', () => {
  it('should render support items with correct attributes', () => {
    mount(<SupportUs />);
    
    cy.get('[data-testid="SupportUs-link"]').each(($item, index) => {
      const supportItem = supportItems[index];
      cy.wrap($item).should('have.attr', 'href', supportItem.href);
      cy.wrap($item).should('have.attr', 'target', supportItem.target);
      cy.wrap($item).should('have.attr', 'rel', supportItem.rel);
      
        
      cy.get('[data-testid="SupportUs-img"]', { withinSubject: $item }).should('have.attr', 'src', supportItem.src);
      cy.get('[data-testid="SupportUs-img"]', { withinSubject: $item }).should('have.attr', 'title', supportItem.title);
    });
  });
});
