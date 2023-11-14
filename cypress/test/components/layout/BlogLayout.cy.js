import React from 'react';
import BlogLayout from '../../../../components/layout/BlogLayout';
import MockRouter from '../../../utils/router'

describe('Blog Layout Component', () => {
  beforeEach(() => {
    cy.fixture('blogpost.json').as('blogsData');
  });
  it('renders correct BlogLayout component', () => {
    cy.get('@blogsData').then((blogsData) => {
    cy.mount(
      <MockRouter asPath="/blog/2020-summary">
        <BlogLayout post={blogsData} />
      </MockRouter>
    );
    cy.get('[data-testid="BlogLayout-main"]').contains(blogsData.title);
  });
})

  it('renders Error Page , if post is not found ', () => {
    cy.mount(
      <MockRouter>
        <BlogLayout />
      </MockRouter>
    );
  });
});
