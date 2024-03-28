import { mount } from 'cypress/react';
import ContactUs from '../../../../components/FinancialSummary/ContactUs';

describe('ContactUs Component', () => {
  beforeEach(() => {
    mount(<ContactUs />);
  });

  it('renders the heading and button', () => {
    cy.get('h1').should('have.text', 'Interested in getting in touch?');
    cy.contains('Contact Us').should('have.attr', 'href', 'mailto:info@asyncapi.io');
  });
  
});
