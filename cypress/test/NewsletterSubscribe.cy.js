import React from 'react';
import { mount } from 'cypress/react';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';

const NewsletterConstants = ["Subscribe to our newsletter" ,"We respect your inbox. No spam, promise ✌️"]
describe('NewsletterSubscribe Component', () => {
  it('renders the component with default props', () => {
    mount(<NewsletterSubscribe />);

    cy.get('[data-testid="NewsletterSubscribe-div"]').should('exist');
    cy.contains(NewsletterConstants[0]).should('exist');
    cy.contains(NewsletterConstants[1]).should('exist');
    cy.get('form[name="form 1"]').should('exist');
    cy.get('input[name="type"]').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="email"]').should('exist');
   
  });
});
