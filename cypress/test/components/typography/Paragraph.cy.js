import Paragraph from '../../../../components/typography/Paragraph';
describe('Paragraph Component', () => {
    beforeEach(() => {
      cy.mount(
        <Paragraph typeStyle="body-lg" textColor="text-gray-700" fontWeight="font-bold">
          Default Paragraph
        </Paragraph>
      );
    });
  
    it('renders the paragraph with the default props', () => {
      cy.get('[data-testid="Paragraph-test" ]').should('have.class', 'text-gray-700');
      cy.get('[data-testid="Paragraph-test" ]').should('have.class', 'text-lg');
      cy.get('[data-testid="Paragraph-test" ]').should('have.class', 'font-bold');
      cy.get('[data-testid="Paragraph-test" ]').should('contain', 'Default Paragraph');
    });
  
    it('renders the paragraph with custom props', () => {
      cy.mount(
        <Paragraph typeStyle="body-md" textColor="text-blue-500" fontWeight="font-semibold">
           Paragraph with custom styles
        </Paragraph>
      );
  
      cy.get('[data-testid="Paragraph-test" ]').should('have.class', 'text-blue-500');
      cy.get('[data-testid="Paragraph-test" ]').should('have.class', 'text-md');
      cy.get('[data-testid="Paragraph-test" ]').should('have.class', 'font-semibold');
      cy.get('[data-testid="Paragraph-test" ]').should('contain', 'Paragraph with custom styles');
    });
  });
  