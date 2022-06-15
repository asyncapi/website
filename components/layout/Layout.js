import { useRouter } from 'next/router'
import DocsLayout from './DocsLayout'
import BlogLayout from './BlogLayout'
import JobsLayout from './JobsLayout'

import docs from '../../config/docs.json'
import posts from '../../config/blog-posts.json'
import jobs from '../../config/jobs.json'

function getDocBySlug(files, pathname) {
  for (const file of files) {
    if (file.slug === pathname) return file;
    if (file.files) {
      const doc = getDocBySlug(file.files, pathname);
      if (doc) return doc;
    }
  }
}

export default function Layout({ children }) {
  const { pathname } = useRouter()

  if (pathname.startsWith('/docs')) {
    const doc = getDocBySlug(docs.files, pathname);
    return (
      <DocsLayout doc={doc}>
        {children}
      </DocsLayout>
    )
  } else if (pathname.startsWith('/blog/')) {
    const post = posts.find(post => post.slug === pathname);
    return (
      <BlogLayout post={post}>
        {children}
      </BlogLayout>
    )
  } else if (pathname === '/blog') {
    return children;
  } else if (pathname === '/jobs') {
    return children;
  } else if (pathname.startsWith('/jobs/')) {
    const job = jobs.find(post => post.slug === pathname);
    return (
      <JobsLayout job={job}>
        {children}
      </JobsLayout>
    )
  }
  
  return children;
}