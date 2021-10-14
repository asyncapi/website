const frontmatter = require('remark-frontmatter')
const images = require('remark-images')
const gemoji = require('remark-gemoji-to-emoji')
const a11yEmoji = require('@fec/remark-a11y-emoji')
const slug = require('remark-slug')
const headingId = require('remark-heading-id')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      frontmatter,
      gemoji,
      headingId,
      slug,
      images,
      a11yEmoji,
    ],
    rehypePlugins: [],
  },
})
module.exports = withMDX({
  pageExtensions: ['js', 'md'],
  webpack(config, { isServer }) {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    return config
  },
})