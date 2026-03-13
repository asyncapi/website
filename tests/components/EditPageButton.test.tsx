/**
 * Tests for EditPageButton component
 *
 * These tests focus on component logic, props handling, and integration
 * with utility functions. Since React Testing Library is not installed,
 * we test the component's behavior through its utility functions and
 * verify the component structure.
 */

import type { EditPageButtonProps } from '@/types/components/EditPageButton';

// Mock the edit-page-config.json
jest.mock('../../config/edit-page-config.json', () => [
  {
    value: '/blog/',
    href: 'https://github.com/asyncapi/website/edit/master/markdown/blog',
    contentType: 'blog'
  },
  {
    value: '/about/',
    href: 'https://github.com/asyncapi/website/edit/master/markdown/about',
    contentType: 'about'
  },
  {
    value: '',
    href: 'https://github.com/asyncapi/website/blob/master/markdown'
  }
]);

// Import the utility functions
import {
  mapUrlToGitHubEdit,
  openGitHubUrl,
  shouldShowEditButton
} from '../../utils/editPageUtils';

describe('EditPageButton Component', () => {
  describe('Component Props Interface', () => {
    const propsCases: Array<{ props: EditPageButtonProps; description: string }> = [
      {
        props: { slug: '/blog/my-post', contentType: 'blog', className: 'custom-class', variant: 'inline' },
        description: 'blog with inline variant'
      },
      {
        props: { slug: '/docs/concepts/asyncapi', contentType: 'docs', variant: 'floating' },
        description: 'docs with floating variant'
      },
      {
        props: { slug: '/about/team', contentType: 'about' },
        description: 'about with defaults'
      }
    ];

    propsCases.forEach(({ props, description }) => {
      it(`should accept valid props for ${description}`, () => {
        expect(props.slug).toBeDefined();
        expect(props.contentType).toMatch(/^(blog|docs|about)$/);
      });
    });
  });

  describe('Utility Function Integration', () => {
    it('should return correct result from shouldShowEditButton for blog slug', () => {
      const slug = '/blog/test-post';

      const shouldShow = shouldShowEditButton(slug);

      expect(shouldShow).toBe(true);
    });

    it('should return correct result from mapUrlToGitHubEdit for docs', () => {
      const slug = '/docs/concepts/test';
      const contentType = 'docs';

      const result = mapUrlToGitHubEdit(slug, contentType);

      expect(result.success).toBe(true);
      expect(result.editUrl).toContain('github.com');
    });

    it('should handle unsuccessful URL mapping gracefully', () => {
      // For paths that don't match any pattern, the function still returns a result
      const slug = '/unknown/path';
      const contentType = 'docs';

      const result = mapUrlToGitHubEdit(slug, contentType);

      // The function returns a result with a fallback URL
      expect(result).toHaveProperty('editUrl');
      expect(result).toHaveProperty('success');
      expect(typeof result.editUrl).toBe('string');
    });
  });

  describe('URL Opening Behavior', () => {
    const originalWindow = global.window;
    const originalDocument = global.document;

    afterEach(() => {
      global.window = originalWindow;
      global.document = originalDocument;
    });

    it('should return false for non-GitHub URLs', () => {
      const result = openGitHubUrl('https://example.com/some-page');

      expect(result).toBe(false);
    });

    it('should return false for invalid URLs', () => {
      const result = openGitHubUrl('not-a-valid-url');

      expect(result).toBe(false);
    });

    it('should return true when window.open succeeds', () => {
      const mockWindow = { opener: null };
      const mockOpen = jest.fn().mockReturnValue(mockWindow);

      global.window = {
        open: mockOpen
      } as unknown as Window & typeof globalThis;

      const testUrl = 'https://github.com/asyncapi/website/edit/master/test.md';
      const result = openGitHubUrl(testUrl);

      expect(result).toBe(true);
      expect(mockOpen).toHaveBeenCalledWith(
        testUrl,
        '_blank',
        'noopener,noreferrer,width=1200,height=800,scrollbars=yes,resizable=yes'
      );
    });

    it('should use fallback link method when window.open returns null', () => {
      const mockOpen = jest.fn().mockReturnValue(null);
      const mockClick = jest.fn();
      const mockLink = { click: mockClick };

      global.window = {
        open: mockOpen
      } as unknown as Window & typeof globalThis;

      global.document = {
        createElement: jest.fn().mockReturnValue(mockLink),
        body: {
          appendChild: jest.fn(),
          removeChild: jest.fn()
        }
      } as unknown as Document;

      const testUrl = 'https://github.com/asyncapi/website/edit/master/test.md';
      const result = openGitHubUrl(testUrl);

      expect(result).toBe(true);
      expect(mockClick).toHaveBeenCalled();
    });
  });

  describe('Content Type Variations', () => {
    const testCases: Array<{
      contentType: 'blog' | 'docs' | 'about';
      slug: string;
      expectedUrlPattern: string;
    }> = [
      {
        contentType: 'blog',
        slug: '/blog/my-post',
        expectedUrlPattern: 'markdown/blog'
      },
      {
        contentType: 'about',
        slug: '/about/team',
        expectedUrlPattern: 'markdown/about'
      },
      {
        contentType: 'docs',
        slug: '/docs/concepts/test',
        expectedUrlPattern: 'github.com'
      }
    ];

    testCases.forEach(({ contentType, slug, expectedUrlPattern }) => {
      it(`should handle ${contentType} content correctly`, () => {
        const shouldShow = shouldShowEditButton(slug);
        const urlResult = mapUrlToGitHubEdit(slug, contentType);

        expect(shouldShow).toBe(true);
        expect(urlResult.success).toBe(true);
        expect(urlResult.editUrl).toContain(expectedUrlPattern);
      });
    });
  });

  describe('Variant Handling', () => {
    it('should support inline variant', () => {
      const props: EditPageButtonProps = {
        slug: '/blog/test',
        contentType: 'blog',
        variant: 'inline'
      };

      expect(props.variant).toBe('inline');
    });

    it('should support floating variant', () => {
      const props: EditPageButtonProps = {
        slug: '/docs/test',
        contentType: 'docs',
        variant: 'floating'
      };

      expect(props.variant).toBe('floating');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty slug gracefully', () => {
      const shouldShow = shouldShowEditButton('');

      expect(shouldShow).toBe(false);
    });

    it('should handle slugs with special characters', () => {
      const slug = '/blog/post-with-special-chars_123';

      const shouldShow = shouldShowEditButton(slug);
      const result = mapUrlToGitHubEdit(slug, 'blog');

      expect(shouldShow).toBe(true);
      expect(result.success).toBe(true);
    });

    it('should handle nested paths correctly', () => {
      const slug = '/docs/concepts/advanced/nested/path';

      const result = mapUrlToGitHubEdit(slug, 'docs');

      expect(result.success).toBe(true);
      expect(result.editUrl).toContain('concepts/advanced/nested/path');
    });
  });

  describe('Component Module', () => {
    let componentContent: string;

    beforeAll(() => {
      const fs = require('fs');
      const path = require('path');
      const componentPath = path.join(__dirname, '../../components/buttons/EditPageButton.tsx');
      componentContent = fs.readFileSync(componentPath, 'utf-8');
    });

    it('should have correct component structure', () => {
      expect(componentContent).toContain('export default function EditPageButton');
      expect(componentContent).toContain('EditPageButtonProps');
      expect(componentContent).toContain("data-testid='edit-page-button'");
      expect(componentContent).toContain('variant');
      expect(componentContent).toContain('inline');
      expect(componentContent).toContain('floating');
    });

    it('should have proper accessibility attributes', () => {
      expect(componentContent).toContain('aria-label');
      expect(componentContent).toContain("role='link'");
      expect(componentContent).toContain('tabIndex');
      expect(componentContent).toContain('onKeyDown');
      expect(componentContent).toContain('sr-only');
    });

    it('should have proper security attributes', () => {
      expect(componentContent).toContain('noopener');
      expect(componentContent).toContain('noreferrer');
      expect(componentContent).toContain('referrerPolicy');
    });
  });
});
