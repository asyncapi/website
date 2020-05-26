import { useRouter } from 'next/router'
import DocsLayout from './DocsLayout'
import { getPostBySlug, getAllPosts } from '../../lib/api'

export default function Layout({ children }) {
  const { pathname } = useRouter()

  if (pathname.startsWith('/docs/')) {
    const posts = getAllPosts()
    const post = getPostBySlug(pathname)
    return (
      <DocsLayout post={post} navItems={posts}>
        {children}
      </DocsLayout>
    )
  }
  
  return (
    <>
      {children}
    </>
  )
}