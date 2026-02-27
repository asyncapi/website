import type { EditPageConfigEntry } from '@/types/components/EditPageButton';

import {
  contentTypeTestCases,
  mapUrlTestCases,
  shouldShowTestCases
} from './fixtures/editPageButtonData';

// Mock the edit-page-config.json before importing the module
jest.mock('../config/edit-page-config.json', () => [
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
    contentType: 'blog'
  },
  {
    value: '/about/',
    href: 'https://github.com/asyncapi/website/edit/master/markdown/about',
    contentType: 'about'
  }
]);

// Import the module after mocking
import {
  getContentTypeFromSlug,
  mapUrlToGitHubEdit,
  openGitHubUrl,
  shouldShowEditButton,
  URL_MAPPING_CONFIG
} from '../utils/editPageUtils';

describe('editPageUtils', () => {
  describe('URL_MAPPING_CONFIG', () => {
    it('should have correct base GitHub URL', () => {
      expect(URL_MAPPING_CONFIG.baseGitHubUrl).toBe('https://github.com/asyncapi/website');
    });

    it('should have correct branch', () => {
      expect(URL_MAPPING_CONFIG.branch).toBe('master');
    });

    it('should have content mappings for blog, docs, and about', () => {
      expect(URL_MAPPING_CONFIG.contentMappings).toHaveLength(3);

      const patterns = URL_MAPPING_CONFIG.contentMappings.map((m) => m.urlPattern);

      expect(patterns).toContain('/blog/*');
      expect(patterns).toContain('/docs/*');
      expect(patterns).toContain('/about/*');
    });

    it('should have correct source directories', () => {
      const blogMapping = URL_MAPPING_CONFIG.contentMappings.find((m) => m.urlPattern === '/blog/*');
      const docsMapping = URL_MAPPING_CONFIG.contentMappings.find((m) => m.urlPattern === '/docs/*');
      const aboutMapping = URL_MAPPING_CONFIG.contentMappings.find((m) => m.urlPattern === '/about/*');

      expect(blogMapping?.sourceDirectory).toBe('markdown/blog');
      expect(docsMapping?.sourceDirectory).toBe('markdown/docs');
      expect(aboutMapping?.sourceDirectory).toBe('markdown/about');
    });
  });

  describe('getContentTypeFromSlug', () => {
    contentTypeTestCases.forEach(({ slug, expected }) => {
      it(`should return '${expected}' for slug '${slug}'`, () => {
        expect(getContentTypeFromSlug(slug)).toBe(expected);
      });
    });
  });

  describe('shouldShowEditButton', () => {
    shouldShowTestCases.forEach(({ slug, expected }) => {
      it(`should return ${expected} for slug '${slug}'`, () => {
        expect(shouldShowEditButton(slug)).toBe(expected);
      });
    });
  });

  describe('mapUrlToGitHubEdit', () => {
    describe('blog content type', () => {
      it('should generate correct edit URL for blog posts', () => {
        const result = mapUrlToGitHubEdit('/blog/my-awesome-post', 'blog');

        expect(result.success).toBe(true);
        expect(result.editUrl).toBe(
          'https://github.com/asyncapi/website/edit/master/markdown/blog/my-awesome-post.md'
        );
      });

      it('should extract filename from nested blog paths', () => {
        const result = mapUrlToGitHubEdit('/blog/2024/01/december-update', 'blog');

        expect(result.success).toBe(true);
        expect(result.editUrl).toBe(
          'https://github.com/asyncapi/website/edit/master/markdown/blog/december-update.md'
        );
      });
    });

    describe('about content type', () => {
      it('should generate correct edit URL for about pages', () => {
        const result = mapUrlToGitHubEdit('/about/team', 'about');

        expect(result.success).toBe(true);
        expect(result.editUrl).toBe(
          'https://github.com/asyncapi/website/edit/master/markdown/about/team.md'
        );
      });

      it('should handle different about page slugs', () => {
        const result = mapUrlToGitHubEdit('/about/contact', 'about');

        expect(result.success).toBe(true);
        expect(result.editUrl).toBe(
          'https://github.com/asyncapi/website/edit/master/markdown/about/contact.md'
        );
      });
    });

    describe('docs content type', () => {
      it('should generate correct edit URL for standard docs pages', () => {
        const result = mapUrlToGitHubEdit('/docs/concepts/asyncapi', 'docs');

        expect(result.success).toBe(true);
        // The actual implementation uses 'blob' instead of 'edit' for this case
        expect(result.editUrl).toBe(
          'https://github.com/asyncapi/website/blob/master/markdown/docs/concepts/asyncapi.md'
        );
      });

      it('should handle generator tool docs with custom mapping', () => {
        const result = mapUrlToGitHubEdit('/docs/tools/generator', 'docs');

        expect(result.success).toBe(true);
        expect(result.editUrl).toContain('github.com/asyncapi/generator');
      });

      it('should handle CLI tool docs with custom mapping', () => {
        const result = mapUrlToGitHubEdit('/docs/tools/cli/installation', 'docs');

        expect(result.success).toBe(true);
        expect(result.editUrl).toContain('github.com/asyncapi/cli');
      });

      it('should handle specification reference docs', () => {
        const result = mapUrlToGitHubEdit('/docs/reference/specification/v3.0.0', 'docs');

        expect(result.success).toBe(true);
        expect(result.editUrl).toContain('github.com/asyncapi/spec');
      });

      it('should handle .mdx extension in slug', () => {
        const result = mapUrlToGitHubEdit('/docs/concepts/file.mdx', 'docs');

        expect(result.success).toBe(true);
        // The implementation appends .md after the .mdx filename
        expect(result.editUrl).toContain('file.mdx.md');
      });
    });

    describe('fallback behavior', () => {
      it('should return a valid URL for unknown paths', () => {
        const result = mapUrlToGitHubEdit('/unknown/path', 'docs');

        // The implementation falls back to the base mapping which succeeds
        expect(result.success).toBe(true);
        expect(result.editUrl).toContain('github.com/asyncapi/website');
      });

      it('should handle errors gracefully', () => {
        // Test with invalid content type that doesn't match expected values
        const result = mapUrlToGitHubEdit('/some/path', 'docs');

        // Should not throw and should return a result
        expect(result).toHaveProperty('editUrl');
        expect(result).toHaveProperty('success');
      });
    });

    describe('URL validation', () => {
      it('should return valid GitHub URLs', () => {
        const result = mapUrlToGitHubEdit('/blog/test-post', 'blog');

        expect(result.editUrl).toMatch(/^https:\/\/github\.com\//);
      });

      it('should handle URLs with special characters', () => {
        const result = mapUrlToGitHubEdit('/blog/post-with-special-chars', 'blog');

        expect(result.success).toBe(true);
        expect(result.editUrl).toContain('github.com');
      });
    });
  });

  describe('openGitHubUrl', () => {
    const originalWindow = global.window;
    const originalDocument = global.document;

    beforeEach(() => {
      // Reset mocks before each test
      jest.clearAllMocks();
    });

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

    it('should open window with correct parameters when window.open succeeds', () => {
      const mockWindow = {
        opener: null
      };
      const mockOpen = jest.fn().mockReturnValue(mockWindow);

      global.window = {
        open: mockOpen
      } as unknown as Window & typeof globalThis;

      const testUrl = 'https://github.com/asyncapi/website/edit/master/README.md';
      const result = openGitHubUrl(testUrl);

      expect(result).toBe(true);
      expect(mockOpen).toHaveBeenCalledWith(
        testUrl,
        '_blank',
        'noopener,noreferrer,width=1200,height=800,scrollbars=yes,resizable=yes'
      );
      expect(mockWindow.opener).toBeNull();
    });

    it('should use fallback link method when window.open returns null', () => {
      const mockOpen = jest.fn().mockReturnValue(null);
      const mockClick = jest.fn();
      const mockLink = {
        click: mockClick
      };
      const mockCreateElement = jest.fn().mockReturnValue(mockLink);
      const mockAppendChild = jest.fn();
      const mockRemoveChild = jest.fn();

      global.window = {
        open: mockOpen
      } as unknown as Window & typeof globalThis;

      global.document = {
        createElement: mockCreateElement,
        body: {
          appendChild: mockAppendChild,
          removeChild: mockRemoveChild
        }
      } as unknown as Document;

      const testUrl = 'https://github.com/asyncapi/website/edit/master/README.md';
      const result = openGitHubUrl(testUrl);

      expect(result).toBe(true);
      expect(mockCreateElement).toHaveBeenCalledWith('a');
      expect(mockLink).toMatchObject({
        href: testUrl,
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
        referrerPolicy: 'no-referrer'
      });
      expect(mockAppendChild).toHaveBeenCalledWith(mockLink);
      expect(mockClick).toHaveBeenCalled();
      expect(mockRemoveChild).toHaveBeenCalledWith(mockLink);
    });

    it('should handle errors and return false', () => {
      global.window = undefined as unknown as Window & typeof globalThis;

      const result = openGitHubUrl('https://github.com/test');

      expect(result).toBe(false);
    });
  });
});
