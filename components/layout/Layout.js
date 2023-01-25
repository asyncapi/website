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
  const treePosts = buildNavTree(allDocPosts) // builds a NavTree of all DocPosts to structurize the order of pages
  let structuredPosts = [] // stores the list of DocPosts in the order it has to be shown
  
  // A recursion function, works on the logic of Depth First Search to traverse all the root and child posts of the 
  // DocTree to get sequential order of the Doc Posts
  const convertDocPosts = (docObject) => {
    let docsArray = []
    // certain entries in the DocPosts are either a parent to many posts or itself a post.
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

  // Traversing the whole DocTree and storing each post inside them in sequential order
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
  // Appending the content of welcome page pf Docs from the posts.json
  structuredPosts[0] = posts.filter(p => p.slug === '/docs')[0]
  
  // Traversing the strucutredPosts in order to add `nextPage` and `prevPage` details for each page
  let countDocPages = structuredPosts.length
  structuredPosts = structuredPosts.map((post, index) => {
    // post item specifying the root Section or sub-section in the docs are excluded as 
    // they doesn't comprise any Doc Page or content to be shown in website. 
    if(post?.isRootElement || post?.isSection || index==0) 
      return post

    let nextPage = {}, prevPage = {}
    let docPost = post;

    // checks whether the next page for the current docPost item exists or not
    if(index+1<countDocPages){ 
      // checks whether the next item inside structuredPosts is a rootElement or a sectionElement
      // if yes, it goes again to a next to next item in structuredPosts to link the nextPage
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

    // checks whether the previous page for the current docPost item exists or not
    if(index>0){
      // checks whether the previous item inside structuredPosts is a rootElement or a sectionElement
      // if yes, it goes again to a next previous item in structuredPosts to link the prevPage
      if(!structuredPosts[index-1]?.isRootElement && !structuredPosts[index-1]?.isSection){
        prevPage = {
          title: structuredPosts[index-1].title,
          href: structuredPosts[index-1].slug
        }
        docPost = {...docPost, prevPage}
      }else{
        // additonal check for the first page of Docs so that it doesn't give any Segementation fault
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