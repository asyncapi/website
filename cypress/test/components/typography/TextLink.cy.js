import TextLink from '../../../../components/typography/TextLink'
describe('TextLink Component', () => {
    it('renders a Textlink with the provided props and content', () => {
      const href = '/test';
      const className = 'custom-class';
      const target = '_blank';
      const id = 'test-link';
      const children = 'Test Link';
  
      cy.mount(
        <TextLink href={href} className={className} target={target} id={id}>
          {children}
        </TextLink>
      );
  
      cy.get('[data-testid="TextLink-href" ]')
        .should('have.attr', 'href', href)
        .should('have.class', 'text-secondary-500')
        .should('have.class', 'underline')
        .should('have.class', 'hover:text-gray-800')
        .should('have.class', 'font-medium')
        .should('have.class', 'transition')
        .should('have.class', 'ease-in-out')
        .should('have.class', 'duration-300')
        .should('have.class', className)
        .should('have.attr', 'target', target)
        .should('have.attr', 'rel', 'noreferrer noopener')
        .should('have.attr', 'id', id)
        .should('contain', children);
    });
  });
  