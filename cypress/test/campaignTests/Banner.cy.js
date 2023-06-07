import React from 'react';
import { mount } from '@cypress/react';
import Banner from '../../../components/campaigns/Banner';

describe('Banner Component', () => {
  it('should render the banner when the date is within the valid range', () => {
    const today = new Date();
    const day = today.getUTCDate();
    const month = today.getUTCMonth();
    const year = today.getUTCFullYear();

    if (year > 2022 || month !== 10 || day < 6) {
      mount(<Banner />);
      cy.get('[data-cy="main-div-banner"]').should('not.exist');
 
    } else {
      mount(<Banner />);
 
      cy.get('[data-cy="main-div-banner"]').should('be.visible');
    
    }
  });

  it('should display the correct message when the date is within the valid range', () => {
    const today = new Date();
    const day = today.getUTCDate();
    const month = today.getUTCMonth();
    const year = today.getUTCFullYear();

    if (year > 2022 || month !== 10 || day < 6) {
      mount(<Banner />);

      //checking css class that font is medium or not 
      cy.contains('.font-medium', 'AsyncAPI Conference 2022 has ended').should('not.exist');
    } else {
      mount(<Banner />);
 
      cy.contains('.font-medium', 'AsyncAPI Conference 2022 has ended').should('be.visible');
    }
  });

  it('should have a link to the recordings playlist', () => {
    const today = new Date();
    const day = today.getUTCDate();
    const month = today.getUTCMonth();
    const year = today.getUTCFullYear();

    if (year === 2022 && month === 10 && day >= 6) {
      mount(<Banner />);
     
      cy.get('[data-cy="linkTorecordings"]')
        .should('have.attr', 'href', 'https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener noreferrer');
    } else {
      mount(<Banner />);
   
      cy.get('[data-cy="linkTorecordings"]').should('not.exist');
    }
  });


  //check to see if max-w-screen is present or not , for full width element
  it('should have the max-w-screen-xl class in the div element', () => {
    const today = new Date();
    const day = today.getUTCDate();
    const month = today.getUTCMonth();
    const year = today.getUTCFullYear();

    if (year === 2022 && month === 10 && day >= 6) {
      mount(<Banner />);

      //check for max-w-screen-xl class, since it is an imp check
      cy.get('.max-w-screen-xl').should('exist');
     
    } else {
      mount(<Banner />);
      cy.get('.max-w-screen-xl').should('not.exist');
    }
  });


});

