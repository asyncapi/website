import { mount } from 'cypress/react';
import Hero from '../../components/Hero';

describe('Hero Component', () => {
  it('displays the correct content', () => {
    mount(<Hero />);

    cy.contains('main.header');
    cy.contains('main.subHeader');
    cy.contains('main.body_pretext');
    cy.contains('main.docs_btn');
    cy.contains('main.search_btn');
    cy.contains('main.slogan_text main.slogan_link');
  });

  it('navigates to the documentation page when "Read the docs" button is clicked', () => {
    mount(<Hero />);
    cy.get('[data-testid="Button-link"]').contains('main.docs_btn');
   
  });

  it('performs a search when the search button is clicked', () => {
    mount(<Hero />);

    cy.get('[data-testid="Search-Button"]').contains('main.search_btn').click();

    // Type a search query and validate the results
    const searchQuery = 'example';
    cy.get('input[type="search"]').type(searchQuery);

  });
});
