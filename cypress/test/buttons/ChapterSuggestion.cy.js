import React from 'react';
import { mount } from 'cypress/react';
import ChapterSuggestion from '../../../components/buttons/ChapterSuggestion';
describe('ChapterSuggestion', () => {
  const chapter = {
    href: 'https://www.asyncapi.com/',
    target: '_self', 
    title: 'Chapter Title',
    description: 'Chapter Description',
    linkText: 'Read More',
    className: 'custom-class',
  };
  beforeEach(() => {
    mount(<ChapterSuggestion {...chapter} />);
  });

  it('renders the ChapterSuggestion component', () => {
    cy.contains(chapter.title).should('exist');
    cy.contains(chapter.description).should('exist');
    cy.contains(chapter.linkText).should('exist');
    cy.get('[data-testid="ChapterSuggestion-link"]').should('have.attr', 'href', chapter.href);
  });

  it('applies the correct className', () => {
    cy.get('[data-testid="ChapterSuggestion-link"]').should('have.class', chapter.className);
  });

  it('sets the target attribute', () => {
    cy.get('[data-testid="ChapterSuggestion-link"]').should('have.attr', 'target', chapter.target);
  });

  it('sets the title attribute', () => {
    cy.get('[data-testid="ChapterSuggestion-link"]').should('have.attr', 'title', chapter.description);
  });

  it('renders the link text and IconArrowRight', () => {
    cy.contains(chapter.linkText).should('exist');
    cy.get('svg').should('have.class', 'h-4');
  });
});
