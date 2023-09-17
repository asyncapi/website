import { mount } from 'cypress/react'
import AlgoliaSearch from '../../../components/AlgoliaSearch'
import { SearchButton } from '../../../components/AlgoliaSearch';


describe('AlgoliaSearch component', () => {
  it('renders without errors', () => {
    mount(
      <AlgoliaSearch>
        <SearchButton>Search</SearchButton>
      </AlgoliaSearch>
    )
  })

  it('performs search for a specific page', () => {
    mount(
      <AlgoliaSearch>
        <SearchButton>Open Search</SearchButton>
      </AlgoliaSearch>
    );
    cy.get('button').click(); // Open the search modal
    cy.get('input[placeholder="Search resources"]').type('welcome')
    cy.should('have.value', 'welcome')
    // Check if the docsearch-list element contains the text 'Welcome'
    cy.get('#docsearch-list').contains('Welcome')
  });
});