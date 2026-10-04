import { join } from 'node:path';

import { SITE_BASE_URL } from './config';

/**
 * Drops trailing slashes from a slug, keeping a single `/` for the root.
 *
 * @param slug - public HTML slug
 */
function stripTrailingSlashes(slug: string): string {
  let result = slug;

  while (result.length > 1 && result.endsWith('/')) {
    result = result.slice(0, -1);
  }

  return result || '/';
}

/**
 * Converts a page slug to the relative public markdown path.
 * `/docs` → `docs.md`, `/docs/guides/validate` → `docs/guides/validate.md`
 *
 * @param slug - public HTML slug beginning with `/`
 */
export function slugToMarkdownPath(slug: string): string {
  const normalized = stripTrailingSlashes(slug);
  const withoutLeadingSlash = normalized.startsWith('/') ? normalized.slice(1) : normalized;

  return `${withoutLeadingSlash}.md`;
}

/**
 * Absolute path under the public directory for a page's markdown twin.
 *
 * @param slug - public HTML slug
 * @param publicDir - public output directory
 */
export function slugToPublicFile(slug: string, publicDir: string): string {
  return join(publicDir, slugToMarkdownPath(slug));
}

/**
 * Canonical URL of the markdown twin.
 *
 * @param slug - public HTML slug
 * @param baseUrl - site origin
 */
export function canonicalMarkdownUrl(slug: string, baseUrl: string = SITE_BASE_URL): string {
  const normalized = stripTrailingSlashes(slug);

  return `${baseUrl}${normalized}.md`;
}

/**
 * Canonical HTML URL for a slug.
 *
 * @param slug - public HTML slug
 * @param baseUrl - site origin
 */
export function canonicalHtmlUrl(slug: string, baseUrl: string = SITE_BASE_URL): string {
  const normalized = stripTrailingSlashes(slug);

  return `${baseUrl}${normalized}`;
}

/**
 * Maps a posts.json `id` (`pages/docs/foo.mdx`) to the authored markdown path.
 *
 * @param id - generated MDX path stored on the post
 */
export function postIdToMarkdownSource(id: string): string {
  return id.replace(/^pages\//, 'markdown/').replace(/\.mdx$/, '.md');
}

/**
 * Builds the short header prepended to each generated markdown page.
 *
 * @param slug - public HTML slug
 * @param baseUrl - site origin
 */
export function markdownPageHint(slug: string, baseUrl: string = SITE_BASE_URL): string {
  return [`> Markdown version of ${canonicalHtmlUrl(slug, baseUrl)}`, `> Index: ${baseUrl}/llms.txt`].join('\n');
}
