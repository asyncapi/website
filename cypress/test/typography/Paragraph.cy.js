import { mount } from '@cypress/react';
import Paragraph from '../../../components/typography/Paragraph';
describe('Paragraph Component', () => {
    beforeEach(() => {
      cy.mount(
        <Paragraph typeStyle="body-lg" textColor="text-gray-700" fontWeight="font-bold">
          Default Paragraph
        </Paragraph>
      );
    });
  
    it('renders the paragraph with the default style', () => {
      cy.get('p').should('have.class', 'text-gray-700');
      cy.get('p').should('have.class', 'text-lg');
      cy.get('p').should('have.class', 'font-bold');
      cy.get('p').should('contain', 'Default Paragraph');
    });
  
    it('renders the paragraph with custom style', () => {
      cy.mount(
        <Paragraph typeStyle="body-md" textColor="text-blue-500" fontWeight="font-semibold">
           Paragraph with custom styles
        </Paragraph>
      );
  
      cy.get('p').should('have.class', 'text-blue-500');
      cy.get('p').should('have.class', 'text-md');
      cy.get('p').should('have.class', 'font-semibold');
      cy.get('p').should('contain', 'Paragraph with custom styles');
    });
  });
  