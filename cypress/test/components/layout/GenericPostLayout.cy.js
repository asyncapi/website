import MockRouter from '../../../utils/router'
import GenericPostLayout from '../../../../components/layout/GenericPostLayout';
describe('Generic Post Layout Component', () => {
  beforeEach(() => {
    cy.fixture('blogpost.json').as('blogsData');
  });
  
  it('renders correct component', () => {
    cy.get('@blogsData').then((blogsData) => {
      cy.mount(
        <MockRouter pathname="/blog/2020-summary">
          <GenericPostLayout post={ blogsData } />
        </MockRouter>
      );
      cy.get('[data-testid="GenericPostLayout-main-div"]').should('exist');
      cy.get('[data-testid="GenericPostLayout-Head"]').should('exist');
    });
  });

  it('renders Error Page when post is not found ', () => {
    cy.mount(
      <MockRouter pathname="/blog/2020-summary">
        <GenericPostLayout />
      </MockRouter>
    );
  });
});
