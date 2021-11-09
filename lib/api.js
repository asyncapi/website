import posts from '../config/posts.json'
import tools from '../config/tools.json';

export function getAllPosts() {
  return posts
}

export function getPostBySlug(slug) {
  return posts.find(post => post.slug === slug && !post.isSection)
}

export function getTool(tool){
  return tools[tool]
}

export function getToolBySlug(toolName, slug){
  return getTool(toolName).find(tool => tool.slug === slug && !tool.isSection)
}

