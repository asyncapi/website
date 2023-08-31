import React from 'react';
import { mount } from 'cypress/react';
import CategoryDropdown from '../../../components/tools/CategoryDropdown';
describe('CategoryDropdown', () => {
  beforeEach(() => {
    mount(<CategoryDropdown setopenCategory={ cy.stub().as('setopenCategory') } />);
  });

  it('renders the dropdown menu with category names', () => {
    cy.get('[data-testid="CategoryDropdown-div"]').should('have.class', 'absolute z-10');
    cy.get('[data-testid="CategoryDropdown-div"]')
      .find('[data-testid="CategoryDropdown-link"]')
      .each((categoryLink) => {
        cy.wrap(categoryLink).should('have.attr', 'href').and('match', /^#/);
      });
  });

  it('calls setopenCategory when a category is clicked', () => {
    cy.get('@setopenCategory').as('setopenCategoryStub');
    cy.get('[data-testid="CategoryDropdown-div"]').find('[data-testid="CategoryDropdown-link"]').first().click();
    cy.get('[data-testid="CategoryDropdown-div"]').then(() => {
      cy.get('@setopenCategoryStub').should('have.been.calledOnceWith', false);
    });
  });
});
