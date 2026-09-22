import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { LlmsContentKind } from '@/types/scripts/build-llms';
import type { Details } from '@/types/scripts/build-posts-list';

export const SITE_BASE_URL = 'https://www.asyncapi.com';

export const LLMS_TITLE = 'AsyncAPI';

export const LLMS_SUMMARY =
  'Open source tools to easily build and maintain your event-driven architecture. All powered by the AsyncAPI specification, the industry standard for defining asynchronous APIs.';

export const LLMS_DETAILS = [
  'How to use: start here, then fetch only the `.md` links you need.',
  'Append `.md` to any docs or blog URL.',
  `Core docs concatenated: ${SITE_BASE_URL}/llms-full.txt`
].join('\n');

/**
 * Docs root section ids listed under ## Optional in llms.txt and omitted from llms-full.txt.
 * Change this denylist to move a section between core and Optional.
 */
export const OPTIONAL_ROOT_SECTION_IDS = ['community'] as const;

const FALLBACK_LATEST_SPEC_SLUG = '/docs/reference/specification/v3.1.0';

const LATEST_SPEC_REDIRECT_START = '# LATEST-SPEC-REDIRECTION:START';

const LATEST_SPEC_REDIRECT_END = '# LATEST-SPEC-REDIRECTION:END';

const LATEST_HTML_REDIRECT_PATTERN =
  /\/docs\/reference\/specification\/latest\s+(\/docs\/reference\/specification\/v[\w.-]+)\s+302!/;

const LATEST_MARKDOWN_REDIRECT_PATTERN = /\/docs\/reference\/specification\/latest\.md\s+\S+\s+302!/;

/**
 * Reads the latest spec path from the `/docs/reference/specification/latest` redirect.
 *
 * @param redirects - contents of public/_redirects
 * @param fallback - slug used when that redirect is missing
 */
export function parseLatestSpecSlug(redirects: string, fallback: string = FALLBACK_LATEST_SPEC_SLUG): string {
  const startIndex = redirects.indexOf(LATEST_SPEC_REDIRECT_START);
  const endIndex = redirects.indexOf(LATEST_SPEC_REDIRECT_END);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return fallback;
  }

  const match = LATEST_HTML_REDIRECT_PATTERN.exec(redirects.slice(startIndex, endIndex));

  return match?.[1] || fallback;
}

/**
 * Redirect line for `/docs/reference/specification/latest.md`.
 *
 * @param latestSlug - HTML slug of the latest spec, such as `/docs/reference/specification/v3.1.0`
 */
export function latestMarkdownRedirectLine(latestSlug: string): string {
  return `/docs/reference/specification/latest.md ${latestSlug}.md 302!`;
}

/**
 * Points `latest.md` at the same spec version as the HTML `latest` redirect.
 *
 * @param redirects - contents of public/_redirects
 * @param latestSlug - HTML slug of the latest spec
 */
export function replaceLatestMarkdownRedirect(redirects: string, latestSlug: string): string {
  const line = latestMarkdownRedirectLine(latestSlug);

  if (LATEST_MARKDOWN_REDIRECT_PATTERN.test(redirects)) {
    return redirects.replace(LATEST_MARKDOWN_REDIRECT_PATTERN, line);
  }

  const endIndex = redirects.indexOf(LATEST_SPEC_REDIRECT_END);

  if (endIndex === -1) {
    return redirects;
  }

  const insertAt = endIndex + LATEST_SPEC_REDIRECT_END.length;

  return `${redirects.slice(0, insertAt)}\n\n# Markdown twin of /docs/reference/specification/latest\n${line}${redirects.slice(insertAt)}`;
}

/**
 * Reads public/_redirects from this repository.
 */
function readLatestSpecSlug(): string {
  try {
    const redirectsPath = join(dirname(fileURLToPath(import.meta.url)), '../../public/_redirects');

    return parseLatestSpecSlug(readFileSync(redirectsPath, 'utf8'));
  } catch {
    return FALLBACK_LATEST_SPEC_SLUG;
  }
}

export const LATEST_SPEC_SLUG = readLatestSpecSlug();

export const SPECIFICATION_PREFIX = '/docs/reference/specification/';

export const SKIP_FROM_FULL_SLUG_PATTERNS: readonly RegExp[] = [/-explorer$/, /\/v2\.x$/];

export const MARKDOWN_SOURCE_DIR = 'markdown';

export const PUBLIC_DIR = 'public';

