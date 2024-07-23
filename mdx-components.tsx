import type { MDXComponents } from 'mdx/types';

import { mdxComponents } from '@/components/MDX/MDX';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    ...mdxComponents,
    ...components
  };
}
