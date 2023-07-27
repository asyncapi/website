import posts from '../config/posts.json'

export function getAllPosts() {
  return posts
}

export function getPostBySlug(slug, type='') {
  if(type)
    return posts[type].find(post => post.slug === slug && !post.isSection)
  else {
      let item;
      Object.entries(posts).forEach(([key, value]) => {
        let content
        if(key!== 'docsTree')
          content = posts[key].find(post => post.slug === slug && !post.isSection)
          if(content) item = content
      })
      return item
    }
}

export function getDocBySlug(structuredPosts, slug) {
  return structuredPosts.find(post => post.slug === slug && !post.isSection)
}