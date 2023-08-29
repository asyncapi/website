import {mount} from 'cypress/react';
import SubscribeButton from '../../../components/buttons/SubscribeButton';

describe('Subscribe Button', () => {
    it('renders correctly with default props', () => {
      mount(<SubscribeButton/>);
      cy.contains('subscribeBtn').should('be.visible');
  
});
  
    it('renders correctly with custom props', () => {
      mount(
        <SubscribeButton
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
  