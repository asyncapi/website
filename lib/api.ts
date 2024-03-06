import type { IPosts } from '@/types/post';

import posts from '../config/posts.json';

/**
 * @returns All the posts
 */
export function getAllPosts() {
  return posts as IPosts;
}

/**
 * @param slug - The slug of the post
 * @param type - The type of the post
 * @returns The post by the slug
 */
export function getPostBySlug(slug: string, type?: 'blog' | 'docs' | 'about') {
  if (type) return (posts as IPosts)[type].find(post => post.slug === slug && !(post as any).isSection);

  let item;

  Object.entries(posts).forEach(([key]) => {
    let content;

    if (key !== 'docsTree') {
      content = posts[key as 'blog' | 'docs' | 'about'].find(post => post.slug === slug && !(post as any).isSection);
    }
    if (content) item = content;
  });

  return item;
}

/**
 * @param structuredPosts - The structured posts
 * @param slug - The slug of the post
 * @returns The post by the slug
 */
export function getDocBySlug(structuredPosts: IPosts['docs'], slug: string) {
  return structuredPosts.find(post => post.slug === slug && !post.isSection);
}
