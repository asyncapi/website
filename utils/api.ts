import posts from '../config/posts.json';
import type { IPost, IPosts } from '../types/post';

/**
 * Retrieves all posts.
 * @returns {Object} All posts.
 */
export function getAllPosts(): IPosts {
  return posts;
}

/**
 * Retrieves a post by its slug and type.
 * @param {string} slug - The slug of the post.
 * @param {string} [type=''] - The type of the post.
 * @returns {Object | undefined} The post if found, undefined otherwise.
 */
export function getPostBySlug(slug: string, type: string = '') {
  if (type) return (posts as any)[type].find((post: IPost) => post.slug === slug && !post.isSection);

  let item;

  Object.entries(posts).forEach(([key]) => {
    let content;

    if (key !== 'docsTree') content = (posts as any)[key].find((post: IPost) => post.slug === slug && !post.isSection);
    if (content) item = content;
  });

  return item;
}

/**
 * Retrieves a document by its slug from structured posts.
 * @param {Object[]} structuredPosts - The structured posts array.
 * @param {string} slug - The slug of the document.
 * @returns {Object | undefined} The document if found, undefined otherwise.
 */
export function getDocBySlug(structuredPosts: IPost[], slug: string): object | undefined {
  return structuredPosts.find((post) => post.slug === slug && !post.isSection);
}
