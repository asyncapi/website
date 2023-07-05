import {mount} from 'cypress/react'
import MenuBlocks from '../../../components/navigation/MenuBlocks';
describe('MenuBlocks', () => {
    it('renders the menu blocks with correct data', () => {
      const items = [
        {
          title: 'Menu Item 1',
          description: 'Description for Menu Item 1',
          href: 'http://example.com',
          comingSoon: false,
          beta: true,
          className: 'custom-class',
          icon: () => <svg></svg>, 
        },
       
      ];
  
      mount(<MenuBlocks items={items} />);

      cy.get('[data-testid="MenuBlocks-Link"]').should('have.length', items.length); 
      cy.contains('Menu Item 1'); 
      cy.contains('Description for Menu Item 1'); 
   
    });
  });
  