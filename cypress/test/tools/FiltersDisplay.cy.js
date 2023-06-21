import React from 'react';
import { mount } from '@cypress/react';
import FiltersDisplay from '../../../components/tools/FiltersDisplay';

describe('FiltersDisplay', () => {
  it('should render selected filters correctly', () => {
    const checkedValues = ['Filter1', 'Filter2', 'Filter3'];
    const setValues = cy.stub().as('setValues');
    
    mount(
      <FiltersDisplay checkedValues={checkedValues} setValues={setValues} />
    ).then(() => {
      cy.get('.max-w-lg > div').should('have.length', checkedValues.length);
      checkedValues.forEach((filter) => {
        cy.contains('.max-w-lg > div', filter).should('exist');
      });
    });
  });

  it('should remove selected filter on filter click', () => {
    let checkedValues = ['Filter1', 'Filter2', 'Filter3'];
    let setValues = cy.stub().as('setValues');
    
    mount(
      <FiltersDisplay checkedValues={checkedValues} setValues={setValues} />
    ).then(() => {
      cy.get('.max-w-lg > div').should('have.length', checkedValues.length);
      
      cy.get('.max-w-lg > div')
        .first()
        .find('button')
        .click();
        
      cy.wrap(setValues).should('have.been.calledOnceWith', ['Filter2', 'Filter3']);
  
      
    
    });
  });
});
