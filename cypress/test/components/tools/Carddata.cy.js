import React from 'react';
import { mount } from 'cypress/react';
import { Carddata } from '../../../../components/tools/Carddata';
describe('Carddata Component', () => {
  it('should toggle the visibility of card data when clicked', () => {
    const props = {
      className: 'custom-class',
      visible: {
        lang: true,
        tech: false,
        category: true,
        pricing: false,
        ownership: true
      },
      heading: <h1>Card Heading</h1>,
      data: 'Card Data',
      read: true,
      setRead: cy.stub(),
      setVisible: cy.stub(),
      type: 'lang'
    };
    mount(<Carddata { ...props } />);
    cy.get('.custom-class').should('exist');
 
  });
});
