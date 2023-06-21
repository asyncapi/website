import React from 'react';
import { mount } from 'cypress/react';
import CategoryDropdown from '../../../components/tools/CategoryDropdown';
describe('CategoryDropdown', () => {
  beforeEach(() => {
    mount(<CategoryDropdown setopenCategory={cy.stub().as('setopenCategory')} />);
  });

  it('renders the dropdown menu with category names', () => {
    cy.get('.absolute.z-10').should('exist');
    cy.get('[data-testid="CategoryDropdown-div"]')
      .find('[data-testid="CategoryDropdown-link"]')
      .each((categoryLink) => {
        cy.wrap(categoryLink).should('have.attr', 'href').and('match', /^#/);
      });
  });

  it('calls setopenCategory when a category is clicked', () => {
    cy.get('@setopenCategory').as('setopenCategoryStub');
     // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-testid="CategoryDropdown-div"]').find('[data-testid="CategoryDropdown-link"]') .first() .click().then(() => {
     cy.get('@setopenCategoryStub').should('have.been.calledOnceWith', false);
      });
  });
});
