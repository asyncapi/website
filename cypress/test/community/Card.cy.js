import { mount } from 'cypress/react';
import SmallHomeCards from '../../../components/community/Card';
import React from 'react';
import IconArrowUp from '../../../components/icons/ArrowUp';

describe('SmallHomeCards', () => {
  it('renders small card correctly', () => {
    const props = {
      type: 'small',
      icon: <IconArrowUp />,
      tagline: 'Tagline',
      taglineBg: 'bg-gray-100',
      heading: 'Heading',
      description: 'Description',
      bg: 'bg-white',
      btnText: 'Button',
      btnBg: 'bg-gray-200',
      link: '/path'
    };

    mount(
 
        <SmallHomeCards {...props} />
 
    );

    cy.get('[data-testid="heading"]').contains('Heading').should('exist');
    cy.get('[data-testid="desc"]').contains('Description').should('exist');
    cy.get('[data-testid="heading"]').should('have.class','mt-3');
    cy.get('[data-testid="desc"]').should('have.class','mt-2');
  });

  it('renders large card correctly', () => {
    const props = {
      type: 'large',
      icon: <IconArrowUp />,
      tagline: 'Tagline',
      taglineBg: 'bg-gray-100',
      heading: 'Heading',
      description: 'Description',
      bg: 'bg-blue-500',
      btnText: 'Button',
      btnBg: 'bg-gray-200',
      link: '/path'
    };

    mount(
   
        <SmallHomeCards {...props} />
    
    );

    // Assertions
    cy.get('[data-testid="heading-lg"]').contains('Heading').should('exist');
    cy.get('[data-testid="desc-lg"]').contains('Description').should('exist');
    cy.get('[data-testid="heading-lg"]').should('have.class','mt-10');
    cy.get('[data-testid="desc-lg"]').should('have.class','mt-6');
   
    
  });
});
