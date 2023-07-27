const frontmatter = require('remark-frontmatter');
const images = require('remark-images');
const gemoji = require('remark-gemoji-to-emoji');
const a11yEmoji = require('@fec/remark-a11y-emoji');
const slug = require('remark-slug');
const headingId = require('remark-heading-id');
const { i18n } = require("./next-i18next-static-site.config");

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
});

const withTM = require("next-transpile-modules")(["next-i18next-static-site"]);

module.exports = withTM(withMDX({
  pageExtensions: ['js', 'md'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, { isServer }) {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    // config.resolve.alias["react/jsx-dev-runtime"] = require.resolve('react/jsx-dev-runtime');
    // config.resolve.alias["react/jsx-runtime"] = require.resolve('react/jsx-runtime');

    return config;
  },
  publicRuntimeConfig: {
    i18n,
  },
}));
