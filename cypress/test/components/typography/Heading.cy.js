
import Heading from '../../../../components/typography/Heading'
describe('Heading Component', () => {
    beforeEach(() => {
      cy.mount(<Heading>Default Heading</Heading>);
    });
  
    it('renders the heading with the  default props', () => {
      cy.get('h2').should('have.class', 'text-primary-800');
      cy.get('h2').should( 'have.class','font-heading text-heading-md font-bold tracking-heading md:text-heading-lg' );
      cy.get('h2').should('contain', 'Default Heading');
    });
  
    it('renders the heading with custom props', () => {
      cy.mount(
        <Heading typeStyle="heading-sm-semibold" level="h3" textColor="text-red-500">
          Heading with custom styles
        </Heading>
      );
     cy.get('h3').should('have.class', 'text-red-500');
      cy.get('h3').should( 'have.class','font-heading text-heading-sm font-semibold tracking-heading');
      cy.get('h3').should('contain', 'Heading with custom styles');
    });
  });
  