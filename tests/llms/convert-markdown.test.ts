import { convertMarkdown } from '../../scripts/llms/convert-markdown';

describe('convertMarkdown', () => {
  it('converts CodeBlock widgets into fenced code', () => {
    const source = `---
title: Hello world
---

Intro

<CodeBlock language="yaml">
{\`asyncapi: 3.1.0
info:
  title: Hello\`}
</CodeBlock>
`;
    const result = convertMarkdown(source);

    expect(result).toContain('# Hello world');
    expect(result).toContain('```yaml');
    expect(result).toContain('asyncapi: 3.1.0');
    expect(result).not.toContain('<CodeBlock');
  });

  it('infers yaml when CodeBlock has no language and the sample is an AsyncAPI document', () => {
    const source = `<CodeBlock>
{\`asyncapi: 3.1.0
info:
  title: Demo\`}
</CodeBlock>
`;
    const result = convertMarkdown(source, { title: 'Demo' });

    expect(result).toContain('```yaml');
  });

  it('converts Remember callouts into blockquotes', () => {
    const source = `<Remember>

Keep this in mind.

</Remember>
`;
    const result = convertMarkdown(source, { title: 'Guide' });

    expect(result).toContain('> **Remember**');
    expect(result).toContain('> Keep this in mind.');
    expect(result).not.toContain('<Remember');
  });

  it('inlines fragment imports inside callouts', () => {
    const source = `import ContributionNotes from '@/assets/docs/fragments/contribution-notes.md';

<Remember>
<ContributionNotes />
</Remember>
`;
    const result = convertMarkdown(source, {
      title: 'Overview',
      readFragment: (repoPath) => {
        expect(repoPath).toBe('assets/docs/fragments/contribution-notes.md');

        return 'Be kind to contributors.';
      }
    });

    expect(result).toContain('> Be kind to contributors.');
    expect(result).not.toContain('import ContributionNotes');
    expect(result).not.toContain('<ContributionNotes');
  });

  it('replaces DocsCards with a markdown list of sections', () => {
    const source = `## Explore the Docs

<DocsCards />
`;
    const result = convertMarkdown(source, { title: 'Welcome' });

    expect(result).toContain('- [Concepts](https://www.asyncapi.com/docs/concepts.md):');
    expect(result).toContain('- [Tutorials](https://www.asyncapi.com/docs/tutorials.md):');
    expect(result).not.toContain('<DocsCards');
  });

  it('replaces Visualizer with a pointer to the HTML page', () => {
    const source = '<Visualizer version="3.1.0" />\n';
    const result = convertMarkdown(source, {
      title: 'Explorer',
      slug: '/docs/reference/specification/v3.1.0-explorer'
    });

    expect(result).toContain('Interactive specification explorer');
    expect(result).toContain('https://www.asyncapi.com/docs/reference/specification/v3.1.0-explorer');
    expect(result).not.toContain('<Visualizer');
  });

  it('converts Figure and YouTube widgets and rewrites image URLs', () => {
    const source = `<Figure
  src="/img/posts/demo.webp"
  caption="A diagram"
/>

<YouTube id="abc123" />
`;
    const result = convertMarkdown(source, { title: 'Post' });

    expect(result).toContain('![A diagram](https://www.asyncapi.com/img/posts/demo.webp)');
    expect(result).toContain('[Watch on YouTube](https://www.youtube.com/watch?v=abc123)');
  });

  it('rewrites internal docs links to markdown twins', () => {
    const source = 'See [validation](/docs/guides/validate#intro) and [blog](/blog/hello).\n';
    const result = convertMarkdown(source, {
      title: 'Links',
      knownMarkdownSlugs: new Set(['/docs/guides/validate', '/blog/hello'])
    });

    expect(result).toContain('[validation](/docs/guides/validate.md#intro)');
    expect(result).toContain('[blog](/blog/hello.md)');
  });

  it('does not rewrite links that are not in the known slug set', () => {
    const source = 'Go to [tools](/tools/cli).\n';
    const result = convertMarkdown(source, {
      title: 'Links',
      knownMarkdownSlugs: new Set(['/docs/concepts'])
    });

    expect(result).toContain('[tools](/tools/cli)');
  });

  it('drops generic MDX imports and leftover JSX tags', () => {
    const source = `import OpenAPIComparison from '../../../../components/OpenAPIComparison';

Hello <Text content="world" /> there.
`;
    const result = convertMarkdown(source, { title: 'Compare', slug: '/docs/tutorials/coming-from-openapi' });

    expect(result).not.toContain('import OpenAPIComparison');
    expect(result).toContain('Hello  there.');
  });
});
