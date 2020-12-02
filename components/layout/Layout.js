import { useRouter } from 'next/router'
import DocsLayout from './DocsLayout'
import BlogLayout from './BlogLayout'
import JobsLayout from './JobsLayout'
import GenericPostLayout from './GenericPostLayout'
import BlogContext from '../../context/BlogContext'
import { getPostBySlug, getAllPosts } from '../../lib/api'

export default function Layout({ children }) {
  const { pathname } = useRouter()

  if (pathname.startsWith('/docs/')) {
    const posts = getAllPosts()
    const post = getPostBySlug(pathname)
    return (
      <DocsLayout post={post} navItems={posts.filter(p => p.slug.startsWith('/docs/'))}>
        {children}
      </DocsLayout>
    )
  } else if (pathname.startsWith('/blog/')) {
    const posts = getAllPosts()
    const post = getPostBySlug(pathname)
    return (
      <BlogLayout post={post} navItems={posts.filter(p => p.slug.startsWith('/blog/'))}>
        {children}
      </BlogLayout>
    )
  } else if (pathname === '/blog') {
    const posts = getAllPosts()
    return (
      <BlogContext.Provider value={{ navItems: posts.filter(p => p.slug.startsWith('/blog/')) }}>
        {children}
      </BlogContext.Provider>
    )
  } else if (pathname.startsWith('/jobs/')) {
    const post = getPostBySlug(pathname)
    return (
      <JobsLayout post={post}>
        {children}
      </JobsLayout>
    )
  } else {
    const post = getPostBySlug(pathname)
    if (post) {
      return (
        <GenericPostLayout post={post}>
          {children}
        </GenericPostLayout>
      )
    }
  }
  
  return children
}