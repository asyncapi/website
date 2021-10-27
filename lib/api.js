import posts from "../config/posts.json";

// TODO: Make this dynamic
import modelina from "../config/tools/modelina.json";

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug && !post.isSection);
}

export function getToolByName(name) {
  if(name === 'modelina') return modelina
  return [];
}

export function getToolBySlug(toolName, slug) {
  const tools = getToolByName(toolName);
  return tools.find((tool) => tool.slug === slug && !tool.isSection);
}
