import { getAllPosts, getPostBySlug, getDocBySlug } from '../../../lib/api';
import posts from '../../../config/posts.json'
describe('getAllPosts', () => {
  it('should return all posts', () => {
    const allPosts = getAllPosts();
    expect(allPosts).to.deep.equal(posts);
  });
});

describe('getPostBySlug', () => {
  it('should return the post with the given slug', () => {
    const slug = '/blog/2023-may-docs-report';
    const post = getPostBySlug(slug);
    const expectedPost = posts.blog.find((p) => p.slug === slug && !p.isSection);
    expect(post).to.deep.equal(expectedPost);
  });

  it('should return the post of a specific type with the given slug', () => {
    const slug = '/blog/2023-may-docs-report';
    const type = 'blog';
    const post = getPostBySlug(slug, type);
    const expectedPost = posts[type].find((p) => p.slug === slug && !p.isSection);
    expect(post).to.deep.equal(expectedPost);
  });
});

describe('getDocBySlug', () => {
    it('should return the document with the given slug', () => {
      const structuredPosts = posts['docs']
      const slug = '/docs/concepts';
      const doc = getDocBySlug(structuredPosts, slug);
      const expectedDoc = structuredPosts.find((post) => post.slug === slug && !post.isSection);
      expect(doc).to.deep.equal(expectedDoc);
    });

  });

