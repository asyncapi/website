import editOptions from '../config/edit-page-config.json';

const FEEDBACK_REPO = 'princerajpoot20/website';
const FEEDBACK_NEW_ISSUE = `https://github.com/${FEEDBACK_REPO}/issues/new`;

export type DocsFeedbackPostFields = {
  slug: string;
  id: string;
  isIndex?: boolean;
};

/**
 * Short hint for triagers: website markdown path vs externally hosted docs.
 */
export function getDocsFeedbackContentHint(post: DocsFeedbackPostFields): string | null {
  const target = editOptions.find((edit) => post.slug.includes(edit.value));
  if (!target?.href) return null;

  if (target.value === '') {
    const slugPath = post.isIndex ? `${post.slug}/index` : post.slug;
    return `Source file (approximate): \`markdown/${slugPath}.md\` in repository \`${FEEDBACK_REPO}\`.`;
  }

  return 'Source content is maintained in another repository. Use **Edit this page on GitHub** on the documentation page for the exact file location.';
}

export function buildDocsFeedbackIssueUrl(args: {
  pagePath: string;
  pageUrl: string;
  contentHint?: string | null;
}): string {
  const path = args.pagePath.startsWith('/') ? args.pagePath : `/${args.pagePath}`;
  const title = `Documentation feedback: ${path}`;
  const hintBlock = args.contentHint ? `${args.contentHint}\n\n` : '';
  const body = `${hintBlock}### Documentation page

**URL:** ${args.pageUrl}
**Site path:** \`${path}\`

<!-- docs-feedback-context: path=${path} -->

### What would you like to improve?

### Optional: screenshots, links, or examples
`;

  return `${FEEDBACK_NEW_ISSUE}?${new URLSearchParams({ title, body, labels: 'area/docs' }).toString()}`;
}
