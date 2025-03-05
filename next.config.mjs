import mdx from '@next/mdx';

const withMDX = mdx();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'md', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'export',
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  }
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-frontmatter'),
      require('remark-gemoji-to-emoji'),
      require('remark-heading-id'),
      require('remark-slug'),
      require('remark-images'),
      require('@fec/remark-a11y-emoji'),
      require('remark-gfm')
    ],
    rehypePlugins: []
  }
})(nextConfig);
