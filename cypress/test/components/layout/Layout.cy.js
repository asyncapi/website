import Layout from '../../../../components/layout/Layout';
import MockRouter from '../../../utils/router'
import { getPostBySlug, getAllPosts, getDocBySlug } from '../../../../lib/api';

describe('Blog Layout Component', () => {
  it('renders correct DocsLayout component when pathname is /docs', () => {
    const posts = getAllPosts();
    const allDocPosts = posts['docs'].filter((p) => p.slug.startsWith('/docs/'));
    const post = getDocBySlug(posts['docs'], '/docs');
    cy.mount(
      <MockRouter pathname="/docs">
        <Layout post={ post } navItems={ allDocPosts } />
      </MockRouter>
    );
    cy.get('[data-testid="Docs-main-container"]').should('exist');
  });

  it('renders correct BlogLayout component when pathname is /blog/', () => {
    const posts = getAllPosts();
    const post = getPostBySlug("/blog/2021-summary", 'blog');
    cy.mount(
      <MockRouter pathname="/blog/2021-summary">
        <Layout post={post} navItems={posts['blog']} />
      </MockRouter>
    );
    cy.get('[data-testid="Blogs-main-container" ]').should('exist')
  });

  it('renders correct Blog component when pathname is /blog' , () => {
    const posts = getAllPosts();
    const post = getPostBySlug("/blog", 'blog');
    cy.mount(
      <MockRouter pathname="/blog">
        <Layout post={post} navItems={posts['blog']} />
      </MockRouter>
    )
    cy.get('[data-testid="Blogs-sub-container"]').should('exist');
  })
});
