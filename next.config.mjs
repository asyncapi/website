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
  },
  // Adding security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://buttons.github.io https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://buttons.github.io; frame-src 'self' https://www.youtube.com"
          }
        ]
      }
    ];
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