import React from 'react';
import { mount } from 'cypress/react';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
describe('NewsletterSubscribe Component', () => {
  it('renders the component with default props', () => {
    mount(<NewsletterSubscribe />);

    cy.get('div.p-8.text-center').should('exist');
    cy.contains('Subscribe to our newsletter').should('exist');
    cy.contains( 'We respect your inbox. No spam, promise ✌️').should('exist');
    cy.get('form[name="form 1"]').should('exist');
    cy.get('input[name="type"]').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="email"]').should('exist');
   
  });
});
