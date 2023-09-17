import MockRouter from '../../../utils/router'
import GenericLayout from '../../../../components/layout/GenericLayout';

describe('GenericLayout Component', () => {
  beforeEach(() => {
    cy.mount(
      <MockRouter asPath="/">
        <GenericLayout
          title="Test Title"
          description="Test Description"
          image="../../../public/img/avatars/ace.webp"
          wide={ false }
          hideBanner={ true }
        />
      </MockRouter>
    );
  });

  it('renders GenericLayout component', () => {
    cy.get('[data-testid="GenericLayout"]').should('exist');
  });

  it('renders Generic-main element', () => {
    cy.get('[data-testid="Generic-main"]').should('exist');
  });
  
  it('does not apply wide class when wide is false', () => {
    cy.get('[data-testid="GenericLayout"]').should('not.have.class', 'wide');
  });

  it('displays banner when hideBanner is false', () => {
    cy.mount(
      <MockRouter asPath="/">
        <GenericLayout
          title="Test Title"
          description="Test Description"
          image="../../../public/img/avatars/ace.webp"
          wide={ false }
          hideBanner={ false }
        />
      </MockRouter>
    );
    cy.get('[data-testid="GenericLayout-banner"]').should('exist');
  });
});
