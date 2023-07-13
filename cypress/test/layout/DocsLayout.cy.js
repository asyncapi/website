import DocsLayout from '../../../components/layout/DocsLayout'
import MockRouter from '../../utils/router'

const post = {
  title: 'Overview',
  weight: 1,
  toc: [
    {
      content: 'Concepts: Define AsyncAPI features and capabilities',
      slug: 'concepts-define-asyncapi-features-and-capabilities',
      lvl: 2,
      i: 0,
      seen: 0,
    },
    {
      content: 'Contribute to AsyncAPI Concepts',
      slug: 'contribute-to-asyncapi-concepts',
      lvl: 2,
      i: 1,
      seen: 0,
    },
    {
      content: 'Docs contributor questions',
      slug: 'docs-contributor-questions',
      lvl: 3,
      i: 2,
      seen: 0,
    },
  ],
  readingTime: 1,
  excerpt:
    'Concepts: Define AsyncAPI features and capabilities\n\nWelcome to AsyncAPI Concepts! Our Concepts section will define the concepts of AsyncAPI features and capabilities.\n\nContribute to AsyncAPI Concepts',
  sectionSlug: '/docs/concepts',
  sectionWeight: 1,
  sectionTitle: 'Concepts',
  rootSectionId: 'concepts',
  id: 'pages/docs/concepts/index.md',
  isIndex: true,
  slug: '/docs/concepts',
  nextPage: {
    title: 'Server',
    href: '/docs/concepts/server',
  },
  prevPage: {
    title: 'Welcome - Welcome',
    href: '/docs',
  },
}
describe('DocsLayout Component', () => {
  it('renders correct DocsLayout component', () => {
    cy.mount(
      <MockRouter asPath="/docs/concepts">
        <DocsLayout post={post} />
      </MockRouter>,
    )
    cy.get('[data-testid="DocsLayout-main"]').should('exist');
  })

  it('renders Error Page , if post is not found ', () => {
    cy.mount(
      <MockRouter>
        <DocsLayout />
      </MockRouter>,
    )
  })
})
