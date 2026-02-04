import React from 'react';

import { getAllPosts } from '../../utils/api';
import BlogPostItem from '../navigation/BlogPostItem';

/**
 * @description This component displays the latest blog posts.
 */
export default function NewsroomBlogPosts() {
  const posts = getAllPosts()
    .blog.sort((i1, i2) => {
      const i1Date = new Date(i1.date);
      const i2Date = new Date(i2.date);

      if (i1.featured && !i2.featured) return -1;
      if (!i1.featured && i2.featured) return 1;

      return i2Date.valueOf() - i1Date.valueOf();
    })
    .slice(0, 3);

  return (
    <div data-testid='NewsroomBlog-main-div'>
      <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post, index) => (
          <BlogPostItem key={index} post={post} />
        ))}
      </ul>
    </div>
  );
}
