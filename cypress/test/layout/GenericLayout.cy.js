import MockRouter from '../../utils/router';
import GenericLayout from '../../../components/layout/GenericLayout';
describe('GenericLayout Component', () => {
  it('renders correct GenericLayout component', () => {
    cy.mount(
      <MockRouter asPath="/">
        {' '}
        <GenericLayout
          title="Test Title"
          description="Test Description"
          image="test-image.jpg"
          wide={false}
          hideBanner={true}
        />
      </MockRouter>
    );
    cy.get('[data-testid="GenericLayout"]').should('exist');
    cy.get('[data-testid="Generic-main"]').should('exist');
  });
});
