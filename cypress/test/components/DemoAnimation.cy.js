import React from 'react';
import { mount } from 'cypress/react';
import DemoAnimation from '../../../components/DemoAnimation';

describe('DemoAnimation', () => {
  it('renders without errors', () => {
    mount(<DemoAnimation />);

    cy.wait(100000);
    cy.contains('Play with it!').should('be.visible');
  });

});
