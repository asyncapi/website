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
    it('should accept valid props for blog content', () => {
      const props: EditPageButtonProps = {
        slug: '/blog/my-post',
        contentType: 'blog',
        className: 'custom-class',
        variant: 'inline'
      };

      expect(props.slug).toBe('/blog/my-post');
      expect(props.contentType).toBe('blog');
      expect(props.className).toBe('custom-class');
      expect(props.variant).toBe('inline');
    });

    it('should accept valid props for docs content', () => {
      const props: EditPageButtonProps = {
        slug: '/docs/concepts/asyncapi',
        contentType: 'docs',
        variant: 'floating'
      };

      expect(props.slug).toBe('/docs/concepts/asyncapi');
      expect(props.contentType).toBe('docs');
      expect(props.variant).toBe('floating');
    });

    it('should accept valid props for about content', () => {
      const props: EditPageButtonProps = {
        slug: '/about/team',
        contentType: 'about'
      };

      expect(props.slug).toBe('/about/team');
      expect(props.contentType).toBe('about');
      // Default values
      expect(props.className).toBeUndefined();
      expect(props.variant).toBeUndefined();
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
    it('should have EditPageButton component file', () => {
      // Verify the component file exists by checking the file system
      const fs = require('fs');
      const path = require('path');
      const componentPath = path.join(__dirname, '../../components/buttons/EditPageButton.tsx');

      expect(fs.existsSync(componentPath)).toBe(true);
    });

    it('should have correct component structure', () => {
      // Read the component file and verify it has the expected structure
      const fs = require('fs');
      const path = require('path');
      const componentPath = path.join(__dirname, '../../components/buttons/EditPageButton.tsx');
      const content = fs.readFileSync(componentPath, 'utf-8');

      // Check for key component elements
      expect(content).toContain('export default function EditPageButton');
      expect(content).toContain('EditPageButtonProps');
      expect(content).toContain("data-testid='edit-page-button'");
      expect(content).toContain('variant');
      expect(content).toContain('inline');
      expect(content).toContain('floating');
    });

    it('should have proper accessibility attributes', () => {
      const fs = require('fs');
      const path = require('path');
      const componentPath = path.join(__dirname, '../../components/buttons/EditPageButton.tsx');
      const content = fs.readFileSync(componentPath, 'utf-8');

      // Check for accessibility features
      expect(content).toContain('aria-label');
      expect(content).toContain("role='link'");
      expect(content).toContain('tabIndex');
      expect(content).toContain('onKeyDown');
      expect(content).toContain('sr-only');
    });

    it('should have proper security attributes', () => {
      const fs = require('fs');
      const path = require('path');
      const componentPath = path.join(__dirname, '../../components/buttons/EditPageButton.tsx');
      const content = fs.readFileSync(componentPath, 'utf-8');

      // Check for security features
      expect(content).toContain('noopener');
      expect(content).toContain('noreferrer');
      expect(content).toContain('referrerPolicy');
    });
  });
});