export const GENERATED_ROOT_FILES = ['llms.txt', 'llms-full.txt', 'docs.md', 'about.md'] as const;

/**
 * DocsCards replacements. Keep titles/descriptions/links aligned with components/data/buckets.ts.
 */
export const DOCS_CARD_ITEMS = [
  {
    title: 'Concepts',
    description: 'Our Concepts section defines the concepts of AsyncAPI features and capabilities.',
    link: '/docs/concepts'
  },
  {
    title: 'Tutorials',
    description: 'Our Tutorials section teaches beginner processes with AsyncAPI, guiding you from Point A to Point B.',
    link: '/docs/tutorials'
  },
  {
    title: 'Guides',
    description: "Our Guides section teaches AsyncAPI's capabilities at a high level.",
    link: '/docs/guides'
  },
  {
    title: 'Tools',
    description: 'Our Tools section documents the AsyncAPI tools ecosystem.',
    link: '/docs/tools'
  },
  {
    title: 'Reference',
    description: 'Our Reference section documents the AsyncAPI specification.',
    link: '/docs/reference'
  },
  {
    title: 'Migration',
    description: 'Our migration guides on how to upgrade to newer AsyncAPI versions.',
    link: '/docs/migration'
  },
  {
    title: 'Community',
    description: 'Our Community section documents the community guidelines and resources.',
    link: '/docs/community'
  },
  {
    title: 'Specification Explorer',
    description: 'Simplifying our Specification JSON Schema like a pro.',
    link: '/docs/reference/specification/v3.0.0-explorer'
  }
] as const;

const INTERACTIVE_COMPONENT_NAMES = [
  'GeneratorInstallation',
  'NewsletterSubscribe',
  'Sponsors',
  'TwitterTimelineEmbed',
  'TwitterShareButton',
  'TwitterFollowButton',
  'TwitterHashtagButton',
  'TwitterMentionButton',
  'TwitterTweetEmbed',
  'TwitterMomentShare',
  'TwitterDMButton',
  'TwitterVideoEmbed',
  'TwitterOnAirButton',
  'ChapterSuggestions',
  'OpenAPIComparison',
  'OpenAPIComparisonV3',
  'Asyncapi3ChannelComparison',
  'Asyncapi3IdAndAddressComparison',
  'Asyncapi3MetaComparison',
  'Asyncapi3OperationComparison',
  'Asyncapi3ParameterComparison',
  'Asyncapi3SchemaFormatComparison',
  'Asyncapi3ServerComparison',
  'Profiles',
  'FAQ'
] as const;

export const INTERACTIVE_COMPONENTS: readonly string[] = INTERACTIVE_COMPONENT_NAMES;

/**
 * Returns true when a docs root section should be listed under Optional instead of core.
 *
 * @param rootSectionId - docsTree root section id such as `concepts` or `community`
 */
export function isOptionalSection(rootSectionId?: string): boolean {
  if (!rootSectionId) {
    return false;
  }

  return (OPTIONAL_ROOT_SECTION_IDS as readonly string[]).includes(rootSectionId);
}

/**
 * Returns true when a slug should be omitted from llms-full.txt (explorer shells, v2 stub).
 *
 * @param slug - public page slug
 */
export function isSkippedFromFull(slug?: string): boolean {
  if (!slug) {
    return true;
  }

  return SKIP_FROM_FULL_SLUG_PATTERNS.some((pattern) => pattern.test(slug));
}

/**
 * Returns true when the slug is a specification version page other than the latest.
 *
 * @param slug - public page slug
 */
export function isOlderSpecificationPage(slug?: string): boolean {
  if (!slug?.startsWith(SPECIFICATION_PREFIX)) {
    return false;
  }

  const rest = slug.slice(SPECIFICATION_PREFIX.length);

  if (!rest) {
    return false;
  }

  return slug !== LATEST_SPEC_SLUG;
}

/**
 * Returns true when a post belongs in llms-full.txt.
 *
 * @param post - indexed page metadata
 * @param kind - docs, blog, or about
 */
export function shouldIncludeInLlmsFull(post: Details, kind: LlmsContentKind): boolean {
  if (kind === 'blog') {
    return false;
  }

  if (isOptionalSection(post.rootSectionId)) {
    return false;
  }

  if (isSkippedFromFull(post.slug)) {
    return false;
  }

  if (isOlderSpecificationPage(post.slug)) {
    return false;
  }

  return Boolean(post.slug);
}
