import {mount} from 'cypress/react';
import GithubButton from '../../../../components/buttons/GithubButton'
describe('GithubButton', () => {
    it('renders correctly with default props', () => {
      mount(<GithubButton />);
      cy.contains('githubButton').should('be.visible');
      cy.get('[ data-testid="Button-link"]').should('have.attr', 'href', 'https://github.com/asyncapi');
      cy.get('[ data-testid="Button-link"]').should('have.attr', 'target', '_blank');
});
  
    it('renders correctly with custom props', () => {
      mount(
        <GithubButton
          text="Custom Text"
          href="https://example.com"
          target="_self"
          iconPosition="right"
          className="custom-class"
          inNav="true"
        />
      );
      cy.contains('Custom Text').should('be.visible');
      cy.get('[data-testid="Button-link"]').should('have.attr', 'href', 'https://example.com');
      cy.get('[data-testid="Button-link"]').should('have.attr', 'target', '_self');
    });
  });
  