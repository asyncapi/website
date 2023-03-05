import posts from '../config/posts.json'

export function getAllPosts() {
  return posts
}

export function getPostBySlug(slug, type='') {
  if(type)
    return posts[type].find(post => post.slug === slug && !post.isSection)
  else{
    Object.entries(posts).forEach(([key, value]) => {
      if(key!== 'docsTree')
        return posts[key].find(post => post.slug === slug && !post.isSection)
    })
  }
}

export function getDocBySlug(structuredPosts, slug) {
  return structuredPosts.find(post => post.slug === slug && !post.isSection)
}