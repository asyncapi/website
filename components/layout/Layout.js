import { useRouter } from 'next/router';
import DocsLayout from './DocsLayout';
import BlogLayout from './BlogLayout';
import GenericPostLayout from './GenericPostLayout';
import BlogContext from '../../context/BlogContext';
import { getPostBySlug, getAllPosts, getDocBySlug } from '../../lib/api';

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const posts = getAllPosts();
  const allDocPosts = posts['docs'].filter((p) => p.slug.startsWith('/docs/'));

  if (pathname.startsWith('/docs')) {
    const post = getDocBySlug(posts['docs'], pathname);
    return (
      <div data-testid="Docs-main-container">
      <DocsLayout post={post} navItems={allDocPosts}>
        {children}
      </DocsLayout>
      </div>
    );
  } else if (pathname.startsWith('/blog/')) {
    const post = getPostBySlug(pathname, 'blog');
    return (
      <div data-testid="Blogs-main-container" >
      <BlogLayout post={post} navItems={posts['blog']}>
        {children}
      </BlogLayout>
      </div>
    );
  } else if (pathname === '/blog') {
    return (
      <div data-testid='Blogs-sub-container'>
      <BlogContext.Provider value={{ navItems: posts['blog'] }}>
        {children}
      </BlogContext.Provider>
      </div>
    );
  } else {
    const post = getPostBySlug(pathname);
    if (post) {
      return <GenericPostLayout post={post}>{children}</GenericPostLayout>;
    }
  }

  return children;
}
