import type { MDXComponents } from 'mdx/types';

import { mdxComponents } from '@/components/MDX/MDX';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

/**
 * Customizes MDX components by merging default components with any provided overrides.
 * This function is used by the MDX provider to determine which React components should be used to render MDX content.
 *
 * @param components - Custom MDX components to override the defaults
 * @returns A merged object of default and custom MDX components
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    ...mdxComponents,
    ...components
  };
}
