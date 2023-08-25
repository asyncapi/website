import {mount} from 'cypress/react'
import GitHubIssue from '../../../../components/buttons/GitHubIssue';
describe('GitHubIssue', () => {
    it('renders correctly with default props', () => {
      mount(<GitHubIssue />);
      cy.contains('Create Issue on GitHub').should('be.visible');
      cy.get('[data-testid="GithubIssue-Link"]')
        .should('have.attr', 'href', 'https://github.com/asyncapi/website/issues/new?assignees=alequetzalli+-&labels=%F0%9F%93%91+docs&template=docs.yml&title=%5B%F0%9F%93%91+Docs%5D%3A+')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener noreferrer');
    });
  
    it('renders correctly with custom class', () => {
      mount(<GitHubIssue className="custom-class" />);
      //data-testid was not working here
      cy.get('.bg-black').should('have.class', 'custom-class');
    });
  });
  