import { useRouter } from 'next/router'
import DocsLayout from './DocsLayout'
import BlogLayout from './BlogLayout'
import JobsLayout from './JobsLayout'
import GenericPostLayout from './GenericPostLayout'
import BlogContext from '../../context/BlogContext'
import JobsContext from '../../context/JobsContext'
import { getPostBySlug, getAllPosts, getToolByName, getToolBySlug } from '../../lib/api'

export default function Layout({ children }) {
  const { pathname } = useRouter()

  const regex = new RegExp(/tools\/*.*\/docs/);
  const isToolsDocs = regex.test(pathname)

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
  } else if (pathname === '/jobs') {
    const posts = getAllPosts()
    return (
      <JobsContext.Provider value={{ navItems: posts.filter(p => p.slug.startsWith('/jobs/')) }}>
        {children}
      </JobsContext.Provider>
    )
  } else if (pathname.startsWith('/jobs/')) {
    const post = getPostBySlug(pathname)
    return (
      <JobsLayout post={post}>
        {children}
      </JobsLayout>
    )
  } else if(isToolsDocs) {

    const toolName = pathname.split('/')[2];
    const tools = getToolByName(toolName)
    const tool = getToolBySlug(toolName, pathname)

    return (
      <DocsLayout post={tool} navItems={tools}>
        {children}
      </DocsLayout>
    )
  }
  else {
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