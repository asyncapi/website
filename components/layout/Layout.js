import { useRouter } from 'next/router'
import DocsLayout, {buildNavTree} from './DocsLayout'
import BlogLayout from './BlogLayout'
import JobsLayout from './JobsLayout'
import GenericPostLayout from './GenericPostLayout'
import BlogContext from '../../context/BlogContext'
import JobsContext from '../../context/JobsContext'
import { getPostBySlug, getAllPosts, getDocBySlug } from '../../lib/api'

export default function Layout({ children }) {
  const { pathname } = useRouter()
  const posts = getAllPosts()
  const allDocPosts = posts.filter(p => p.slug.startsWith('/docs/'))
  const treePosts = buildNavTree(allDocPosts)
  let structuredPosts = []
  const convertDocPosts = (docObject) => {
    let docsArray = []
    docsArray.push(docObject?.item || docObject)
    if(docObject.children){
      let children = docObject.children
      Object.keys(children).forEach((child) => {
        let docChildArray = convertDocPosts(children[child])
        docsArray = [...docsArray, ...docChildArray]
      })
    }
    return docsArray
  }

  Object.keys(treePosts).forEach((rootElement) => {    
    structuredPosts.push(treePosts[rootElement].item)
    if(treePosts[rootElement].children){
      let children = treePosts[rootElement].children
      Object.keys(children).forEach((child) => {
        let docChildArray = convertDocPosts(children[child])
        structuredPosts = [...structuredPosts, ...docChildArray]
      })
    }
  })
  structuredPosts[0] = posts.filter(p => p.slug === '/docs')[0]
  
  let countDocPages = structuredPosts.length
  structuredPosts = structuredPosts.map((post, index) => {
    if(post?.isRootElement || post?.isSection) 
      return post
    let nextPage = {}, prevPage = {}
    let docPost = post;
    if(index+1<countDocPages){
      if(!structuredPosts[index+1].isRootElement && !structuredPosts[index+1].isSection){
        nextPage = {
          title: structuredPosts[index+1].title,
          href: structuredPosts[index+1].slug
        }
      }else{
        nextPage = {
          title: structuredPosts[index+2].title,
          href: structuredPosts[index+2].slug
        }
      }
      docPost = {...docPost, nextPage}
    }

    if(index>0){
      if(!structuredPosts[index-1]?.isRootElement && !structuredPosts[index-1]?.isSection){
        prevPage = {
          title: structuredPosts[index-1].title,
          href: structuredPosts[index-1].slug
        }
        docPost = {...docPost, prevPage}
      }else{
        if(index-2>=0){
          prevPage = {
            title: structuredPosts[index-2].title,
            href: structuredPosts[index-2].slug
          }
          docPost = {...docPost, prevPage}
        }
      }
    }
    return docPost
  })

  if (pathname.startsWith('/docs')) {
    const post = getDocBySlug(structuredPosts, pathname)
    return (
      <DocsLayout post={post} navItems={posts.filter(p => p.slug.startsWith('/docs/'))}>
        {children}
      </DocsLayout>
    )
  } else if (pathname.startsWith('/blog/')) {
    const post = getPostBySlug(pathname)
    return (
      <BlogLayout post={post} navItems={posts.filter(p => p.slug.startsWith('/blog/'))}>
        {children}
      </BlogLayout>
    )
  } else if (pathname === '/blog') {
    return (
      <BlogContext.Provider value={{ navItems: posts.filter(p => p.slug.startsWith('/blog/')) }}>
        {children}
      </BlogContext.Provider>
    )
  } else if (pathname === '/jobs') {
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