import React from 'react'
import { mount } from 'cypress/react'
import BlogPostItem from '../../../components/navigation/BlogPostItem'
describe('BlogPostItem', () => {
  const post = {
    "title": "New Tools Dashboard for AsyncAPI",
    "date": "2023-02-14T05:00:00.000Z",
    "type": "Communication",
    "tags": [
      "Automation",
      "JSON Schema"
    ],
    "cover": "/img/posts/new-asyncapi-tools-page/cover.webp",
    "authors": [
      {
        "name": "Akshat Nema",
        "photo": "/img/avatars/akshatnema.webp",
        "link": "https://twitter.com/AksNema",
        "byline": "AsyncAPI Maintainer and Dev Akshat Nema"
      }
    ],
    "excerpt": "Announcing our newly released AsyncAPI tools dashboard!",
    "featured": true,
    "toc": [
      {
        "content": "AsyncAPI Tool File",
        "slug": "asyncapi-tool-file",
        "lvl": 1,
        "i": 0,
        "seen": 0
      },
      {
        "content": "Tool File Structure",
        "slug": "tool-file-structure",
        "lvl": 2,
        "i": 1,
        "seen": 0
      },
      {
        "content": "AsyncAPI Tools Dashboard",
        "slug": "asyncapi-tools-dashboard",
        "lvl": 1,
        "i": 2,
        "seen": 0
      },
      {
        "content": "Tool Card",
        "slug": "tool-card",
        "lvl": 2,
        "i": 3,
        "seen": 0
      },
      {
        "content": "Filters for Tools",
        "slug": "filters-for-tools",
        "lvl": 2,
        "i": 4,
        "seen": 0
      },
      {
        "content": "Filter Menu",
        "slug": "filter-menu",
        "lvl": 3,
        "i": 5,
        "seen": 0
      },
      {
        "content": "Search Bar",
        "slug": "search-bar",
        "lvl": 3,
        "i": 6,
        "seen": 0
      },
      {
        "content": "Summary",
        "slug": "summary",
        "lvl": 2,
        "i": 7,
        "seen": 0
      }
    ],
    "readingTime": 7,
    "sectionSlug": "/blog",
    "sectionWeight": 0,
    "id": "pages/blog/new-asyncapi-tools-page.md",
    "isIndex": false,
    "slug": "/blog/new-asyncapi-tools-page"
  }

  it('renders the blog post item correctly', () => {
    mount(<BlogPostItem post={ post } />)

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
