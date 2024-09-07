import frontmatter from 'remark-frontmatter';
import images from 'remark-images';
import gemoji from 'remark-gemoji-to-emoji';
import a11yEmoji from '@fec/remark-a11y-emoji';
import slug from 'remark-slug';
import headingId from 'remark-heading-id';
import remarkGfm from 'remark-gfm';
import withMDX from '@next/mdx';

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
      config.resolve.fallback.fs = false;
    }

    return config;
  }
};

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
  providerImportSource: "@mdx-js/react",
  options: {
    remarkPlugins: [frontmatter, gemoji, headingId, slug, images, a11yEmoji, remarkGfm],
    rehypePlugins: []
  }
});

export default mdxConfig(nextConfig);
