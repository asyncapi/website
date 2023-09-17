import React from 'react'
import { mount } from 'cypress/react'
import { post } from '../../../fixtures/navigation-mock'
import BlogPostItem from '../../../../components/navigation/BlogPostItem'
import MockRouter from '../../../utils/router'
describe('BlogPostItem', () => {

  it('renders the blog post item correctly', () => {
    mount(
      <MockRouter> <BlogPostItem post={ post } /></MockRouter>
    )

    // Verify the rendered elements and their contents

    cy.get('[data-testid="BlogPostItem-Link"]').should('have.attr', 'href', post.slug)
    cy.get('[data-testid="BlogPostItem-Img"]').should('have.attr', 'src', post.cover)
    cy.contains(post.excerpt)
    cy.contains(post.title)
    cy.contains(post.type)
    post.authors.forEach(author => {
      cy.contains(author.name)
    })

  })
})
