import { mount } from 'cypress/react';
import ICSFButton from '../../../components/buttons/ICSFileButton';

describe('ICSFButton', () => {

  it('renders correctly with custom props', () => {
    const customHref = 'https://example.com';
  
    mount(
      < ICSFButton
        text="Custom Text"
        href={customHref}
        target="_self"
        iconPosition="right"
      />
    );
    cy.contains('Custom Text').should('be.visible');
    cy.get('[data-testid="Button-link"]').should('have.attr', 'href', customHref);
    cy.get('[data-testid="Button-link"]').should('have.attr', 'target', '_self');
  });

  it('renders correctly with default props', () => {
    mount(<ICSFButton />);
    cy.contains('icsFileBtn').should('be.visible');
  });
});
