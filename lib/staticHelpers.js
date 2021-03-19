import { getPostBySlug, getAllPosts } from './api'
// import markdownToHtml from './markdownToHtml'

export function getStaticPropsHelper(path) {
  return async function getStaticProps({ params }) {
    const navItems = [
      {
        title: 'Getting started',
        slug: 'docs/getting-started',
        items: getSectionItems('docs/getting-started')
      },
      {
        title: 'Tutorials',
        slug: 'docs/tutorials',
        items: getSectionItems('docs/tutorials')
      },
    ]
    const post = getPostBySlug(path, params && params.slug ? params.slug : 'index', [
      'title',
      'date',
      'slug',
      'fullSlug',
      'author',
      'content',
      'ogImage',
      'coverImage',
    ])
    const content = post.content || ''

    return {
      props: {
        post: {
          ...post,
          content,
        },
        navItems,
      },
    }
  }
}

function getSectionItems(path) {
  return getAllPosts(path, ['slug', 'fullSlug', 'title', 'weight']).sort((p1, p2) => (p1.weight || 0) - (p2.weight || 0))
}

export function getStaticPathsHelper(path) {
  return async function getStaticPaths() {
    const posts = getAllPosts(path, ['slug'])

    return {
      paths: posts.map((post) => {
        return {
          params: {
            slug: post.slug,
          },
        }
      }),
      fallback: false,
    }
  }
}
