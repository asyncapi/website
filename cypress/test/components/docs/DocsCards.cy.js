import React from 'react';
import { mount } from '@cypress/react';
import { DocsCards } from '../../../../components/docs/DocsCards';
import { buckets } from '../../../../components/data/buckets';

describe('DocsCards', () => {
  beforeEach(() => {
    mount(<DocsCards />);
  });

  const cards = buckets.map((bucket) => ({
    title: bucket.title,
    description: bucket.description,
    link: bucket.link,
    className: bucket.className,
    Icon: bucket.Icon,
  }));

  it('renders the correct number of cards', () => {
    cy.get('[data-testid="Docs-main-div"] [data-testid="Docs-link"]').should('have.length', cards.length);
  });

  it('renders card titles and descriptions correctly', () => {
    cy.get('[data-testid="Docs-main-div"] ').each(($card, index) => {
      const card = cards[index];
      cy.wrap($card).within(() => {
        cy.get('[data-testid="Docs-div-contents"]').should('contain', card.title);
        cy.get('[data-testid="Docs-div-contents"]').should('contain', card.description);
      });
    });
  });

  it('navigates to the correct link on card click', () => {
    cy.get('[data-testid="Docs-main-div"]').each(($card, index) => {
      const card = cards[index];
      cy.wrap($card).get('[data-testid="Docs-link"]').should('have.attr', 'href', card.link);
    });
  });

  it('renders each icon correctly', () => {
    cy.get('[data-testid="Docs-main-div"] ').each(($card, index) => {
      const card = cards[index];
      cy.wrap($card).get('[data-testid="Docs-icon"]').should('exist');
    });
  });
});
