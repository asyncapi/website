import { mount } from "cypress/react";
import Meeting from "../../../components/Meeting";
describe('Meeting component', () => {
    it('renders correctly with provided props', () => {
      const props = {
        name: 'Example Meeting',
        purpose: 'Discuss important topics',
        host: 'John Doe',
        hostProfile: 'https://example.com/profile',
        youtube: 'https://www.youtube.com/watch?v=ABC123',
        bg: 'blue',
      };
  
      mount(<Meeting {...props} />);

      cy.get('[data-testid="Meeting-heading"]').should('have.text', 'Example Meeting');
      cy.get('[ data-testid="Meeting-paragraph"]').contains('Discuss important topics');
      cy.get('[ data-testid="Meeting-host"]').contains('Host:');
      cy.get('[ data-testid="Meeting-link"]').should('have.attr', 'href', 'https://www.youtube.com/watch?v=ABC123');

    });
  });
  