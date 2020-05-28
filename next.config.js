const frontmatter = require('remark-frontmatter')
const images = require('remark-images')
const emoji = require('remark-emoji')
const slug = require('remark-slug')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      frontmatter,
      slug,
      images,
      emoji,
    ],
    rehypePlugins: [],
  },
})
module.exports = withMDX({
  pageExtensions: ['js', 'md'],
})