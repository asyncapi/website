import React from 'react';
import { mount } from 'cypress/react';
import Header from '../../../../components/community/Header';

describe('Header Component', () => {
  it('renders the Header component correctly', () => {
    mount(<Header />);
    cy.get('[data-testid="Header-hero-heading"]').should('exist');
    cy.get('[data-testid="Header-heading-1"]').should('exist');
    cy.get('[data-testid="Header-heading-2"]').should('exist');
    cy.contains('AsyncAPI Discussions').should('exist');

  });

  it('displays the correct text in the Heading components and styles ', () => {
    mount(<Header />);
    cy.get('[data-testid="Header-hero-heading"]').contains('AsyncAPI Community').should('have.class', 'font-bold');
    cy.get('[data-testid="Header-heading-1"]').contains('Welcome to the AsyncAPI Community').should('have.class','title block md:-mt-1 leading-[3rem]');
    cy.get('[data-testid="Header-heading-2"]').contains('We\'re an OSS community').should('have.class','text-slate-500 text-sm')
  });

  it('contains a Button component with the correct props', () => {
    mount(<Header />);
   
    cy.contains('AsyncAPI Discussions')
      .should('have.attr', 'href', 'https://github.com/orgs/asyncapi/discussions')
      .and('have.attr', 'target', '_blank');
      cy.get('[data-testid="Header-IconRocket"]').should('exist');

  });
});
