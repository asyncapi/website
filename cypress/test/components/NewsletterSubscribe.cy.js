import React from 'react';
import { mount } from 'cypress/react';
import NewsletterSubscribe from '../../../components/NewsletterSubscribe';

describe('NewsletterSubscribe Component', () => {
  it('renders the component with default props', () => {
    mount(<NewsletterSubscribe />);

    cy.get('[data-testid="NewsletterSubscribe-main"]').should('exist');
    cy.get('[data-testid="NewsletterSubscribe-text-input"]').type("name");
    cy.get('[data-testid="NewsletterSubscribe-email-input"]').type("test@gmail.com")
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="email"]').should('exist');
   
  });
});
