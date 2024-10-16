import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import BlogPostItem from './BlogPostItem';

const meta: Meta<typeof BlogPostItem> = {
  title: 'Components/BlogPostCard',
  component: BlogPostItem,
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '400px'
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof BlogPostItem>;

export const BlogPostCard: Story = {
  args: {
    post: {
      title: 'Blog Post Title',
      date: '2024-07-28T06:30:00.000Z',
      type: 'Blog Category',
      tags: ['Tag 1', 'Tag 2'],
      cover: '/img/posts/release-notes-3.0.0/cover.webp',
      authors: [
        {
          name: 'Author Name',
          photo: '/favicon-194x194.png',
          link: 'https://x.com/AsyncAPISpec',
          byline: 'Author Byline'
        }
      ],
      excerpt: 'This is a blog post excerpt.',
      toc: [
        {
          content: 'Table of Content 1',
          slug: 'table-of-content-1',
          lvl: 1,
          i: 0,
          seen: 0
        },
        {
          content: 'Table of Content 2',
          slug: 'table-of-content-2',
          lvl: 2,
          i: 1,
          seen: 0
        },
        {
          content: 'Table of Content 3',
          slug: 'table-of-content-3',
          lvl: 2,
          i: 2,
          seen: 0
        }
      ],
      readingTime: 22,
      sectionSlug: '/blog-section-slug',
      sectionWeight: 0,
      id: 'pages/blog/blog-post-slug',
      isIndex: false,
      slug: '/blog-post-slug',
      featured: false
    }
  }
};
