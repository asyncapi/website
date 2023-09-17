import {mount} from 'cypress/react'
import MenuBlocks from '../../../../components/navigation/MenuBlocks';
import learningItems from '../../../../components/navigation/learningItems';
describe('MenuBlocks', () => {
    it('renders the menu blocks with correct data', () => {

      mount(<MenuBlocks items={learningItems} />);

      cy.get('[data-testid="MenuBlocks-Link"]').should('have.length', learningItems.length); 
      cy.get('[data-testid="MenuBlock-icon"]').should('exist');
    });
  });
  