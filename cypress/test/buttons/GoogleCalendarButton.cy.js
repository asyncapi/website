import {mount} from 'cypress/react'
import GoogleCalendarButton from '../../../components/buttons/GoogleCalendarButton'
describe('GoogleCalendarButton', () => {
    it('renders correctly with default props', () => {
      mount(<GoogleCalendarButton />);
      cy.contains('googleCalendarBtn').should('be.visible');
    });
  
    it('renders correctly with custom props', () => {
      mount(
        <GoogleCalendarButton
          text="Custom Text"
          href="https://example.com"
          target="_self"
          iconPosition="right"
          className="custom-class"
        />
      );
      cy.contains('Custom Text').should('be.visible');
      cy.get('[data-testid="Button-link"]').should('have.attr', 'href', 'https://example.com').and('have.attr', 'target', '_self');
    });
  });
  
  