const { genFrontMatter, generateSlug, generateFilePath } = require('../../scripts/compose');

describe('generateSlug', () => {
  test('converts title to kebab-case slug', () => {
    expect(generateSlug('My First Blog Post')).toBe('my-first-blog-post');
  });

  test('removes special characters', () => {
    expect(generateSlug('Hello, World! @2024')).toBe('hello-world-2024');
  });

  test('collapses multiple hyphens', () => {
    expect(generateSlug('A   B')).toBe('a-b');
  });

  test('handles empty string', () => {
    expect(generateSlug('')).toBe('');
  });

  test('handles title with only special characters', () => {
    expect(generateSlug('!!!@@@')).toBe('');
  });

  test('converts to lowercase', () => {
    expect(generateSlug('UPPERCASE TITLE')).toBe('uppercase-title');
  });

  test('preserves leading and trailing spaces as hyphens', () => {
    expect(generateSlug('  Hello World  ')).toBe('-hello-world-');
  });
});

describe('generateFilePath', () => {
  test('generates correct file path from title', () => {
    expect(generateFilePath('My Blog Post')).toBe('pages/blog/my-blog-post.md');
  });

  test('returns untitled for empty slug', () => {
    expect(generateFilePath('')).toBe('pages/blog/untitled.md');
  });

  test('returns untitled for special-char-only title', () => {
    expect(generateFilePath('@@@')).toBe('pages/blog/untitled.md');
  });
});

describe('genFrontMatter', () => {
  const baseAnswers = {
    title: 'Test Post',
    excerpt: 'A test excerpt',
    tags: 'asyncapi,testing',
    type: 'Engineering',
    canonical: ''
  };

  test('includes title in front matter', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result).toContain('title: Test Post');
  });

  test('uses Untitled when title is empty', () => {
    const result = genFrontMatter({ ...baseAnswers, title: '' });
    expect(result).toContain('title: Untitled');
  });

  test('includes type in front matter', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result).toContain('type: Engineering');
  });

  test('includes tags in front matter', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result).toContain("tags: ['asyncapi','testing']");
  });

  test('handles empty tags', () => {
    const result = genFrontMatter({ ...baseAnswers, tags: '' });
    expect(result).toContain('tags: []');
  });

  test('trims whitespace in tags', () => {
    const result = genFrontMatter({ ...baseAnswers, tags: ' asyncapi , testing ' });
    expect(result).toContain("tags: ['asyncapi','testing']");
  });

  test('includes excerpt when provided', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result).toContain('excerpt: A test excerpt');
  });

  test('uses space when excerpt is empty', () => {
    const result = genFrontMatter({ ...baseAnswers, excerpt: '' });
    expect(result).toContain('excerpt:  ');
  });

  test('includes canonical URL when provided', () => {
    const result = genFrontMatter({ ...baseAnswers, canonical: 'https://example.com' });
    expect(result).toContain('canonical: https://example.com');
  });

  test('leaves canonical empty when not provided', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result).toContain('canonical: ');
  });

  test('starts with YAML front matter delimiter', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result.startsWith('---')).toBe(true);
  });

  test('contains blog content template', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result).toContain('Write your blog post content here');
  });

  test('contains default author information', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result).toContain('Lukasz Gornicki');
  });

  test('ends with closing delimiter', () => {
    const result = genFrontMatter(baseAnswers);
    expect(result.trimEnd().endsWith('---')).toBe(true);
  });
});
