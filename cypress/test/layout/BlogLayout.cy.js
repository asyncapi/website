import React from 'react';
import { mount } from '@cypress/react';
import BlogLayout from '../../../components/layout/BlogLayout';

describe('BlogLayout', () => {
  it('renders the layout with correct post title and authors', () => {
    // Mock the necessary props
    const post = {
      title: 'Test Post',
      authors: [
        { name: 'Author 1', link: 'https://example.com/author1' },
        { name: 'Author 2' }
      ],
      date: '2023-06-29',
      readingTime: 5,
      excerpt: 'Lorem ipsum dolor sit amet',
      cover: 'https://example.com/cover.jpg',
      coverCaption: 'Cover Image'
    };

    // Mount the component
    mount(<BlogLayout post={post}>Test content</BlogLayout>);

    cy.stub(React, 'useContext').returns({
        post,
      });
  });
});
