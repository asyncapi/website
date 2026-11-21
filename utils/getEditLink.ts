export interface EditOption {
  value: string;
  href: string;
}

const PAGE_PLACEHOLDER = '{page}';

/**
 * @description Resolves the GitHub edit link of a docs page from `config/edit-page-config.json`.
 *
 * Matching: the option with the longest `value` contained in `slug` wins, so an entry for a single
 * page can override an entry that covers a whole directory.
 *
 * Link building, in order:
 * 1. `href` contains `{page}`: the placeholder is replaced with the page name (file name without `.md`).
 * 2. `value` is empty (website fallback): `<href>/docs<slug>.md`.
 * 3. `href` points to a file (for example the spec's `asyncapi.md`): the file itself.
 * 4. Otherwise: `<href>/<fileName>`.
 *
 * @param {string} slug Page path relative to the docs root with a leading slash, e.g. `/reference/bindings/amqp`.
 * Index pages end with `/index`.
 * @param {string} fileName Markdown file name of the page, e.g. `amqp.md`.
 * @param {EditOption[]} editOptions Entries from `config/edit-page-config.json`.
 * @returns {string | null} The edit link, or `null` when no option matches.
 */
export function getEditLink(slug: string, fileName: string, editOptions: EditOption[]): string | null {
  const target = editOptions
    .filter((option) => slug.includes(option.value))
    .sort((a, b) => b.value.length - a.value.length)[0];

  if (!target) return null;

  if (target.href.includes(PAGE_PLACEHOLDER)) {
    return target.href.split(PAGE_PLACEHOLDER).join(fileName.replace(/\.md$/, ''));
  }

  if (target.value === '') {
    return `${target.href}/docs${slug}.md`;
  }

  const lastSegment = target.href.split('/').pop() ?? '';
  const isHrefToFile = lastSegment.includes('.');

  return isHrefToFile ? target.href : `${target.href}/${fileName}`;
}
