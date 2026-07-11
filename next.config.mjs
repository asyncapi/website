import path from 'node:path';
import { fileURLToPath } from 'node:url';

import frontmatter from 'remark-frontmatter';
import images from 'remark-images';
import gemoji from 'remark-gemoji-to-emoji';
import a11yEmoji from '@fec/remark-a11y-emoji';
import slug from 'remark-slug';
import headingId from 'remark-heading-id';
import remarkGfm from 'remark-gfm';
import withMDX from '@next/mdx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Lightweight shim that replaces the heavy react-syntax-highlighter (and its
 * Refractor engine with ~280 language definitions) with a thin wrapper around
 * prism-react-renderer, which is already used by the project's own CodeBlock
 * component.  Schyma is the only consumer of react-syntax-highlighter; the
 * alias is therefore safe and removes ~2 MB of unused JS from the client
 * bundle.
 */
const rshShimPath = path.resolve(
  __dirname,
  'components/shims/react-syntax-highlighter-shim.tsx',
);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'md', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    // Redirect all react-syntax-highlighter imports to the lightweight shim.
    // Schyma imports from two paths:
    //   1. 'react-syntax-highlighter'             → { Prism }
    //   2. 'react-syntax-highlighter/dist/cjs/styles/prism' → { prism } theme
    // Both are satisfied by the single shim module.
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-syntax-highlighter/dist/cjs/styles/prism': rshShimPath,
      'react-syntax-highlighter': rshShimPath,
    };

    return config;
  },
};

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
  providerImportSource: '@mdx-js/react',
  options: {
    remarkPlugins: [
      frontmatter,
      gemoji,
      headingId,
      slug,
      images,
      a11yEmoji,
      remarkGfm,
    ],
    rehypePlugins: [],
  },
});

export default async function getNextConfig() {
  // Only load @next/bundle-analyzer when ANALYZE=true to avoid MODULE_NOT_FOUND
  // in production environments where devDependencies are pruned.
  const withBundleAnalyzer =
    process.env.ANALYZE === 'true'
      ? (await import('@next/bundle-analyzer')).default({
          enabled: true,
          openAnalyzer: true,
        })
      : (config) => config;

  return withBundleAnalyzer(mdxConfig(nextConfig));
}
