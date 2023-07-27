import {mount} from 'cypress/react';
import DocsButton from '../../../components/buttons/DocsButton';
describe('DocsButton', () => {
  
    it('does not render buttons without post data', () => {
        mount(<DocsButton />);
        cy.get('[data-testid="DocsButton-div"]').should('not.exist');
        cy.get('[data-testid="DocsButton-PrevPage"]').should('not.exist');
        cy.get('[data-testid="DocsButton-div"]').should('not.exist');
        cy.get('[data-testid="DocsButton-NextPage"]').should('not.exist');
      });

    it('renders correctly with post data', () => {
        // mock post object with dummy data
        const post = {
          prevPage: {
            href: 'https://www.asyncapi.com/',
            title: 'Previous Page',
          },
          nextPage: {
            href: 'https://www.asyncapi.com/',
            title: 'Next Page',
          },
        };
        mount(<DocsButton post={post} />);
        cy.get('[data-testid="DocsButton-Prevdiv"]').should('contain', 'Go Back');
        cy.get('[data-testid="DocsButton-PrevPage"]').should('contain', 'Previous Page');
        cy.get('[data-testid="DocsButton-Nextdiv"]').should('contain', 'Up Next');
        cy.get('[data-testid="DocsButton-NextPage"]').should('contain', 'Next Page');
      });
  });
  