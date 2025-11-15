import frontmatter from 'remark-frontmatter';
import images from 'remark-images';
import gemoji from 'remark-gemoji-to-emoji';
import a11yEmoji from '@fec/remark-a11y-emoji';
import slug from 'remark-slug';
import headingId from 'remark-heading-id';
import remarkGfm from 'remark-gfm';
import withMDX from '@next/mdx';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);



/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  generateStatsFile: true, // Add this
  statsFilename: 'stats.json'
})

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
  providerImportSource: "@mdx-js/react",
  options: {
    remarkPlugins: [frontmatter, gemoji, headingId, slug, images, a11yEmoji, remarkGfm],
    rehypePlugins: []
  }
});

export default withBundleAnalyzer(mdxConfig(nextConfig));
