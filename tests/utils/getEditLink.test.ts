import { getEditLink } from '../../utils/getEditLink';

describe('getEditLink', () => {
  const editOptions = [
    { value: 'reference/bindings/', href: 'https://github.com/asyncapi/bindings/blob/master/{page}/README.md' },
    { value: 'reference/bindings/2.x.x', href: 'https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md' },
    { value: 'reference/specification/', href: 'https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md' },
    { value: '/tools/cli', href: 'https://github.com/asyncapi/cli/tree/master/docs' },
    { value: '', href: 'https://github.com/asyncapi/website/blob/master/markdown' }
  ];

  it('falls back to the website repository for pages without a specific entry', () => {
    expect(getEditLink('/concepts/application', 'application.md', editOptions)).toBe(
      'https://github.com/asyncapi/website/blob/master/markdown/docs/concepts/application.md'
    );
  });

  it('links index pages to their index.md in the website repository', () => {
    expect(getEditLink('/tutorials/index', 'index.md', editOptions)).toBe(
      'https://github.com/asyncapi/website/blob/master/markdown/docs/tutorials/index.md'
    );
  });

  it('appends the file name when href points to a directory', () => {
    expect(getEditLink('/tools/cli/usage', 'usage.md', editOptions)).toBe(
      'https://github.com/asyncapi/cli/tree/master/docs/usage.md'
    );
  });

  it('links to the file itself when href points to a file, for any spec version', () => {
    const specFile = 'https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md';

    expect(getEditLink('/reference/specification/v3.0.0', 'v3.0.0.md', editOptions)).toBe(specFile);
    expect(getEditLink('/reference/specification/v3.1.0', 'v3.1.0.md', editOptions)).toBe(specFile);
    expect(getEditLink('/reference/specification/v9.9.9-explorer', 'v9.9.9-explorer.md', editOptions)).toBe(specFile);
  });

  it('replaces the {page} placeholder with the page name', () => {
    expect(getEditLink('/reference/bindings/amqp', 'amqp.md', editOptions)).toBe(
      'https://github.com/asyncapi/bindings/blob/master/amqp/README.md'
    );
  });

  it('prefers the most specific matching entry', () => {
    expect(getEditLink('/reference/bindings/2.x.x', '2.x.x.md', editOptions)).toBe(
      'https://github.com/asyncapi/bindings/blob/master/sns/2.x.x/README.md'
    );
  });

  it('returns null when no entry matches', () => {
    expect(getEditLink('/concepts/application', 'application.md', [])).toBeNull();
  });
});
