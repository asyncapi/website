import frontMatter from 'gray-matter';

import type { ConvertMarkdownOptions } from '@/types/scripts/build-llms';

import { DOCS_CARD_ITEMS, INTERACTIVE_COMPONENTS, SITE_BASE_URL } from './config';
import { canonicalMarkdownUrl } from './urls';

const CODE_BLOCK_REGEX = /<CodeBlock\b([^>]*)>([\s\S]*?)<\/CodeBlock>/g;
const FIGURE_REGEX = /<Figure\b([\s\S]*?)\/>/g;
const YOUTUBE_REGEX = /<YouTube\b([\s\S]*?)\/>/g;
const VISUALIZER_REGEX = /<Visualizer\b([\s\S]*?)\/>/g;
const DOCS_CARDS_REGEX = /<DocsCards\s*(?:\/>|>\s*<\/DocsCards>)/g;
const CALLOUT_REGEX = /<(Remember|Warning)\b([^>]*)>([\s\S]*?)<\/\1>/g;
const JSX_SELF_CLOSING_REGEX = /<[A-Z][\w.]*\b[^>]*\/>/g;
const JSX_PAIRED_REGEX = /<[A-Z][\w.]*\b[^>]*>([\s\S]*?)<\/[A-Z][\w.]*>/g;
const INTERNAL_MD_LINK_REGEX = /\]\((\/(?:docs|blog|about)[^)\s]*)\)/g;
const INTERNAL_HREF_REGEX = /href=(['"])(\/(?:docs|blog|about)[^'"]*)\1/g;
const ROOT_IMAGE_REGEX = /(['"(])(\/img\/)/g;

/**
 * Reads a quoted attribute such as `language="yaml"`.
 *
 * @param attrs - raw attribute text
 * @param name - attribute name
 */
function getProp(attrs: string, name: string): string | undefined {
  const doubleQuoted = new RegExp(String.raw`${name}\s*=\s*"([^"]*)"`).exec(attrs);

  if (doubleQuoted) {
    return doubleQuoted[1];
  }

  const singleQuoted = new RegExp(String.raw`${name}\s*=\s*'([^']*)'`).exec(attrs);

  return singleQuoted?.[1];
}

/**
 * Strips the JSX template wrapper CodeBlock uses around sample code.
 *
 * @param inner - CodeBlock children
 */
function unwrapJsxTemplate(inner: string): string {
  const trimmed = inner.trim();
  const wrapped = /^\{`([\s\S]*)`\}$/.exec(trimmed);

  if (wrapped) {
    return wrapped[1];
  }

  return trimmed;
}

/**
 * Picks a fence language when CodeBlock did not set one.
 *
 * @param inner - CodeBlock children
 */
function inferFenceLanguage(inner: string): string {
  const code = unwrapJsxTemplate(inner).trim();

  if (/^asyncapi:\s/m.test(code) || /^info:\s*$/m.test(code)) {
    return 'yaml';
  }

  return '';
}

/**
 * Prefixes a root-relative URL with the site origin.
 *
 * @param url - image or page URL
 * @param siteBaseUrl - site origin
 */
function absolutizeUrl(url: string, siteBaseUrl: string): string {
  if (!url) {
    return url;
  }

  if (url.startsWith('/')) {
    return `${siteBaseUrl}${url}`;
  }

  return url;
}

/**
 * Parses `import Notes from '@/assets/docs/fragments/notes.md'`.
 *
 * @param line - a trimmed source line
 */
function parseFragmentImport(line: string): { name: string; spec: string } | undefined {
  if (!line.startsWith('import ')) {
    return undefined;
  }

  const fromToken = ' from ';
  const fromIndex = line.indexOf(fromToken);

  if (fromIndex === -1) {
    return undefined;
  }

  const name = line.slice('import '.length, fromIndex).trim();
  let specPart = line.slice(fromIndex + fromToken.length).trim();

  if (specPart.endsWith(';')) {
    specPart = specPart.slice(0, -1).trim();
  }

  const quote = specPart.charAt(0);

  if ((quote !== "'" && quote !== '"') || !specPart.endsWith(quote)) {
    return undefined;
  }

  const spec = specPart.slice(1, -1);

  if (!/^\w+$/.test(name) || !spec.startsWith('@/assets/docs/fragments/')) {
    return undefined;
  }

  return { name, spec };
}

/**
 * True for other MDX import lines, which are omitted from the markdown output.
 *
 * @param line - a trimmed source line
 */
function isGenericImportLine(line: string): boolean {
  if (!line.startsWith('import ')) {
    return false;
  }

  const fromIndex = line.indexOf(' from ');

  if (fromIndex === -1) {
    return false;
  }

  const specPart = line.slice(fromIndex + ' from '.length).trim();

  return specPart.startsWith("'") || specPart.startsWith('"') || specPart.startsWith('`');
}

/**
 * Loads fragment files imported at the top of the MDX and drops the other import lines.
 *
 * @param content - markdown body after frontmatter
 * @param readFragment - optional loader for `@/assets/docs/fragments/*`
 */
function extractImports(
  content: string,
  readFragment?: ConvertMarkdownOptions['readFragment']
): { fragmentMap: Map<string, string>; body: string } {
  const lines = content.split('\n');
  const fragmentMap = new Map<string, string>();
  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index].trim();
    const fragmentMatch = parseFragmentImport(trimmed);

    if (trimmed === '') {
      index += 1;
    } else if (fragmentMatch) {
      const { name, spec } = fragmentMatch;
      const repoPath = spec.startsWith('@/') ? spec.slice(2) : spec;
      const fragment = readFragment?.(repoPath);

      fragmentMap.set(name, fragment ?? '');
      index += 1;
    } else if (isGenericImportLine(trimmed)) {
      index += 1;
    } else {
      break;
    }
  }

  return { fragmentMap, body: lines.slice(index).join('\n') };
}

/**
 * Replaces fragment components with the loaded markdown.
 *
 * @param content - markdown body
 * @param fragmentMap - component name to fragment source
 */
function inlineFragments(content: string, fragmentMap: Map<string, string>): string {
  let result = content;

  fragmentMap.forEach((fragment, name) => {
    const pattern = new RegExp(String.raw`<${name}\s*(?:/>|>\s*</${name}>)`, 'g');

    result = result.replace(pattern, fragment.trim());
  });

  return result;
}

/**
 * Turns `<CodeBlock>` widgets into fenced code blocks.
 *
 * @param content - markdown body
 */
function convertCodeBlocks(content: string): string {
  return content.replace(CODE_BLOCK_REGEX, (_match, attrs: string, inner: string) => {
    const language = getProp(attrs, 'language') || inferFenceLanguage(inner);
    const code = unwrapJsxTemplate(inner).replace(/\n$/, '');
    const fence = language ? `\`\`\`${language}` : '```';

    return `\n${fence}\n${code}\n\`\`\`\n`;
  });
}

/**
 * Turns `<Figure>` widgets into markdown images.
 *
 * @param content - markdown body
 * @param siteBaseUrl - site origin for root-relative images
 */
function convertFigures(content: string, siteBaseUrl: string): string {
  return content.replace(FIGURE_REGEX, (_match, attrs: string) => {
    const src = absolutizeUrl(getProp(attrs, 'src') || '', siteBaseUrl);
    const caption = getProp(attrs, 'caption') || getProp(attrs, 'altOnly') || '';

    if (!src) {
      return '';
    }

    return `\n![${caption}](${src})\n`;
  });
}

/**
 * Turns `<YouTube>` embeds into a plain link.
 *
 * @param content - markdown body
 */
function convertYouTubeEmbeds(content: string): string {
  return content.replace(YOUTUBE_REGEX, (_match, attrs: string) => {
    const id = getProp(attrs, 'id');

    if (!id) {
      return '';
    }

    return `\n[Watch on YouTube](https://www.youtube.com/watch?v=${id})\n`;
  });
}

/**
 * Replaces the schema explorer widget with a pointer to the HTML page.
 *
 * @param content - markdown body
 * @param slug - current page slug
 * @param siteBaseUrl - site origin
 */
function convertVisualizer(content: string, slug: string | undefined, siteBaseUrl: string): string {
  return content.replace(VISUALIZER_REGEX, () => {
    const htmlUrl = slug ? `${siteBaseUrl}${slug}` : `${siteBaseUrl}/docs`;

    return `\nInteractive specification explorer — see the HTML page: ${htmlUrl}\n`;
  });
}

/**
 * Replaces `<DocsCards />` with a markdown list of docs sections.
 *
 * @param content - markdown body
 * @param siteBaseUrl - site origin
 */
function convertDocsCards(content: string, siteBaseUrl: string): string {
  const list = DOCS_CARD_ITEMS.map((item) => {
    return `- [${item.title}](${canonicalMarkdownUrl(item.link, siteBaseUrl)}): ${item.description}`;
  }).join('\n');

  return content.replace(DOCS_CARDS_REGEX, `\n${list}\n`);
}

/**
 * Turns Remember/Warning callouts into blockquotes.
 *
 * @param content - markdown body
 */
function convertCallouts(content: string): string {
  return content.replace(CALLOUT_REGEX, (_match, tag: string, attrs: string, inner: string) => {
    const title = getProp(attrs, 'title') || tag;
    const body = inner.trim();
    const lines = body.length > 0 ? body.split('\n') : [];
    const quoted = [`> **${title}**`, '>', ...lines.map((line) => `> ${line}`)];

    return `\n${quoted.join('\n')}\n`;
  });
}

/**
 * Drops interactive MDX widgets, leaving a short note for comparison components.
 *
 * @param content - markdown body
 * @param slug - current page slug
 * @param siteBaseUrl - site origin
 */
function stripInteractiveComponents(content: string, slug: string | undefined, siteBaseUrl: string): string {
  let result = content;
  const htmlUrl = slug ? `${siteBaseUrl}${slug}` : '';
  const comparisonNote = htmlUrl ? `\nSee the interactive comparison on the HTML page: ${htmlUrl}\n` : '';

  INTERACTIVE_COMPONENTS.forEach((name) => {
    const paired = new RegExp(String.raw`<${name}\b[^>]*>[\s\S]*?</${name}>`, 'g');
    const selfClosing = new RegExp(String.raw`<${name}\b[^>]*/>`, 'g');
    const replacement = name.includes('Comparison') ? comparisonNote : '';

    result = result.replace(paired, replacement).replace(selfClosing, replacement);
  });

  return result;
}

/**
 * Strips leftover PascalCase JSX, keeping inner text of paired tags.
 *
 * @param content - markdown body
 */
function stripRemainingJsx(content: string): string {
  let result = content;
  let previous = '';
  let safety = 0;

  while (result !== previous && safety < 10) {
    previous = result;
    result = result.replace(JSX_SELF_CLOSING_REGEX, '');
    result = result.replace(JSX_PAIRED_REGEX, '$1');
    safety += 1;
  }

  return result;
}

/**
 * Rewrites root-relative `/img/` URLs to absolute site URLs.
 *
 * @param content - markdown body
 * @param siteBaseUrl - site origin
 */
function rewriteImageUrls(content: string, siteBaseUrl: string): string {
  return content.replace(ROOT_IMAGE_REGEX, `$1${siteBaseUrl}$2`);
}

/**
 * Points internal docs/blog/about links at their `.md` twins.
 *
 * @param content - markdown body
 * @param knownMarkdownSlugs - slugs that have generated markdown pages
 */
function rewriteInternalLinks(content: string, knownMarkdownSlugs?: Set<string>): string {
  const rewritePath = (pathWithHash: string): string => {
    const [path, hash] = pathWithHash.split('#');
    const slug = path.replace(/\.md$/, '');
    const hashSuffix = hash ? `#${hash}` : '';

    if (path.endsWith('.md')) {
      return pathWithHash;
    }

    if (knownMarkdownSlugs && !knownMarkdownSlugs.has(slug)) {
      return pathWithHash;
    }

    return `${slug}.md${hashSuffix}`;
  };

  return content
    .replace(INTERNAL_MD_LINK_REGEX, (_match, pathWithHash: string) => `](${rewritePath(pathWithHash)})`)
    .replace(INTERNAL_HREF_REGEX, (_match, quote: string, pathWithHash: string) => {
      return `href=${quote}${rewritePath(pathWithHash)}${quote}`;
    });
}

/**
 * Ensures the page starts with an H1 from frontmatter when missing.
 *
 * @param content - markdown body
 * @param title - page title
 * @param description - optional description for a leading blockquote
 */
function ensureTitleHeading(content: string, title?: string, description?: string): string {
  const trimmed = content.trim();
  const firstLine = trimmed.split('\n')[0] || '';
  const hasExactTitle = Boolean(title) && firstLine === `# ${title}`;
  let result = trimmed;

  if (title && !hasExactTitle) {
    result = `# ${title}\n\n${trimmed}`;
  }

  const desc = description?.trim();

  if (desc) {
    const lines = result.split('\n');
    const headingIndex = lines.findIndex((line) => line.startsWith('# '));
    const alreadyHasDescription = result.includes(`> ${desc}`);

    if (headingIndex !== -1 && !alreadyHasDescription) {
      lines.splice(headingIndex + 1, 0, '', `> ${desc}`);
      result = lines.join('\n');
    }
  }

  return result;
}

/**
 * Converts authored MDX-ish markdown into clean Markdown for agents.
 *
 * @param source - file contents from markdown/
 * @param options - title, slug, fragment reader, and known slugs for link rewriting
 */
export function convertMarkdown(source: string, options: ConvertMarkdownOptions = {}): string {
  const { data, content } = frontMatter(source);
  const title = options.title || (typeof data.title === 'string' ? data.title : undefined);
  const description =
    options.description || (typeof data.description === 'string' ? data.description : undefined) || options.excerpt;
  const siteBaseUrl = options.siteBaseUrl || SITE_BASE_URL;
  const { fragmentMap, body: withoutImports } = extractImports(content, options.readFragment);
  let result = inlineFragments(withoutImports, fragmentMap);

  result = convertCodeBlocks(result);
  result = convertFigures(result, siteBaseUrl);
  result = convertYouTubeEmbeds(result);
  result = convertVisualizer(result, options.slug, siteBaseUrl);
  result = convertDocsCards(result, siteBaseUrl);
  result = convertCallouts(result);
  result = stripInteractiveComponents(result, options.slug, siteBaseUrl);
  result = stripRemainingJsx(result);
  result = rewriteImageUrls(result, siteBaseUrl);
  result = rewriteInternalLinks(result, options.knownMarkdownSlugs);
  result = ensureTitleHeading(result, title, description);

  return result.replace(/\n{3,}/g, '\n\n').trim();
}
