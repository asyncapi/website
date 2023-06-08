import React from 'react';
import { mount } from '@cypress/react';
import {DocsCards} from '../../../components/docs/DocsCards';
import IconGettingStarted from '../../../components/icons/GettingStarted';
import IconTutorials from '../../../components/icons/Tutorials';
import IconUseCases from '../../../components/icons/UseCases';
import IconGuide from '../../../components/icons/Guide';
import IconSpec from '../../../components/icons/Spec';

const cards = [
    {
      title: 'Concepts',
      description: 'Our Concepts section defines the concepts of AsyncAPI features and capabilities.',
      link: '/docs/concepts',
      className: 'bg-secondary-200',
      Icon: IconGettingStarted,
    },
    {
      title: 'Tutorials',
      description: 'Our Tutorials section teaches beginner processes with AsyncAPI, guiding you from Point A to Point B.',
      link: '/docs/tutorials',
      className: 'bg-pink-100',
      Icon: IconTutorials,
    },
    {
      title: 'Tools',
      description: 'Our Tools section documents the AsyncAPI tools ecosystem.',
      link: '/docs/tools',
      className: 'bg-green-200',
      Icon: IconUseCases,
    },
    {
      title: 'Guides',
      description: "Our Guides section teaches AsyncAPI's capabilities at a high level.",
      link: '/docs/guides',
      className: 'bg-primary-200',
      Icon: IconGuide,
    },
    {
      title: 'Reference',
      description: 'Our Reference section documents the AsyncAPI specification.',
      link: '/docs/reference',
      className: 'bg-yellow-200',
      Icon: IconSpec,
    }
  ];

describe('DocsCards', () => {
  beforeEach(() => {
    mount(<DocsCards />);
  });


  it('renders the correct number of cards', () => {
    cy.get('[data-testid="main-div"] [data-testid="link"]').should('have.length', cards.length);
  });
  
  
   it('renders card titles and descriptions correctly', () => {
    cy.get('[data-testid="main-div"] ').each(($card, index) => {
      const card = cards[index];
      cy.wrap($card).within(() => {
        cy.get('[data-testid="div-contents"]').should('contain', card.title);
        cy.get('[data-testid="div-contents"]').should('contain', card.description);
       
      });
    });
  });
  

  it('navigates to the correct link on card click', () => {
    cy.get('[data-testid="main-div"]').each(($card) => {
      cy.wrap($card).get('[data-testid="link"]').should('exist');
    });
  });

  it('renders each icon correctly', () => {
    cy.get('[data-testid="main-div"] ').each(($card) => {
      cy.wrap($card).get('[data-testid="icon"]').should('exist');
    });
  });
  
  
})
