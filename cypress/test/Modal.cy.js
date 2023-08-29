import React from 'react';
import { mount } from 'cypress/react';
import Modal from '../../components/Modal';


describe('Modal', () => {
    it('should call onModalClose when the close button is clicked', () => {
      const onModalClose = cy.stub().as('onModalClose');
      mount(<Modal title="Test Modal" onModalClose={onModalClose} />);
      
      cy.get('[data-testid="Modal-close"]').click({force : true});
  
      cy.get('@onModalClose').should('have.been.calledOnce');
    });
  
    it('should call onModalClose when the backdrop is clicked', () => {
      const onModalClose = cy.stub().as('onModalClose');
      mount(<Modal title="Test Modal" onModalClose={onModalClose} />);
      
      cy.get('.backdrop-blur').click({force : true});
  
      cy.get('@onModalClose').should('have.been.calledOnce');
    });
  
    it('should call onModalClose when the Escape key is pressed', () => {
      const onModalClose = cy.stub().as('onModalClose');
      mount(<Modal title="Test Modal" onModalClose={onModalClose} />);
      
      cy.get('.backdrop-blur').type('{esc}');
  
      cy.get('@onModalClose').should('have.been.calledOnce');
    });
  });