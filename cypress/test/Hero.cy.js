import { mount } from 'cypress/react';
import Hero from '../../components/Hero';

describe('Hero Component', () => {
  it('displays the correct content', () => {
    mount(<Hero />);

    cy.contains('main.header');
    cy.contains('main.subHeader');
    cy.contains('Open-Source tools to easily build and maintain your event-driven architecture.');
    cy.contains('Read the docs');
    cy.contains('Quick search...');
    cy.contains('Proud to be part of the Linux Foundation');
  });

  it('navigates to the documentation page when "Read the docs" button is clicked', () => {
    mount(<Hero />);
    cy.get('[data-testid="Button-link"]').contains('Read the docs');
   
  });

  it('performs a search when the search button is clicked', () => {
    mount(<Hero />);

    cy.get('[data-testid="Search-Button"]').contains('Quick search...').click();

    // Type a search query and validate the results
    const searchQuery = 'example';
    cy.get('input[type="search"]').type(searchQuery);

  });
});
