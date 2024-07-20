import type { MDXComponents } from 'mdx/types';

import { mdxComponents } from '@/components/MDX/MDX';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    mdxComponents
  };
}
