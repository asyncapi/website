import {mount} from 'cypress/react';
import SlackButton from '../../../../components/buttons/SlackButton';
describe('Slack Button', () => {
    it('renders correctly with default props', () => {
      mount(<SlackButton/>);
      cy.contains('Join on Slack').should('be.visible');
      cy.get('[ data-testid="Button-link"]').should('have.attr', 'href', '/slack-invite');
      cy.get('[ data-testid="Button-link"]').should('have.attr', 'target', '_blank');
});
  
    it('renders correctly with custom props', () => {
      mount(
        <SlackButton
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
  