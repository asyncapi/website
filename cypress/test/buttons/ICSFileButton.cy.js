import { mount } from 'cypress/react';
import GoogleCalendarButton from '../../../components/buttons/ICSFileButton';

describe('GoogleCalendarButton', () => {

  it('renders correctly with custom props', () => {
    const customHref = 'https://example.com';
  
    mount(
      <GoogleCalendarButton
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
    mount(<GoogleCalendarButton />);
    cy.contains('Download ICS File').should('be.visible');
  });
});
