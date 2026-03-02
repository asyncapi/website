import {
  contentTypeTestCases,
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
    const testCases: Array<{
      contentType: 'blog' | 'docs' | 'about';
      slug: string;
      expectedPattern: string;
      description: string;
    }> = [
      { contentType: 'blog', slug: '/blog/my-awesome-post', expectedPattern: 'markdown/blog/my-awesome-post.md', description: 'blog posts' },
      { contentType: 'blog', slug: '/blog/2024/01/december-update', expectedPattern: 'markdown/blog/december-update.md', description: 'nested blog paths' },
      { contentType: 'about', slug: '/about/team', expectedPattern: 'markdown/about/team.md', description: 'about pages' },
      { contentType: 'about', slug: '/about/contact', expectedPattern: 'markdown/about/contact.md', description: 'different about slugs' },
      { contentType: 'docs', slug: '/docs/concepts/asyncapi', expectedPattern: 'markdown/docs/concepts/asyncapi.md', description: 'standard docs pages' },
      { contentType: 'docs', slug: '/docs/tools/generator', expectedPattern: 'github.com/asyncapi/generator', description: 'generator tool docs' },
      { contentType: 'docs', slug: '/docs/tools/cli/installation', expectedPattern: 'github.com/asyncapi/cli', description: 'CLI tool docs' },
      { contentType: 'docs', slug: '/docs/reference/specification/v3.0.0', expectedPattern: 'github.com/asyncapi/spec', description: 'specification reference docs' }
    ];

    testCases.forEach(({ contentType, slug, expectedPattern, description }) => {
      it(`should handle ${description}`, () => {
        const result = mapUrlToGitHubEdit(slug, contentType);

        expect(result.success).toBe(true);
        expect(result.editUrl).toContain(expectedPattern);
      });
    });

    it('should handle .mdx extension in slug', () => {
      const result = mapUrlToGitHubEdit('/docs/concepts/file.mdx', 'docs');

      expect(result.success).toBe(true);
      expect(result.editUrl).toContain('file.mdx.md');
    });

    it('should return a valid URL for unknown paths', () => {
      const result = mapUrlToGitHubEdit('/unknown/path', 'docs');

      expect(result.success).toBe(true);
      expect(result.editUrl).toContain('github.com/asyncapi/website');
    });

    it('should return valid GitHub URLs', () => {
      const result = mapUrlToGitHubEdit('/blog/test-post', 'blog');

      expect(result.editUrl).toMatch(/^https:\/\/github\.com\//);
    });
  });

  describe('openGitHubUrl', () => {
    const originalWindow = global.window;

    afterEach(() => {
      global.window = originalWindow;
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
      global.window = {
        open: jest.fn().mockReturnValue(mockWindow)
      } as unknown as Window & typeof globalThis;

      const result = openGitHubUrl('https://github.com/asyncapi/website/edit/master/README.md');

      expect(result).toBe(true);
    });

    it('should handle errors and return false', () => {
      global.window = undefined as unknown as Window & typeof globalThis;

      const result = openGitHubUrl('https://github.com/test');

      expect(result).toBe(false);
    });
  });
});
