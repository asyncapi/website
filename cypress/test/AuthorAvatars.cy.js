import React from 'react';
import { mount } from 'cypress/react'
import AuthorAvatars from '../../components/AuthorAvatars';

describe('AuthorAvatars', () => {
  const authors = [
    {
      name: 'John Doe',
      photo: 'https://example.com/john-doe.jpg',
      link: 'https://example.com/john-doe'
    },
    {
      name: 'Jane Smith',
      photo: 'https://example.com/jane-smith.jpg',
      link: 'https://example.com/jane-smith'
    }
  ];


  it('renders the author avatars without links', () => {
    const authorsWithoutLinks = [
      {
        name: 'John Doe',
        photo: 'https://example.com/john-doe.jpg',
        link: null
      },
      {
        name: 'Jane Smith',
        photo: 'https://example.com/jane-smith.jpg',
        link: null
      },
    ];
    mount(<AuthorAvatars authors={authorsWithoutLinks} />);
    authorsWithoutLinks.forEach((author, index) => {
      cy.get('[data-testid="AuthorAvatars-link"]')
        .should('not.exist');

      cy.get('[data-testid="AuthorAvatars-img"]')
        .eq(index)
        .should('have.attr', 'src', author.photo)
        .should('have.attr', 'title', author.name)
        .should('have.class', index > 0 ? `absolute left-${index * 7} top-0` : `relative mr-${(authorsWithoutLinks.length - 1) * 7}`)
        .should('have.class', `z-${(authorsWithoutLinks.length - 1 - index) * 10}`)
        .should('have.class', 'h-10 w-10 border-2 border-white rounded-full object-cover hover:z-50');
    });
  });

 
 
  it('renders the author avatars with links', () => {
    mount(<AuthorAvatars authors={authors} />);
    authors.forEach((author, index) => {
      cy.get(`[data-testid="AuthorAvatars-link"][alt="${author.name}"][href="${author.link}"]`)
        .should('have.length', 1)
        .within(() => {
          cy.get('[data-testid="AuthorAvatars-img"]')
            .should('have.attr', 'src', author.photo)
            .should('have.attr', 'title', author.name)
            .should('have.class', index > 0 ? `absolute left-${index * 7} top-0` : `relative mr-${(authors.length - 1) * 7}`)
            .should('have.class', `z-${(authors.length - 1 - index) * 10}`)
            .should('have.class', 'h-10 w-10 border-2 border-white rounded-full object-cover hover:z-50');
        });
    });
  });
});
