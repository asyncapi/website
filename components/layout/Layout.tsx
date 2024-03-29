import { useRouter } from 'next/router';

import type { IPosts } from '@/types/post';

import BlogContext from '../../context/BlogContext';
import { getAllPosts, getPostBySlug } from '../../utils/api';
import BlogLayout from './BlogLayout';
// import DocsLayout from './DocsLayout';
import GenericPostLayout from './GenericPostLayout';

interface ILayoutProps {
  children: React.ReactNode;
}

/**
 * @description The layout with the content
 * @param props.children - The content of the layout
 */
export default function Layout({ children }: ILayoutProps): JSX.Element {
  const { pathname } = useRouter();
  const posts = getAllPosts();
  // const allDocPosts = posts.docs.filter((p) => p.slug.startsWith('/docs/'));

  if (pathname.startsWith('/docs')) {
    // const post = getDocBySlug(posts.docs as IPost[], pathname);

    return <></>;
    // <div data-testid='Docs-main-container'>
    //   <DocsLayout post={post} navItems={allDocPosts}>
    //     {children}
    //   </DocsLayout>
    // </div>
    // );
  }
  if (pathname.startsWith('/blog/')) {
    const post = getPostBySlug(pathname, 'blog');

    return (
      <div data-testid='Blogs-main-container'>
        <BlogLayout post={post as unknown as IPosts['blog'][number]} navItems={posts.blog}>
          {children}
        </BlogLayout>
      </div>
    );
  }
  if (pathname === '/blog') {
    return (
      <div data-testid='Blogs-sub-container'>
        <BlogContext.Provider value={{ navItems: posts.blog }}>{children}</BlogContext.Provider>
      </div>
    );
  }
  const post = getPostBySlug(pathname);

  if (post) {
    return <GenericPostLayout post={post as unknown as IPosts['blog'][number]}>{children}</GenericPostLayout>;
  }

  return children as JSX.Element;
}
