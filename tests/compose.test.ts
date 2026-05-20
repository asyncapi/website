import dayjs from 'dayjs';

// Mock inquirer BEFORE importing compose to handle module-level .prompt().then() chain
jest.mock('inquirer', () => ({
  prompt: jest.fn().mockReturnValue(Promise.resolve({
    title: '',
    excerpt: '',
    tags: '',
    type: 'Engineering',
    canonical: ''
  }))
}));

jest.mock('fs', () => ({
  writeFile: jest.fn()
}));

jest.mock('../scripts/helpers/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

// Now import after mocks are set up
import { genFrontMatter } from '../scripts/compose';

describe('genFrontMatter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should generate complete front matter with all fields provided', () => {
    const mockDate = '2026-05-21T12:00:00Z';
    const dateSpy = jest.spyOn(dayjs.prototype, 'format').mockReturnValue(mockDate);

    const answers = {
      title: 'My Test Blog Post',
      excerpt: 'A short excerpt for testing',
      tags: 'asyncapi, testing, jest',
      type: 'Engineering' as const,
      canonical: 'https://example.com/blog/test'
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('title: My Test Blog Post');
    expect(result).toContain('date: 2026-05-21T12:00:00Z');
    expect(result).toContain('type: Engineering');
    expect(result).toContain('canonical: https://example.com/blog/test');
    expect(result).toContain("tags: ['asyncapi','testing','jest']");
    expect(result).toContain('excerpt: A short excerpt for testing');

    dateSpy.mockRestore();
  });

  test('should handle empty title with default', () => {
    const answers = {
      title: '',
      excerpt: '',
      tags: '',
      type: 'Community' as const,
      canonical: ''
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('title: Untitled');
    expect(result).toContain('type: Community');
  });

  test('should trim whitespace from tags', () => {
    const answers = {
      title: 'Tag Test',
      excerpt: 'Testing tag trimming',
      tags: '  asyncapi  ,  testing  ,  trim  ',
      type: 'Marketing' as const,
      canonical: ''
    };

    const result = genFrontMatter(answers);

    expect(result).toContain("tags: ['asyncapi','testing','trim']");
    expect(result).not.toContain("'  asyncapi  '");
  });

  test('should handle single tag without comma', () => {
    const answers = {
      title: 'Single Tag',
      excerpt: '',
      tags: 'asyncapi',
      type: 'Strategy' as const,
      canonical: ''
    };

    const result = genFrontMatter(answers);

    expect(result).toContain("tags: ['asyncapi']");
  });

  test('should handle empty tags as empty array', () => {
    const answers = {
      title: 'No Tags',
      excerpt: '',
      tags: '',
      type: 'Video' as const,
      canonical: ''
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('tags: []');
  });

  test('should generate front matter for all valid post types', () => {
    const types = ['Communication', 'Community', 'Engineering', 'Marketing', 'Strategy', 'Video'] as const;

    for (const type of types) {
      const answers = {
        title: `Post Type ${type}`,
        excerpt: '',
        tags: '',
        type,
        canonical: ''
      };

      const result = genFrontMatter(answers);
      expect(result).toContain(`type: ${type}`);
    }
  });

  test('should include canonical URL when provided', () => {
    const answers = {
      title: 'Canonical Test',
      excerpt: '',
      tags: '',
      type: 'Engineering' as const,
      canonical: 'https://asyncapi.com/blog/canonical'
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('canonical: https://asyncapi.com/blog/canonical');
  });

  test('should leave canonical field empty when not provided', () => {
    const answers = {
      title: 'No Canonical',
      excerpt: '',
      tags: '',
      type: 'Engineering' as const,
      canonical: ''
    };

    const result = genFrontMatter(answers);

    expect(result).toContain('canonical: ');
  });

  test('should generate proper YAML front matter delimiters', () => {
    const answers = {
      title: 'Delimiter Test',
      excerpt: '',
      tags: '',
      type: 'Engineering' as const,
      canonical: ''
    };

    const result = genFrontMatter(answers);

    expect(result.startsWith('---')).toBe(true);
    expect(result.trim().endsWith('---')).toBe(true);
  });

  test('should handle special characters in tags', () => {
    const answers = {
      title: 'Special Tags',
      excerpt: '',
      tags: 'c++, .net, node.js',
      type: 'Engineering' as const,
      canonical: ''
    };

    const result = genFrontMatter(answers);
    expect(result).toContain("tags: ['c++','.net','node.js']");
  });
});
