import React from 'react';
import { mount } from 'cypress/react';
import Hero from '../../../../components/community/Hero'
import orbitData from '../../../../config/orbitData.json'

describe('Hero Component', () => {
  beforeEach(() => {
    mount(<Hero />);
  });

  it('renders the complete component' ,() => {
    cy.get('[data-testid="orbit-div"]').should('exist')
  })
  it('renders the first orbit with orbitData', () => {
    cy.get('[data-testid="Hero-first"]').should('exist');
    cy.get('[data-testid="Hero-firstimg"]').should('have.length', orbitData[0].length);
  });

  it('renders the second orbit with orbitData', () => {
    cy.get('[data-testid="Hero-second"]').should('exist');
    cy.get('[data-testid="Hero-secondimg"]').should('have.length', orbitData[1].length);
  });

  it('renders the third orbit with orbitData', () => {
    cy.get('[data-testid="Hero-third"]').should('exist');
    cy.get('[data-testid="Hero-thirdimg"]').should('have.length', orbitData[2].length);
  });

  
});
