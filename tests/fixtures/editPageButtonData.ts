/**
 * Test fixtures for EditPageButton component and editPageUtils
 */

import type { EditPageConfigEntry } from '@/types/components/EditPageButton';

// Mock edit-page-config.json for testing
export const mockEditPageConfig: EditPageConfigEntry[] = [
  {
    value: '/tools/generator',
    href: 'https://github.com/asyncapi/generator/tree/master/apps/generator/docs'
  },
  {
    value: 'reference/specification/',
    href: 'https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md'
  },
  {
    value: '/tools/cli',
    href: 'https://github.com/asyncapi/cli/tree/master/docs'
  },
  {
    value: '',
    href: 'https://github.com/asyncapi/website/blob/master/markdown'
  },
  {
    value: '/blog/',
    href: 'https://github.com/asyncapi/website/edit/master/markdown/blog',
    contentType: 'blog' as const
  },
  {
    value: '/about/',
    href: 'https://github.com/asyncapi/website/edit/master/markdown/about',
    contentType: 'about' as const
  }
];

// Test cases for getContentTypeFromSlug
export const contentTypeTestCases = [
  { slug: '/blog/my-post', expected: 'blog' },
  { slug: '/blog/2024/01/my-post', expected: 'blog' },
  { slug: '/docs/concepts/asyncapi', expected: 'docs' },
  { slug: '/docs/reference/specification/v3.0.0', expected: 'docs' },
  { slug: '/about/team', expected: 'about' },
  { slug: '/about/contact', expected: 'about' },
  { slug: '/tools/modelina', expected: null },
  { slug: '/community', expected: null },
  { slug: '', expected: null },
  { slug: '/random/path', expected: null }
];

// Test cases for shouldShowEditButton
export const shouldShowTestCases = [
  { slug: '/blog/my-post', expected: true },
  { slug: '/docs/concepts', expected: true },
  { slug: '/about/team', expected: true },
  { slug: '/tools/cli', expected: false },
  { slug: '/community', expected: false },
  { slug: '', expected: false }
];

// Test cases for mapUrlToGitHubEdit - blog content
export const blogUrlTestCases = [
  {
    slug: '/blog/my-awesome-post',
    contentType: 'blog' as const,
    expected: {
      success: true,
      editUrl: 'https://github.com/asyncapi/website/edit/master/markdown/blog/my-awesome-post.md'
    }
  },
  {
    slug: '/blog/2024/01/december-update',
    contentType: 'blog' as const,
    expected: {
      success: true,
      editUrl: 'https://github.com/asyncapi/website/edit/master/markdown/blog/december-update.md'
    }
  }
];

// Test cases for mapUrlToGitHubEdit - about content
export const aboutUrlTestCases = [
  {
    slug: '/about/team',
    contentType: 'about' as const,
    expected: {
      success: true,
      editUrl: 'https://github.com/asyncapi/website/edit/master/markdown/about/team.md'
    }
  },
  {
    slug: '/about/contact',
    contentType: 'about' as const,
    expected: {
      success: true,
      editUrl: 'https://github.com/asyncapi/website/edit/master/markdown/about/contact.md'
    }
  }
];

// Test cases for mapUrlToGitHubEdit - docs content
export const docsUrlTestCases = [
  {
    slug: '/docs/concepts/asyncapi',
    contentType: 'docs' as const,
    expected: {
      success: true,
      editUrl: 'https://github.com/asyncapi/website/edit/master/markdown/docs/concepts/asyncapi.md'
    }
  },
  {
    slug: '/docs/tools/generator',
    contentType: 'docs' as const,
    expected: {
      success: true,
      editUrl: 'https://github.com/asyncapi/generator/tree/master/apps/generator/docs/generator.md'
    }
  },
  {
    slug: '/docs/tools/cli/installation',
    contentType: 'docs' as const,
    expected: {
      success: true,
      editUrl: 'https://github.com/asyncapi/cli/tree/master/docs/installation.md'
    }
  },
  {
    slug: '/docs/reference/specification/v3.0.0',
    contentType: 'docs' as const,
    expected: {
      success: true,
      editUrl: 'https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md/v3.0.0.md'
    }
  }
];

// Test cases for mapUrlToGitHubEdit - fallback cases
export const fallbackUrlTestCases = [
  {
    slug: '/unknown/path',
    contentType: 'docs' as const,
    expected: {
      success: false,
      editUrl: 'https://github.com/asyncapi/website/tree/master'
    }
  }
];

// Combined test cases for mapUrlToGitHubEdit
export const mapUrlTestCases = [
  ...blogUrlTestCases,
  ...aboutUrlTestCases,
  ...docsUrlTestCases,
  ...fallbackUrlTestCases
];

// Test cases for EditPageButton component props
export const editPageButtonProps = {
  blog: {
    slug: '/blog/my-post',
    contentType: 'blog' as const,
    className: 'test-class',
    variant: 'inline' as const
  },
  docs: {
    slug: '/docs/concepts/asyncapi',
    contentType: 'docs' as const,
    className: '',
    variant: 'inline' as const
  },
  about: {
    slug: '/about/team',
    contentType: 'about' as const,
    className: 'custom-class',
    variant: 'floating' as const
  },
  hidden: {
    slug: '/unknown/path',
    contentType: 'docs' as const,
    className: '',
    variant: 'inline' as const
  }
};

// Note: Mock functions are defined in the test files where Jest is available
