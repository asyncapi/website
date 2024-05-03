import React from 'react';
import { mount } from '@cypress/react';
import Banner from '../../../../components/campaigns/Banner';

// .skip should be removed once the Banner component is rendered in the website with default functionalities
describe('Banner Component', () => {
  it.skip('should not render the banner when the date is not within the valid range', () => {
    const today = new Date();
    const [day,  month, year] = [today.getUTCDate(),  today.getUTCMonth(),  today.getUTCFullYear()];
    if (year > 2022 || month !== 10 || day < 6) {
      mount(<Banner />);
      cy.get('[data-testid="Banner-main-div"]').should('not.exist');

    } else {
      mount(<Banner />);
      cy.get('[data-testid="Banner-main-div"]').should('be.visible');

    }
  });

  it.skip('should render the banner when the date is within the valid range', () => {
    const mockDate = new Date(2021, 10, 12).getTime();
    cy.clock(mockDate);
    mount(<Banner />);
    cy.get('[data-testid="Banner-main-div"]').should('be.visible');
  });

  it.skip('should display the correct message when the date is within the valid range', () => {
    const mockDate = new Date(2021, 10, 12).getTime();
    cy.clock(mockDate);
    mount(<Banner />);
    cy.contains('.font-medium', 'AsyncAPI Conference 2022 has ended').should('be.visible');
  });

  it.skip('should have a link to the recordings playlist', () => {
    const mockDate = new Date(2021, 10, 12).getTime();
    cy.clock(mockDate);
    mount(<Banner />);
    cy.get('[data-testid="Banner-link"]')
      .should('have.attr', 'href', 'https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');
  });

  it.skip('should have the max-w-screen-xl class in the div element', () => {
    const mockDate = new Date(2021, 10, 12).getTime();
    cy.clock(mockDate);
    mount(<Banner />);
    cy.get('.max-w-screen-xl').should('exist');
  });
});
