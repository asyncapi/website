import frontmatter from 'remark-frontmatter';
import images from 'remark-images';
import gemoji from 'remark-gemoji-to-emoji';
import a11yEmoji from '@fec/remark-a11y-emoji';
import slug from 'remark-slug';
import headingId from 'remark-heading-id';

import withMDX from '@next/mdx';

const mdxConfig = withMDX({
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

export default {
  ...mdxConfig,
  pageExtensions: ['js', 'md'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer, defaultLoaders }) => {
    // Fixes npm packages that depend on fs module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    // This is the new part
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [
              frontmatter,
              gemoji,
              headingId,
              slug,
              images,
              a11yEmoji,
            ],
          },
        },
      ],
    });

    return config;
  },
};