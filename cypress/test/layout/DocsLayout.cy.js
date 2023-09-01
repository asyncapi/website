import DocsLayout from '../../../components/layout/DocsLayout'
import MockRouter from '../../utils/router'
describe('DocsLayout Component', () => {
  beforeEach(() => {
    cy.fixture('docspost.json').as('docsData');
  });
  it('renders correct DocsLayout component', () => {
    cy.get('@docsData').then((docsData) => {
    cy.mount(
      <MockRouter asPath="/docs/concepts">
        <DocsLayout post={docsData} />
      </MockRouter>,
    )
    cy.get('[data-testid="DocsLayout-main"]').should('exist');
  })
})

  it('renders Error Page , if post is not found ', () => {
    cy.mount(
      <MockRouter>
        <DocsLayout />
      </MockRouter>,
    )
  })
})
